/**
 * Created by jerome on 27/02/2017.
 */
angular.module('actions').factory('Graphic',
    [function() {
        var graph = c3.generate({
            data: {
                columns: [
                    ['Gain'],
                    ['Argent dépensé'],
                    ['Somme vendue']
                ]
            },
        });

        graph.update = function(gain, boughtValue, soldValue) {
            graph.load({
                columns: [
                    gain,
                    boughtValue,
                    soldValue
                ]
            });
        };
        return graph;
    }]);