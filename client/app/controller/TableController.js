angular.module('actions').controller('TableController',
    ['$scope', '$http', 'Stock',function($scope, $http, Stock) {

        $http.get("stocks.json")
            .then(function(response) {
                $scope.stocks = [];
                response.data.forEach(function(data) {
                    var newStock = new Stock(data);
                    $scope.stocks.push(newStock);
                });
            }, function(error) {
                console.log(error);
            });

        $scope.yolo = function() {
            console.log($scope.search.Name);
        }
    }]);