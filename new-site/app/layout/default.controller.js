/**
 * Created by marcoramires on 1/15/17.
 */


function DefaultController($scope, $log) {
    $log.log('> Default Controller: ', this);
}

DefaultController.$inject = ['$scope', '$log'];

angular
    .module('app')
    .controller('DefaultController', DefaultController);