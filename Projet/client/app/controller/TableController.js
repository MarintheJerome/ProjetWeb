angular.module('actions').controller('TableController',
    ['$scope', '$http', 'Stock',function($scope, $http, Stock) {
        $scope.search = function(){
            $http.get("http://localhost:3000/recherche", {
                params: { searchValue: $scope.searchStocks }
            }).then(function (rep){
                $scope.stocks = [];
                var json = JSON.parse(rep.data).query.results.quote;
                if(json.Ask != null){
                    var newStock = new Stock(JSON.parse(rep.data).query.results.quote);
                    $scope.stocks.push(newStock);
                }
            })
        };
    }]);

