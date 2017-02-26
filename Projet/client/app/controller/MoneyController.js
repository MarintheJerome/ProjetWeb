/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').controller('MoneyController',
    ['$scope', '$http', 'Money', function($scope, $http, Money) {
        $scope.money = Money;

        $http.get('http://localhost:3000/money')
            .then(function(rep) {
                Money.update(rep.data);
                $scope.money = Money;
            }, function(error) {
                console.log(error);
            });
    }]);

