/**
 * Created by jerome on 31/01/2017.
 */
angular.module('actions').directive('stockbought',
    [function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'client/template/stockbought.html',
        }
    }]);
