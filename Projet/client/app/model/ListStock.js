/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').factory('ListStock',
    [function() {
        var ListStock = [] ;

        ListStock.insert = function(data) {
            ListStock.push(data);
        };

        ListStock.remove = function(i, data) {
            ListStock.splice(i, 1);
        };

        ListStock.refresh = function() {
            ListStock = [];
        };

        return ListStock;
    }]);