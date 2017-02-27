/**
 * Created by jerome on 27/02/2017.
 */
angular.module('actions').controller('GraphicController',
    ['$scope', '$http', 'Graphic', function($scope, $http, Graphic) {

       $http.get('http://localhost:3000/graphic')
            .then(function(rep) {
                for(var i = 0;i<rep.data.length;i++){
                    Graphic.update(rep.data[i]);
                }
            }, function(error) {
                console.log(error);
            });
    }]);

