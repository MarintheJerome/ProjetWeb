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

        $scope.buyStock = function(stock){
            angular.element(document.getElementById('allActions')).scope().addStock(stock);
        }

        $scope.priceFilter = function (Stock) {
            var price = parseFloat(Stock.price);
            var min = parseFloat($scope.minPrice);
            var max = parseFloat($scope.maxPrice);
            
            if (!price) {
                return false;
            }

            if(min && price < min) {
                return false;
            }

            if(max && price > max) {
                return false;
            }

            return true;
        };
    }]);

