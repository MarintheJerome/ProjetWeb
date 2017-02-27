/**
 * Created by jerome on 27/02/2017.
 */
angular.module('actions').factory('Graphic',
    [function() {
        var graph = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    ['Gain', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ['Somme achetée', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    ['Somme vendue', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            color: {
                pattern: ['#1E90FF', '#aec7e8']
            }
        });

        graph.update = function(value) {
            graph.flow({
                columns: [
                    ['Gain', value.gain.toFixed(2)],
                    ['Somme achetée', value.boughtValue.toFixed(2)],
                    ['Somme vendue', value.soldValue.toFixed(2)]
                ]
            });
        };
        return graph;
    }]);