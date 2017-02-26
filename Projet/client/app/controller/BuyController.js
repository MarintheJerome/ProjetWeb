angular.module('actions').controller('BuyController',
    ['$scope', '$http', 'StockBought', function($scope,  $http, StockBought) {
        $scope.stocksbought = [];

        $scope.$parent.buyStock = function(stock){
            $http.post("http://localhost:3000/buy", stock).then(function (rep){
                var stock = new StockBought(rep.data);
                $scope.stocksbought.push(stock);
            })
        }
    }]);

