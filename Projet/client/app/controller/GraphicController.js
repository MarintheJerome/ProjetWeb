/**
 * Created by jerome on 27/02/2017.
 */
angular.module('actions').controller('GraphicController',
    ['$scope', '$http', 'Graphic', function($scope, $http, Graphic) {

       $http.get('http://localhost:3000/graphic')
            .then(function(rep) {
                var arrayGain = [];
                arrayGain.push("Gain");
                var arrayBoughtValue = [];
                arrayBoughtValue.push("Somme achetée");
                var arraySoldValue = [];
                arraySoldValue.push("Somme vendue");
                for(var i = 0;i<rep.data.length;i++){
                    arrayGain.push(rep.data[i].gain.toFixed(2));
                    arrayBoughtValue.push(rep.data[i].boughtValue.toFixed(2));
                    arraySoldValue.push(rep.data[i].soldValue.toFixed(2));
                }
                console.log(arrayGain);
                console.log(arrayBoughtValue);
                console.log(arraySoldValue);
                Graphic.update(arrayGain, arrayBoughtValue, arraySoldValue);
            }, function(error) {
                console.log(error);
            });
    }]);

