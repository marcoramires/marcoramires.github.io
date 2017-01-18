/**
 * Created by marcoramires on 1/15/17.
 */
angular
    .module('app')
    .controller('PictureController', PictureController);

PictureController.$inject = ['$rootScope', '$scope', '$log', '$stateParams', '$state'];

function PictureController($rootScope, $scope, $log, $stateParams, $state) {
    $log.log('> Picture Controller: ', this);
    $log.log('> Picture Name: ', $stateParams.pictureName);

    this.details = {
        name:  "yellow fin",
        location: "Byron Bay",
        dateTaken: "15/06/2016",
        camera: '1/1000 F1.4 ISO100',
        ref: 'IMG_22021'
    };

    $scope.data = {
        availableOptions: [
            {id: '0', name: '12 x 8 inches - 30 x 20 cm', price: 25},
            {id: '1', name: '18 x 12 inches - 45 x 30 cm', price: 50},
            {id: '2', name: '24 x 16 inches - 60 x 40 cm', price: 75},
            {id: '3', name: '30 x 20 inches - 75 x 50 cm', price: 100},
            {id: '4', name: '6 x 24 inches - 92 x 60 cm', price: 150},
            {id: '5', name: '45 x 34 inches - 114 x 76 cm', price: 200}
        ]
    };



    var _pictureName = $stateParams.pictureName;
    if(_pictureName.replace('-', ' ').toLowerCase() !== this.details.name) {
        $state.go('home',  {location: 'replace'})
    }

    /* ----------------------------------------------
     P R E L O A D E R - TODO: Move to Service layer
     ------------------------------------------------*/
    function preloader() {
        Pace.on('done', function () {
            $(".animate-content").addClass('load-finish');
            if($rootScope.paypal === undefined) {
                $rootScope.paypal = paypal.Button.render({
                    env: 'sandbox', // Specify 'sandbox' for the test environment
                    client: {
                        sandbox:    'AX-MNu6chPspfWTp__Cb2JCpy9Sj9P2NTqC2sO_-j-Gajj_2R6ByPpT2-dMMp0FOZ2d25HJqwfdx4DhB',
                        production: 'xxxxxxxxx'
                    },
                    payment: function() {
                        var env = this.props.env;
                        var client = this.props.client;
                        return paypal.rest.payment.create(env, client, {
                            intent: "sale",
                            payer: {
                                payment_method: "paypal"
                            },
                            transactions: [
                                {
                                    amount: {
                                        total: "1.00",
                                        currency: "AUD"
                                    },
                                    item_list: {
                                        items: [
                                            {
                                                quantity: "1",
                                                name: "Yellow Fin",
                                                price: "1",
                                                currency: "AUD",
                                                description: "",
                                                tax: "0"
                                            }]
                                    },
                                    description: "Yellow Fin: Print Only 12x18 (30x45cm) Unframed Print",
                                    invoice_number: "1234567890",
                                    custom: "Custom message"
                                }
                            ]
                        });
                    },
                    commit: true, // Optional: show a 'Pay Now' button in the checkout flow
                    onAuthorize: function(data, actions) {
                        // Optional: display a confirmation page here
                        return actions.payment.execute().then(function() {
                            // Show a success page to the buyer
                        });
                    },
                    onCancel: function(data, actions) {
                        return actions.redirect();
                    },
                    style: {
                        size: 'medium',
                        color: 'blue',
                        shape: 'rect'
                    }
                }, '#paypal-button');
            }
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
        $('body').addClass('page-blog page-picture');
        preloader();
        navigation();
    });
}