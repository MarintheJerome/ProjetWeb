angular.module('actions').controller('SellController',
    ['$scope', '$http', 'StockBought', 'Money', 'ListStock', function($scope,  $http, StockBought, Money, ListStock) {
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

        }
    }]);

