/**
 * Created by jerome on 26/02/2017.
 */
angular.module('actions').factory('Money',
    [function() {
        var Money = {};

        Money.update = function(data){
            this.boughtValue = data.boughtValue;
            this.soldValue = data.soldValue;
            this.gain = data.gain;
        };
        return Money;
    }]);