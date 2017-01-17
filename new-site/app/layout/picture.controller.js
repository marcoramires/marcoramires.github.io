/**
 * Created by marcoramires on 1/15/17.
 */
angular
    .module('app')
    .controller('PictureController', PictureController);

PictureController.$inject = ['$rootScope', '$scope', '$log', '$stateParams'];

function PictureController($rootScope, $scope, $log, $stateParams) {
    $log.log('> Picture Controller: ', this);
    $log.log('> Picture Name: ', $stateParams.pictureName);

    //TODO: Service Layer - get image details
    var _pictureName = $stateParams.pictureName;
    this.pictureName = _pictureName.replace('-', ' ');

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
        $log.log('* Navigation Done *');
    }

    /*----------------------------------------------
     P A G E S - H E L P E R
     ------------------------------------------------*/
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
        $log.log('* Window-Resize Done *');
    });

    /*----------------------------------------------
     A N G U L A R  R E A D Y
     ------------------------------------------------*/
    angular.element(document).ready(function() {
        preloader();
        navigation();
    });
}