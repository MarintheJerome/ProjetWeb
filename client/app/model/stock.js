/**
 * Created by jerome on 31/01/2017.
 */
angular.module('actions').factory('Stock',
    [function() {
        var Stock = function(data) {
            this.id = data.id;
            this.name = data.t;
            this.price = data.l;
        }
        return Stock;
    }]);