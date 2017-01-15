/**
 * Created by marcoramires on 1/15/17.
 */


function DefaultController($scope, $log) {
    $log.log('> Default Controller: ', this);

    /*----------------------------------------------
     P R E L O A D E R
     ------------------------------------------------*/
    function prealoader() {
        Pace.on('done', function () {
            // $("#contents").fadeIn(1000);
            setTimeout(function() {
                $('.fab').fadeIn();
            }, 1000);
            setTimeout(function() {
                $('.fab').addClass('animate');
            }, 1500);
        });
    }

    angular.element(document).ready(function() {
        prealoader();
        mainBanner();
        mainBannerText();
        mainBannerScroll();
        mainBannerComingsoon();
        albumsCarousel();
        lightboxGallery();
        countdownComing();
        navigation();
        menuFull();
        videoPlayer();
        managePages();
        imageLayer();
    });
}

DefaultController.$inject = ['$scope', '$log'];

angular
    .module('app')
    .controller('DefaultController', DefaultController);