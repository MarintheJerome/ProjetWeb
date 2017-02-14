/**
 * Created by jerome on 31/01/2017.
 */
angular.module('actions').factory('Stock',
    [function() {
        var Stock = function(data) {
            this.name = data.Name;
            this.symbol = data.Symbol;
            this.price = data.Ask;
        }
        return Stock;
    }]);