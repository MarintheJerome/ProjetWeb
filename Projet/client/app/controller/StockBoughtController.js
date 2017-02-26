/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').controller('StockBoughtController',
    ['$scope', '$http', 'Money','ListStock',
        function($scope, $http, Money, ListStock) {
            $scope.stocksbought = [];
            $scope.stocksbought = ListStock;
        }]);