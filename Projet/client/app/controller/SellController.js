angular.module('actions').controller('SellController',
    ['$scope', '$http', 'StockBought', 'Money', function($scope,  $http, StockBought, Money) {
        $scope.$parent.sellStock = function(stock){

            $http.post("http://localhost:3000/sell", stock).then(function (rep){
                console.log($scope);
                if(rep.data.quantity > 0){
                    $scope.$parent.stockbought.quantity--;
                }
                else{
                    $scope.$parent.stockbought = null;
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

