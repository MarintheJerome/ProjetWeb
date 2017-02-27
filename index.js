/**
 * Created by jerome on 14/02/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/Action');

// MONGO config for the project
var Schema = mongoose.Schema;

// maping for the stock object in mongo
var StockSchema = new Schema({
    name: String,
    symbol: String,
    quantity: Number,
    currentPrice: Number,
    boughtPrice: Number
});

var MoneySchema = new Schema({
    boughtValue: Number,
    soldValue: Number,
    gain: Number
});

var GraphicSchema = new Schema({
    boughtValue: Number,
    soldValue: Number,
    gain: Number
});

var Stock = mongoose.model('Stock', StockSchema);
var Money = mongoose.model('Money', MoneySchema);
var Graphic = mongoose.model('Graphic', GraphicSchema);

//  angularJS app directory
app.use(express.static(__dirname + '/Projet'));

// parse body of request in json
app.use(bodyParser.json());

app.route('/recherche')
    .get(function(req, res, next){
        var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20" ;
        var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol = "' + req.query.searchValue + '"');
        var fullUrl = url + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        request(fullUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            }
        });
    })
    .post(function(req, res, next){
        var stock = new Stock(req.body);
        stock.save(function(err){
            if(err){
                return next(err);
            } else {
                return res.json(stock);
            }
        });
    });

app.route('/buy')
    .post(function (req, res, next) {
        var actionToSave = Stock(req.body);
        Stock.findOne({"name": req.body.name}, '_id name symbol quantity currentPrice boughtPrice', function (err, stock) {
            if (err) return handleError(err);
            if (stock != null) { // on update quantity / price bought
                stock.quantity++;
                stock.save(function (err) {
                    if (err) throw err;
                });
                actionToSave.boughtPrice = stock.boughtPrice;
                actionToSave.currentPrice = stock.currentPrice;
                actionToSave.quantity = stock.quantity;
            } else { // on insert
                actionToSave.boughtPrice = parseFloat(req.body.price);
                actionToSave.currentPrice = parseFloat(req.body.price);
                actionToSave.quantity = 1;
                actionToSave.save(function (err) {
                     if (err) throw err;
                });
            }
            // Update dans Money
            Money.find({}, '_id boughtValue gain', function (err, money) {
                var toUpdate = money[0];
                toUpdate.boughtValue += parseFloat(req.body.price);
                toUpdate.gain -= parseFloat(req.body.price);
                toUpdate.save(function (err) {
                    if (err) throw err;
                });
            });
            // Insert dans graphic
            Graphic.find({}).sort({$natural:-1}).limit(1).exec(function(err, graph){
                var newGraph = new Graphic();
                newGraph.boughtValue = parseFloat(graph[0].boughtValue) +  parseFloat(req.body.price);
                newGraph.soldValue =  parseFloat(graph[0].soldValue);
                newGraph.gain = parseFloat(graph[0].gain) - parseFloat(req.body.price);
                newGraph.save(function (err) {
                    if (err) throw err;
                });
            });
            res.send(actionToSave);
        })
    });

app.route('/sell')
    .post(function (req, res, next) {
        Stock.findOne({"name": req.body.name}, '_id name quantity currentPrice', function(err, stock){
            if(stock != null){
                if (err) return handleError(err);
                stock.quantity--;
                if(stock.quantity >= 1){
                    stock.save(function (err) {
                        if (err) throw err;
                    });
                }
                else {
                    Stock.remove({_id: stock._id}, function (err) {
                        if (err) return handleError(err);
                    });
                }
                Money.find({}, '_id boughtValue soldValue gain', function (err, money) {
                    var toUpdate = money[0];
                    toUpdate.soldValue += parseFloat(stock.currentPrice);
                    toUpdate.gain += parseFloat(stock.currentPrice);
                    toUpdate.save(function (err) {
                        if (err) throw err;
                    });
                });
                // Insert dans graphic
                Graphic.find({}).sort({$natural:-1}).limit(1).exec(function(err, graph){
                    var newGraph = new Graphic();
                    newGraph.boughtValue = parseFloat(graph[0].boughtValue);
                    newGraph.soldValue =  parseFloat(graph[0].soldValue) +  parseFloat(stock.currentPrice);
                    newGraph.gain = parseFloat(graph[0].gain) + parseFloat(stock.currentPrice);
                    newGraph.save(function (err) {
                        if (err) throw err;
                    });
                });
                res.send(stock);
            }
        });
    });

app.route("/updateStock")
    .get(function(req, res, next){
        Stock.find({}, function (err, stocks) {
            var allSymbol = "";
            if(stocks.length > 0){
                for(var i = 0;i < stocks.length;i++){
                    allSymbol += "'"+stocks[i].symbol+"'";
                    if(i != stocks.length -1){
                        allSymbol += ", ";
                    }
                }
                allSymbol += ")";

                var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20" ;
                var requete = "select symbol, bid from yahoo.finance.quotes where symbol IN (" + allSymbol;
                var data = encodeURIComponent(requete);
                var fullUrl = url + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
                request(fullUrl, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var mapTemp = new Map();
                        // on fetch sur tout ce qu'on a récup
                        if( JSON.parse(body).query.results.quote.length > 1) {
                            (JSON.parse(body).query.results.quote).forEach(function (element) {
                                mapTemp.set(element.symbol, element.bid);
                            });
                        }else{
                            mapTemp.set(JSON.parse(body).query.results.quote.symbol, JSON.parse(body).query.results.quote.bid);
                        }
                        var array = [];
                        for(var i = 0;i<stocks.length;i++){
                            stocks[i].bid = mapTemp.get(stocks[i].symbol);
                            array.push(stocks[i]);
                        }
                        res.send(array);
                    }
                });
            }
        });
    });

app.route('/money')
    .get(function(req, res, next){
        Money.find({}, function (err, money) {
            var moneyValue = new Money();
            if(money.length > 0) {
                moneyValue = money[money.length-1];
            }else{
                moneyValue.boughtValue = 0;
                moneyValue.soldValue = 0;
                moneyValue.gain = 0;
                moneyValue.save( function(err){
                    if ( err ) throw err;
                });
            }
            res.send(moneyValue);
        })
    });

app.route('/graphic')
    .get(function(req, res, next){
        Graphic.find({}).sort({$natural:-1}).limit(10).exec(function(err, graphics){
            var graphicValue = new Graphic();
            var array = [];
            if(graphics.length > 0){
                for(var i = 0;i<graphics.length;i++){
                    array[i] = graphics[i]
                }
            }else{
                graphicValue.boughtValue = 0;
                graphicValue.soldValue = 0;
                graphicValue.gain = 0;
                graphicValue.save( function(err){
                    if ( err ) throw err;
                });
                array[0] = graphicValue;
            }
            res.send(array);
        });
    });

app.listen('3000');
console.log('Server is running...');