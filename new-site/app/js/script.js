/**
 * Created by marcoramires on 1/5/17.
 */

;(function () {
    'use strict';
    angular
        .module('app', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

            /* Router - Angular UI Router */
            /* -------------------------- */
            $urlRouterProvider.otherwise('/');

            var homeState = {
                name: 'home',
                url: '/',
                templateUrl: 'layout/default.html',
                controller : 'DefaultController'
            };

            var contactState = {
                name: 'page-contact',
                url: '/page-contact',
                templateUrl: '../layout/default.html'
            };

            var galleryState = {
                name: 'page-gallery',
                url: '/page-gallery',
                templateUrl: '../layout/default.html'
            };

            var aboutState = {
                name: 'page-about',
                url: '/page-gallery',
                templateUrl: '../layout/default.html'
            };

            var pictureState = {
                name: 'picture',
                url: '/picture',
                templateUrl: '../layout/default.html'
            };

            var blogState = {
                name: 'blog',
                url: '/blog',
                templateUrl: '../layout/default.html'
            };

            var postState = {
                name: 'post',
                url: '/post',
                templateUrl: '../layout/default.html'
            };

            $stateProvider.state(homeState);
            $stateProvider.state(pictureState);
            $stateProvider.state(postState);
            $stateProvider.state(blogState);
            $stateProvider.state(contactState);
            $stateProvider.state(galleryState);
            $stateProvider.state(aboutState);
        }]);

    angular.element(document).ready(function() {
        angular.bootstrap('body', ['app']);
    });
})();