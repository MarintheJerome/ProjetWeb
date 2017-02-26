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

var Stock = mongoose.model('Stock', StockSchema);
var Money = mongoose.model('Money', MoneySchema);

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
                stock.quantity = stock.quantity + 1;
                stock.save(function (err) {
                    if (err) throw err;
                });
                actionToSave.boughtPrice = stock.boughtPrice;
                actionToSave.currentPrice = stock.currentPrice;
                actionToSave.quantity = stock.quantity;
            } else { // on insert
                actionToSave.boughtPrice = req.body.price;
                actionToSave.currentPrice = req.body.price;
                actionToSave.save(function (err) {
                    if (err) throw err;
                });
            }
            // Update dans Money
            Money.find({}, '_id boughtValue soldValue gain', function (err, money) {
                var toUpdate = money[0];
                toUpdate.boughtValue += parseFloat(req.body.price);
                toUpdate.gain-= req.body.price;
                toUpdate.save(function (err) {
                    if (err) throw err;
                });
            });
            res.send(actionToSave);
        })
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

app.listen('3000');
console.log('Server is running...');