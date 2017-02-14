angular.module('actions').controller('BuyController',
    ['$scope', function($scope) {
        $scope.stocksbought = [];

        $scope.$parent.buyStock = function(stock){
            $scope.stocksbought.push(stock);
        }
    }]);

