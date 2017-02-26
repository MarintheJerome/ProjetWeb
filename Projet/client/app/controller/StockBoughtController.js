/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').controller('StockBoughtController',
    ['$scope', '$http', 'Money', 'StockBought', 'ListStock',
        function($scope, $http, Money, StockBought, ListStock) {
            $scope.stocksbought = [];
            $scope.stocksbought = ListStock;

            $http.get('http://localhost:3000/updateStock').then(function(response) {
                    response.data.forEach(function(data) {
                        var stockBought = new StockBought(data);
                        ListStock.insert(stockBought);
                    });
            }, function(error) {
                   console.log(error);
            });
        }]);