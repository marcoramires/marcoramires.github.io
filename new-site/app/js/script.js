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
                template: '<h3>Home Page</h3>'
            };

            var contactState = {
                name: 'page-contact',
                url: '/page-contact',
                template: '<h3>Home Page</h3>'
            };

            var galleryState = {
                name: 'page-gallery',
                url: '/page-gallery',
                template: '<h3>Home Page</h3>'
            };

            var aboutState = {
                name: 'page-about',
                url: '/page-gallery',
                template: '<h3>Home Page</h3>'
            };

            var pictureState = {
                name: 'picture',
                url: '/picture',
                template: '<h3>Picture Page</h3>'
            };

            var blogState = {
                name: 'blog',
                url: '/blog',
                template: '<h3>Blog Page</h3>'
            };

            var postState = {
                name: 'post',
                url: '/post',
                template: '<h3>Post Page</h3>'
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