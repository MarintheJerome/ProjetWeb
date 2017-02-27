/**
 * Created by jerome on 26/02/2017.
 */
/**
 * Created by jerome on 31/01/2017.
 */
    angular.module('actions').factory('StockBought',
    [function() {
        var StockBought = function(data) {
            this.name = data.name;
            this.symbol = data.symbol;
            this.quantity = data.quantity;
            this.currentPrice = data.currentPrice;
            this.boughtPrice = data.boughtPrice;
        };
        return StockBought;
    }]);