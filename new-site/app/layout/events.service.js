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

        this.all = function () {
            _linkControl();
            _gaExternalLinks();
            _gaSelect();
            _gaButton();
            _gaFilters();
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