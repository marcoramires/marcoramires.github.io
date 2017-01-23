/**
 * Created by marcoramires on 1/5/17.
 */

;(function () {
    'use strict';
    angular
        .module('app', ['ui.router', 'oc.lazyLoad', 'angular-google-analytics'])
        .config(['$sceDelegateProvider', '$stateProvider', '$urlRouterProvider', 'AnalyticsProvider', function($sceDelegateProvider, $stateProvider, $urlRouterProvider, AnalyticsProvider) {

            var _env = 'production';
            var _analytics = {
                sandbox: 'UA-66126082-2',
                production: 'UA-66126082-1'
            };

            AnalyticsProvider.setAccount(_analytics[_env])
                // .trackPages(true)
                .useECommerce(true, true)
                .setPageEvent('$stateChangeSuccess')
                .ignoreFirstPageLoad(true)
                // .readFromRoute(true);
                // .trackUrlParams(true)
                // .setRemoveRegExp(/\?(.*)/); //removes query strings
                .setCurrency('AUD');

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'https://marcoramires.imgix.net/**'
            ]);

            /* Router - Angular UI Router */
            /* -------------------------- */
            $urlRouterProvider.otherwise('/');
            var homeState = {
                name: 'home',
                url: '/',
                templateUrl: '/dist/layout/default.html',
                controller : 'DefaultController'
            };
            var contactState = {
                name: 'page-contact',
                url: '/page-contact',
                templateUrl: '/dist/layout/default.html',
                controller : 'DefaultController'
            };
            var galleryState = {
                name: 'page-gallery',
                url: '/page-gallery',
                templateUrl: '/dist/layout/default.html',
                controller : 'DefaultController'
            };
            var aboutState = {
                name: 'page-about',
                url: '/page-about',
                templateUrl: '/dist/layout/default.html',
                controller: 'DefaultController'
            };
            var paypalState = {
                name: 'page-paypal',
                url: '/page-paypal',
                templateUrl: '/dist/layout/default.html',
                controller: 'DefaultController'
            };
            var pictureState = {
                name: 'picture',
                url: '/picture/:pictureName',
                templateUrl: '/dist/layout/picture.html',
                controller: 'PictureController'
            };
            var blogState = {
                name: 'blog',
                url: '/blog',
                templateUrl: '/dist/layout/blog.html'
            };
            var postState = {
                name: 'post',
                url: '/post',
                templateUrl: '/dist/layout/post.html'
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
/**
 * Created by marcoramires on 1/22/17.
 */
function DataService($http, $log) {

    return {
        getCollection: getCollection,
        getItem: getItem
    };

    function getCollection(type) {
        return $http.get('/dist/data/app.' + type + '.json')
            .then(getCollectionComplete)
            .catch(getCollectionFailed);

        function getCollectionComplete(response) {
            return response.data;
        }

        function getCollectionFailed(error) {
            $log.error('XHR Failed for getCollection.' + error.data);
        }
    }

    function getItem(type, query, queryBy) {
        return $http.get('/dist/data/app.' + type + '.json')
            .then(getItemComplete)
            .catch(getItemFailed);

        function getItemComplete(response) {
            var matchIndex = '';
            $.each(response.data, function (index, value) {
                if(query.toLowerCase() === value[queryBy]) {
                    matchIndex = index;
                }
            });
            return response.data[matchIndex];
        }

        function getItemFailed(error) {
            $log.error('XHR Failed for getItem.' + error.data);
        }
    }
}

DataService.$inject = ['$http', '$log'];

angular
    .module('app')
    .factory('DataService', DataService);

/**
 * Created by marcoramires on 20/1/17.
 */

function Events_Service (Analytics){

    function Events_Service() {

        var _linkControl = function () {
            $("a[href*='http://'], a[href*='https://']").addClass('external-link').attr('target', '_blank');
        };

        var _gaExternalLinks = function () {
            $('.external-link').click(function() {
                var url = $(this).attr('href');
                Analytics.trackEvent('Outbound Links', 'Click', url);
                window.open(this.href);
                return false;
            });
        };

        var _gaSelect = function () {
            $('select').on('change', function() {
                var text = $(this).find('option:selected').text();
                Analytics.trackEvent('Select', 'Change', text);
            });
        };

        var _gaButton = function () {
            $('button').click(function() {
                var text = $(this).text();
                Analytics.trackEvent('Button', 'Click', text);
            });
        };

        var _gaFilters = function() {
          $('#filters li').click(function () {
              var filter = $(this).attr('data-filter').replace('.','');
              Analytics.trackEvent('Filter', 'Click', filter);
          });
        };

        var _gaShoppingCart = function() {
            $('a.shopping-cart').click(function () {
                var link = $(this).attr('href').replace('#!', '');
                Analytics.trackEvent('Shopping Cart Link', 'Click', link);
            });
        };

        var _gaFavorite = function() {
            $('a.favorite').click(function () {
                var link = $(this).attr('href').replace('#!', '');
                Analytics.trackEvent('Favorite Link', 'Click', link);
            });
        };

        var _resizeAddressBar = function () {
            var $w = $(window),
                $background = $('.animate-content, .left-menu.navbar');

            // Fix background image jump on mobile
            if ((/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
                $background.css({'top': 'auto', 'bottom': 0});
                $w.resize(sizeBackground);
                sizeBackground();
            }

            function sizeBackground() {
                $background.height(screen.height);
            }
        };

        this.all = function () {
            _linkControl();
            _gaExternalLinks();
            _gaSelect();
            _gaButton();
            _gaFilters();
            _gaShoppingCart();
            _gaFavorite();
            _resizeAddressBar();
        };
    }

    Events_Service.run = function () {
        return new Events_Service();
    };

    return Events_Service;
}

angular
    .module('app')
    .factory('Events_Service', Events_Service);

Events_Service.$inject = ['Analytics'];
/**
 * Created by marcoramires on 1/15/17.
 */

angular
    .module('app')
    .controller('DefaultController', DefaultController);

DefaultController.$inject = ['$timeout', '$scope', '$log', '$location', 'Analytics', 'Events_Service', 'DataService'];

function DefaultController($timeout, $scope, $log, $location, Analytics, Events_Service, DataService) {
    $log.log('> Default Controller: ', this);

    var searchObject = $location.search();
    $scope.orderId = searchObject.paymentId;

    // $scope.imageSizesTemplate = ['w=901&h=901', 'w=431&h=597', 'w=431&h=701', 'w=431&h=507', 'w=431&h=501', 'w=431&h=701', 'w=431&h=341', 'w=901&h=521', 'w=862&h=822', 'w=431&h=507', 'w=901&h=901', 'w=431&h=401', 'w=431&h=411', 'w=431&h=701', 'w=901&h=521', 'w=431&h=701', 'w=431&h=597', 'w=431&h=341'];
    $scope.imageSizes = ['w=901&h=901'];

    // DataService.getCollection('pictures').then(function (data) {
    //     $scope.pictures = data;
    // });

    /* ----------------------------------------------
     P R E L O A D E R - TODO: Move to Service layer
     ------------------------------------------------*/
    function preloader() {
        Pace.on('done', function () {
            $(".animate-content").addClass('load-finish');
            $log.log('* Pre-Loader Done *');
        });
    }

    /*----------------------------------------------
     S L I D E R
     ------------------------------------------------*/
    function mainBanner() {
        if ($('#rev_slider').length > 0) {
            var revapi16;
            if ($('#rev_slider').revolution == undefined) {
                revslider_showDoubleJqueryError('#rev_slider');
            } else {
                revapi16 = $('#rev_slider').show().revolution({
                    sliderType: 'carousel',
                    jsFileLocation: '../revolution/js/',
                    sliderLayout: 'fullscreen',
                    dottedOverlay: 'none',
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: 'off',
                        keyboard_direction: 'horizontal',
                        mouseScrollNavigation: 'off',
                        // mouseScrollNavigation:"on",
                        // mouseScrollReverse:"default",
                        onHoverStop: 'off',
                        touch: {
                            touchenabled: 'on',
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: 'horizontal',
                            drag_block_vertical: false
                        },

                        arrows: {
                            style: 'arrowpag',
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 600,
                            hide_onleave: false,
                            hide_delay: 200,
                            hide_delay_mobile: 1200,
                            tmp: '<div class="arrow-text">{{param1}}</div>',
                            left: {
                                h_align: 'left',
                                v_align: 'center',
                                h_offset: 30,
                                v_offset: 0
                            },
                            right: {
                                h_align: 'right',
                                v_align: 'center',
                                h_offset: 30,
                                v_offset: 0
                            }
                        },

                        tabs: {
                            style: 'hermes',
                            enable: true,
                            // width: 175,
                            // height: 140,
                            width: 320,
                            height: 160,
                            min_width: 150,
                            wrapper_padding: 0,
                            wrapper_color: '#000000',
                            wrapper_opacity: '0.5',
                            tmp: '<span class="tp-tab-image"></span>',
                            visibleAmount: 10,
                            hide_onmobile: true,
                            hide_under: 776,
                            hide_onleave: false,
                            hide_delay: 200,
                            // direction: "vertical",
                            direction: 'horizontal',
                            span: true,
                            position: 'inner',
                            space: 0,
                            // h_align: "right",
                            h_align: 'center',
                            v_align: 'bottom',
                            h_offset: 0,
                            v_offset: 100
                        }
                    },
                    carousel: {
                        horizontal_align: 'center',
                        vertical_align: 'center',
                        fadeout: 'on',
                        vary_fade: 'on',
                        maxVisibleItems: 3,
                        infinity: 'on',
                        space: 0,
                        stretch: 'on'
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    gridwidth: [800, 640, 480, 480],
                    gridheight: [720, 720, 480, 360],
                    visibilityLevels: [1240, 1024, 778, 480],
                    lazyLoad: 'on',
                    lazyType: 'smart',
                    parallax: {
                        type: 'scroll',
                        origo: 'enterpoint',
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
                    },
                    shadow: 0,
                    spinner: 'off',
                    stopLoop: 'off',
                    stopAfterLoops: 0,
                    stopAtSlide: -1,
                    shuffle: 'off',
                    autoHeight: 'off',
                    disableProgressBar: 'off',
                    hideThumbsOnMobile: 'off',
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: 'off',
                        nextSlideOnWindowFocus: 'off',
                        disableFocusListener: false
                    }
                });
            }
        }
        $('#thumbsButton').on('mouseenter', function (e) {
            $('body').toggleClass('showThumbnails');
        });
        $('.tp-tabs').on('mouseleave', function (e) {
            $('body').removeClass('showThumbnails');
        });
        $log.log('* Main-Banner Done *');
    }

    /*----------------------------------------------
     I M A G E   L A Y E R
     ------------------------------------------------*/
    function imageLayer() {
        $('.slotholder').each(function () {
            $(this).after('<div class="img-lr"></div>');
        });
        $('.grid-lr').each(function () {
            $(this).after('<div class="img-lr-grid"></div>');
        });
        $log.log('* Image-Layer Done *');
    }
    function imageLayerGallery() {
        $('.lg-img-wrap').each(function () {
            $(this).after('<div class="img-lr"></div>');
        });
        $log.log('* Image-Layer-Gallery Done *');
    }

    /*----------------------------------------------
     N A V I G A T I O N - TODO: Move to Service layer
     ------------------------------------------------*/
    function navigation() {
        $('.left-menu .navbar').on('click', function (e) {
            $(this).toggleClass('active');
        }).on('mouseleave', function (e) {
            $(this).removeClass('active');
        });

        $('.navbar-nav li a', '#navbar').on('click', function (e) {
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('#navbar').collapse('hide');
        });

        $('.open-layer, .open-home').on('click', function () {
            Analytics.trackPage($(this).attr('data-layer'));
        });
        $log.log('* Navigation Done *');
    }

    /*----------------------------------------------
     M A N A G E  P A G E S
     ------------------------------------------------*/
    function managePages() {
        $('.open-layer', '#navbar').on('click', function (e) {
            closeLayer();
            var wheight = $(window).height();
            var layerToOpen = $(this).data('layer');
            $('.layer-page').removeClass('active');
            $('.' + layerToOpen).css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-moz-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-ms-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-o-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                'transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')'
            }).addClass('active');
            closeNavVertical();
            return false;
        });
        $('.open-home').on('click', function (e) {
            closeLayer();
            closeNavVertical();
            return false;
        });
        $('.close-layer').on('click', function (e) {
            closeLayer();
        });

        // // hast navigation
        var match = location.hash.match(/^#!\/?(.*)$/)[1];
        if (match) {
            var wheight1 = $(window).height();
            $('.layer-page').removeClass('active');
            $('.' + match.split("?")[0]).css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight1 + ')',
                '-moz-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight1 + ')',
                '-ms-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight1 + ')',
                '-o-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight1 + ')',
                'transform': 'matrix(1, 0, 0, 1, 0, -' + wheight1 + ')'
            }).addClass('active');
        }
        $log.log('* Manage-Page Done *');
    }

    /*----------------------------------------------
     P A G E S - H E L P E R //TODO: Add to service layer
     ------------------------------------------------*/
    function closeLayer() {
        var $layerPage = $('.layer-page');
        $layerPage.css({
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none',
            'transform': 'none'
        });
        $layerPage.removeClass('active');
    }
    function closeNavVertical() {
        $('.left-menu .navbar').removeClass('active');
        $('#navbar').collapse('hide');
    }
    function resizeLayers() {
        var wheight = $(window).height();
        $('.layer-page.active').css({
            '-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-moz-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-ms-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-o-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            'transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')'
        });
    }
    $(window).on('resize', function (e) {
        resizeLayers();
        closeNavVertical();
        // $log.log('* Window-Resize Done *');
    });

    /*----------------------------------------------
     I S O T O P E - TODO: Move to Service layer
     ------------------------------------------------*/
    function isotopeGrid() {
        if ($('#grid-gallery').length > 0) {
            // gallery
            var $galleryGrid = $('#grid-gallery').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    columnWidth: '.grid-item'
                }
            });

            // filter items on button click
            $('#filters').on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                $galleryGrid.isotope({filter: filterValue});
            });

            // change is-checked class on buttons
            $('#filters').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'li', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });

            // lightbox
            var $lg = $('#grid-gallery');
            $lg.lightGallery({
                selector: '.grid-item',
                showThumbByDefault: !1,
                cssEasing: 'cubic-bezier(.77,0,.175,1)',
                easing: 'easeOutSine',
                hideBarsDelay: 99999,
                download: false,
                zoom: false
                // animateThumb: false
            });

            $lg.on('onAfterOpen.lg', function (event) {
                imageLayerGallery();
            });

            $('.gallery-links a').click(function(e) {
                e.stopPropagation();
            });

            $('.gallery-links a.favorite').click(function(e) {
                e.preventDefault();
            });

        }
        $log.log('* Isotope-Grid Done *');
    }

    /* ---------------------------------------------
    M O B I L E  F A B
    ------------------------------------------------*/
    function mobileFab () {
        $('.fab').on('click', function() {
            $(this).parent(".holder").addClass("is-expandend");

            var $dy = $(this);
            $dy.lightGallery({
                dynamic: true,
                dynamicEl: [{
                    "src":  $(this).attr('data-src')
                }],
                showThumbByDefault: !1,
                cssEasing: 'cubic-bezier(.77,0,.175,1)',
                easing: 'easeOutSine',
                hideBarsDelay: 99999,
                download: false,
                zoom: false
            });

            $dy.on('onAfterOpen.lg',function(event){
                imageLayerGallery();
            });

            $dy.on('onCloseAfter.lg',function(event){
                $(this).parent(".holder").removeClass("is-expandend");
            });

            // Create a new tracking event with a value
            Analytics.trackEvent('Home Page', 'FAB (full-screen)', 'Yellow Fin', 1);
        });

        //TODO: Review this
        setTimeout(function() {
            $('.fab').fadeIn();
        }, 1000);
        setTimeout(function() {
            $('.fab').addClass('animate');
        }, 1500);

        $log.log('* Mobile-FAB Done *');
    }

    /*----------------------------------------------
     A N G U L A R  R E A D Y
     ------------------------------------------------*/
    angular.element(document).ready(function() {
        $('body').removeClass('page-blog page-picture');
        DataService.getCollection('pictures').then(function (data) {
            $scope.pictures = data;
            preloader();
            //TODO: Move to directive
            $timeout(function () {
                mainBanner();
                mobileFab();
                isotopeGrid();
            }, 100);
            navigation();
            managePages();
            imageLayer();
            Events_Service.run().all();
        });
    });
}
/**
 * Created by marcoramires on 1/15/17.
 */
