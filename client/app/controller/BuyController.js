angular.module('actions').controller('BuyController',
    ['$scope', function($scope) {
        $scope.stocksbought = [];

        $scope.addStock = function(stock){
            console.log("FDP DE ANGULAR");
            var findStock = $scope.stocksbought.find(function(value) {
                console.log(value.name);
                console.log(stock.name);
                return value.name === stock.name;
            });
            if(!findStock){
                console.log("CA DEVRAIT ADD");
                $scope.stocksbought.push(stock);
            }
        }
    }]);

