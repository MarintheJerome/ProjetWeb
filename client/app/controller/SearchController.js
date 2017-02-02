/**
 * Created by jerome on 31/01/2017.
 */
angular.module('actions').controller('SearchController',
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
            console.log("oto");
            console.log($scope.search.Name);
        }

    }]);