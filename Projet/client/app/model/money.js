/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').factory('Money',
    [function() {
        var Money = {};

        Money.update = function(data){
            this.boughtValue = data.boughtValue.toFixed(2);
            this.soldValue = data.soldValue.toFixed(2);
            this.gain = data.gain.toFixed(2);
        };
        return Money;
    }]);