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
                $background = $('page-picture .animate-content');

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