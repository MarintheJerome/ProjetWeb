angular.module('actions').controller('SellController',
    ['$scope', '$http', 'StockBought', 'Money', 'ListStock', 'Graphic', function($scope,  $http, StockBought, Money, ListStock, Graphic) {
        $scope.$parent.sellStock = function(stock){

            $http.post("http://localhost:3000/sell", stock).then(function (rep){
                var compteur = -1;
                for(var i = 0; i < ListStock.length ;i++){
                    if(ListStock[i].name == rep.data.name){
                        compteur = i;
                    }
                }
                if(rep.data.quantity > 0){
                    ListStock[compteur].quantity--;
                }
                else{
                    ListStock.remove(compteur, ListStock[compteur]);
                }
                // Update porte-feuille
                $http.get('http://localhost:3000/money')
                    .then(function(reponse) {
                        Money.update(reponse.data);
                    }, function(error) {
                        console.log(error);
                    });
            });

            $http.get('http://localhost:3000/graphic')
                .then(function(rep) {
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

        }
    }]);

