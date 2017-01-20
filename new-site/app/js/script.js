/**
 * Created by marcoramires on 1/5/17.
 */

;(function () {
    'use strict';
    angular
        .module('app', ['ui.router', 'oc.lazyLoad', 'angular-google-analytics'])
        .config(['$stateProvider', '$urlRouterProvider', 'AnalyticsProvider', function($stateProvider, $urlRouterProvider, AnalyticsProvider) {

            // Add configuration code as desired
            AnalyticsProvider.setAccount('UA-66126082-2')
                // .trackPages(true)
                .useECommerce(true, true)
                .setPageEvent('$stateChangeSuccess')
                // .readFromRoute(true);
                // .trackUrlParams(true)
                // .setRemoveRegExp(/\?(.*)/); //removes query strings
                .setCurrency('AUD');

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
                templateUrl: '../layout/default.html',
                controller : 'DefaultController'
            };
            var galleryState = {
                name: 'page-gallery',
                url: '/page-gallery',
                templateUrl: 'layout/default.html',
                controller : 'DefaultController'
            };
            var aboutState = {
                name: 'page-about',
                url: '/page-about',
                templateUrl: 'layout/default.html',
                controller: 'DefaultController'
            };
            var paypalState = {
                name: 'page-paypal',
                url: '/page-paypal',
                templateUrl: 'layout/default.html',
                controller: 'DefaultController'
            };
            var pictureState = {
                name: 'picture',
                url: '/picture/:pictureName',
                templateUrl: 'layout/picture.html',
                controller: 'PictureController as picture'
            };
            var blogState = {
                name: 'blog',
                url: '/blog',
                templateUrl: 'layout/blog.html'
            };
            var postState = {
                name: 'post',
                url: '/post',
                templateUrl: 'layout/post.html'
            };

            $stateProvider.state(homeState);
            $stateProvider.state(contactState);
            $stateProvider.state(galleryState);
            $stateProvider.state(aboutState);
            $stateProvider.state(pictureState);
            $stateProvider.state(blogState);
            $stateProvider.state(postState);
            $stateProvider.state(paypalState);
        }]).run(['$rootScope', 'Analytics', function($rootScope, Analytics) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                // console.info('[event] routeChangeStart...');
                Pace.restart();
            });
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap('body', ['app']);
    });
})();