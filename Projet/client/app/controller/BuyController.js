angular.module('actions').controller('BuyController',
    ['$scope', '$http', 'StockBought', 'Money', function($scope,  $http, StockBought, Money) {
        $scope.stocksbought = [];

        $scope.$parent.buyStock = function(stock){
            console.log($scope.stocksbought);
            $http.post("http://localhost:3000/buy", stock).then(function (rep){
                var alreadyExists = false;
                var compteur = 0;
                var stock = new StockBought(rep.data);
                for(var i = 0; i < $scope.stocksbought.length ;i++){
                    if($scope.stocksbought[i].name == stock.name){
                        compteur = i;
                        alreadyExists = true;
                    }
                }
                if(alreadyExists){
                    $scope.stocksbought.splice(compteur, 1);
                }
                $scope.stocksbought.push(stock);

                $http.get('http://localhost:3000/money')
                    .then(function(reponse) {
                        Money.update(reponse.data);
                    }, function(error) {
                        console.log(error);
                    });
            })
        }
    }]);

