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
                arrayBoughtValue.push("Argent dépensé");
                var arraySoldValue = [];
                arraySoldValue.push("Somme vendue");
                for(var i = rep.data.length;i>0;i--){
                    arrayGain.push(rep.data[i-1].gain.toFixed(2));
                    arrayBoughtValue.push(rep.data[i-1].boughtValue.toFixed(2));
                    arraySoldValue.push(rep.data[i-1].soldValue.toFixed(2));
                }
                Graphic.update(arrayGain, arrayBoughtValue, arraySoldValue);
            }, function(error) {
                console.log(error);
            });
    }]);

