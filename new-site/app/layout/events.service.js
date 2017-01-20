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

        this.all = function () {
            _linkControl();
            _gaExternalLinks();
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