angular
    .module('app')
    .controller('PictureController', PictureController);

PictureController.$inject = ['$rootScope', '$scope', '$log', '$stateParams', '$state', '$ocLazyLoad', '$interval', 'Events_Service', 'Analytics', 'DataService'];

function PictureController($rootScope, $scope, $log, $stateParams, $state, $ocLazyLoad, $interval, Events_Service, Analytics, DataService) {
    $log.log('> Picture Controller: ', this);
    // $log.log('> Picture Name: ', $stateParams.pictureName);

    $scope.data = {
        availableOptions: [
            {id: '0', name: '12 x 8 inches - 30 x 20 cm', price: 25},
            {id: '1', name: '18 x 12 inches - 45 x 30 cm', price: 50},
            {id: '2', name: '24 x 16 inches - 60 x 40 cm', price: 75},
            {id: '3', name: '30 x 20 inches - 75 x 50 cm', price: 130},
            {id: '4', name: '36 x 24 inches - 92 x 60 cm', price: 180},
            {id: '5', name: '45 x 34 inches - 114 x 76 cm', price: 250}
        ]
    };
    $scope.payments = {
        loaded: false,
        options: '' //TODO:
    };

    //TODO: Move to payment service
    function $$payPal() {
        var _env = 'production';
        var _client = {
            sandbox: 'AX-MNu6chPspfWTp__Cb2JCpy9Sj9P2NTqC2sO_-j-Gajj_2R6ByPpT2-dMMp0FOZ2d25HJqwfdx4DhB',
            production: 'AbsV2ykBRbKcZGz-O-27Y8-jFMVQrgU8vQ7owgvB1afFMMcGYrPdMFrQVWgONmO8TnrUy4-V2n23IEj8'
        };
        var _prodDescription = 'Print only: ' + $scope.data.picture + ' ' + $scope.data.availableOptions[$scope.data.size].name;
        var _prodValue = $scope.data.availableOptions[$scope.data.size].price;
        var _total = _prodValue;

        $rootScope.paypal = paypal.Button.render({
            env: _env, // Specify 'production' for the test environment
            client: _client,
            payment: function () {
                return paypal.rest.payment.create(_env, _client, {
                    intent: "sale",
                    payer: {
                        payment_method: "paypal"
                    },
                    redirect_urls: {
                        return_url: "https://marcoramires.com/#!/page-paypal",
                        cancel_url: "https://marcoramires.com/#!/picture/yellow-fin"
                    },
                    transactions: [
                        {
                            amount: {
                                total: _total,
                                currency: 'AUD'
                            },
                            item_list: {
                                items: [
                                    {
                                        quantity: "1",
                                        name: _prodDescription,
                                        price: _prodValue,
                                        currency: "AUD",
                                        description: _prodDescription,
                                        tax: "0"
                                    }
                                ]
                            },
                            description: _prodDescription
                            // custom: "EBAY_EMS_90048630024435",
                            // invoice_number: "48787589673",
                        }
                    ]
                });
            },
            commit: true, // Optional: show a 'Pay Now' button in the checkout flow
            onAuthorize: function (data, actions) {
                // Optional: display a confirmation page here
                return actions.payment.execute().then(function () {
                    actions.redirect();
                });
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            style: {
                size: 'medium',
                color: 'blue',
                shape: 'rect'
            }
        }, '#paypal-button');

        Analytics.trackPage('/page-review-order');
        Analytics.trackEvent('Review Order', 'Picture', _prodDescription);
    }

    function $$reviewOrder () {
        $ocLazyLoad.load(
            ['https://www.paypalobjects.com/api/checkout.js'])
            .then(function() {
                $$payPal();
            }).then(function() {
            var promise = $interval(function(){
                if($rootScope.paypal.resolved){
                    $interval.cancel(promise);
                    $scope.payments.loaded = true;
                    $('.button-paypal').click(function() {
                        Analytics.trackEvent('Button', 'Click', 'PayPal');
                    });
                }
            },500);
        });
    }

    /* ----------------------------------------------
     P R E L O A D E R - TODO: Move to Service layer
     ------------------------------------------------*/
    function preloader() {
        Pace.on('done', function () {
            $(".animate-content").addClass('load-finish');
            // $log.log('* Pre-Loader Done *');
        });
    }

    /*----------------------------------------------
     N A V I G A T I O N - TODO: Move to Service layer
     ------------------------------------------------*/
    function navigation() {
        $('.left-menu .navbar').on('click', function (e) {
            $(this).toggleClass('active');
        }).on('mouseleave', function (e) {
            $(this).removeClass('active');
        });

        $('.navbar-nav li a', '#navbar').on('click', function (e) {
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('#navbar').collapse('hide');
        });
        // $log.log('* Navigation Done *');
    }

    /*----------------------------------------------
     P A G E S - H E L P E R
     ------------------------------------------------*/
    function closeLayer() {
        var $layerPage = $('.layer-page');
        $layerPage.css({
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none',
            'transform': 'none'
        });
        $layerPage.removeClass('active');
    }

    function closeNavVertical() {
        $('.left-menu .navbar').removeClass('active');
        $('#navbar').collapse('hide');
    }

    function resizeLayers() {
        var wheight = $(window).height();
        $('.layer-page.active').css({
            '-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-moz-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-ms-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            '-o-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
            'transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')'
        });
    }

    $(window).on('resize', function (e) {
        resizeLayers();
        closeNavVertical();
        // $log.log('* Window-Resize Done *');
    });

    /*----------------------------------------------
     M A N A G E  P A G E S
     ------------------------------------------------*/
    function managePages() {
        $('.open-layer').on('click', function (e) {
            closeLayer();
            var wheight = $(window).height();
            var layerToOpen = $(this).data('layer');
            $('.layer-page').removeClass('active');
            $('.' + layerToOpen).css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-moz-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-ms-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                '-o-transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')',
                'transform': 'matrix(1, 0, 0, 1, 0, -' + wheight + ')'
            }).addClass('active');
            closeNavVertical();

            if(layerToOpen === 'page-review') {
                $$reviewOrder();
            }

            return false;
        });
        $('.close-layer, .change-order').on('click', function (e) {
            $('#paypal-button').html('');
            $scope.payments.loaded = false;
            closeLayer();
        });
        // $log.log('* Manage-Page Done *');
    }

    /*----------------------------------------------
     A N G U L A R  R E A D Y
     ------------------------------------------------*/
    angular.element(document).ready(function () {
        $('body').addClass('page-blog page-picture');
        DataService.getItem('pictures', $stateParams.pictureName, "url").then(function (data) {
            $scope.details = data;
            if (data === undefined || $stateParams.pictureName.toLowerCase() !== $scope.details.url) {
                $state.go('home', {location: 'replace'})
            }
            preloader();
            navigation();
            managePages();
            Events_Service.run().all();
        });
    });
}