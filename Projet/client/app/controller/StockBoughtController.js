/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').controller('StockBoughtController',
    ['$scope', '$http', 'Money', 'StockBought', 'ListStock',
        function($scope, $http, Money, StockBought, ListStock) {
            $scope.stocksbought = [];
            $scope.stocksbought = ListStock;

            $http.get('http://localhost:3000/updateStock').then(function(response) {
                if(response.data.length > 0){
                    response.data.forEach(function(data) {
                        var stockBought = new StockBought(data);
                        ListStock.insert(stockBought);
                    });
                }
            }, function(error) {
                   console.log(error);
            });

            setInterval(function(){
                $http.get('http://localhost:3000/updateStock').then(function(response) {
                    if(response.data.length > 0){
                        response.data.forEach(function(data) {
                            var stockBought = new StockBought(data);
                            ListStock.update(stockBought);
                        });
                    }
                }, function(error) {
                    console.log(error);
                });
            }, 30000)
        }]);