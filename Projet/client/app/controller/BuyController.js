angular.module('actions').controller('BuyController',
    ['$scope', '$http', 'StockBought', 'Money', 'ListStock', 'Graphic', function($scope,  $http, StockBought, Money, ListStock, Graphic) {
        $scope.stocksbought = [];

        $scope.$parent.buyStock = function(stock){
            $http.post("http://localhost:3000/buy", stock).then(function (rep){
                var alreadyExists = false;
                var stock = new StockBought(rep.data);
                for(var i = 0; i < ListStock.length ;i++){
                    if(ListStock[i].name == stock.name){
                        alreadyExists = true;
                        ListStock[i].quantity++;
                    }
                }
                if(!alreadyExists){
                    ListStock.insert(stock);
                }
                setTimeout(function() {
                    $http.get('http://localhost:3000/money')
                        .then(function (reponse) {
                            Money.update(reponse.data);
                        }, function (error) {
                            console.log(error);
                        });
                }, 100);
            });

            setTimeout(function() {
                $http.get('http://localhost:3000/graphic')
                    .then(function(rep) {
                        console.log(rep.data.length);
                        console.log(rep);
                        var arrayGain = [];
                        arrayGain.push("Gain");
                        var arrayBoughtValue = [];
                        arrayBoughtValue.push("Somme achetée");
                        var arraySoldValue = [];
                        arraySoldValue.push("Somme vendue");
                        for(var i = rep.data.length;i>0;i--){
                            arrayGain.push(rep.data[i-1].gain.toFixed(2));
                            arrayBoughtValue.push(rep.data[i-1].boughtValue.toFixed(2));
                            arraySoldValue.push(rep.data[i-1].soldValue.toFixed(2));
                        }
                        Graphic.update(arrayGain, arrayBoughtValue, arraySoldValue);
                    }, function(error) {
                        console.log(error);
                    });
            }, 100);
        }
    }]);

