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

    DataService.getCollection('pictures').then(function (data) {
        $scope.pictures = data;
    });

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
        preloader();
        //TODO: Move to directive
        $timeout(function () {
            mainBanner();
        }, 200);
        navigation();
        managePages();
        imageLayer();
        isotopeGrid();
        mobileFab();
        Events_Service.run().all();
    });
}