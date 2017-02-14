/**
 * Created by jerome on 14/02/2017.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var db = mongoose.connect('mongodb://localhost/Action');

// MONGO config for the project
var Schema = mongoose.Schema;
// maping for the stock object in mongo
var StockSchema = new Schema({
    name: String,
    symbol: String,
    price: Number
});
var Stock = mongoose.model('Action', StockSchema);

//  angularJS app directory
app.use(express.static(__dirname + '/Projet'));

// parse body of request in json
app.use(bodyParser.json());

app.route('/recherche')
    .get(function(req, res, next){
        console.log(req.query.searchValue);
        var url = "https://query.yahooapis.com/v1/public/yql?q=env%20'store%3A%2F%2Fdatatables.org%2Falltableswithkeys'%3B%20" ;
        var data = encodeURIComponent('select * from yahoo.finance.quotes where symbol = "' + req.query.searchValue + '"');
        var fullUrl = url + data + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
        request(fullUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Print the google web page.
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
            }
        });
        /* Stock.find({}, function(err, stocks){
            if(err){
                return next(err);
            } else {
                res.json(stocks);
            }
        }) */
    })
    .post(function(req, res, next){
        console.log("lol2");
        var stock = new Stock(req.body);
        stock.save(function(err){
            if(err){
                return next(err);
            } else {
                return res.json(stock);
            }
        });
    });

app.listen('3000');
console.log('Server is running...');