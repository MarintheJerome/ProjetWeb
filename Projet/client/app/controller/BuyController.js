angular.module('actions').controller('BuyController',
    ['$scope', '$http', 'StockBought', 'Money', 'ListStock', function($scope,  $http, StockBought, Money, ListStock) {
        $scope.stocksbought = [];

        $scope.$parent.buyStock = function(stock){
            $http.post("http://localhost:3000/buy", stock).then(function (rep){
                var alreadyExists = false;
                var stock = new StockBought(rep.data);
                for(var i = 0; i < ListStock.length ;i++){
                    if(ListStock[i].name == stock.name){
                        alreadyExists = true;
                        ListStock[i].quantity++;
                    }
                }
                if(!alreadyExists){
                    ListStock.insert(stock);
                }
                $http.get('http://localhost:3000/money')
                    .then(function(reponse) {
                        Money.update(reponse.data);
                    }, function(error) {
                        console.log(error);
                    });
            })
        }
    }]);

