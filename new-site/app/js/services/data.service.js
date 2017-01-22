/**
 * Created by marcoramires on 1/22/17.
 */
function DataService($http, $log) {

    return {
        getCollection: getCollection
    };

    function getCollection(type) {
        return $http.get('data/app.' + type + '.json')
            .then(getCollectionComplete)
            .catch(getCollectionFailed);

        function getCollectionComplete(response) {
            return response.data;
        }

        function getCollectionFailed(error) {
            $log.error('XHR Failed for getCollection.' + error.data);
        }
    }
}

DataService.$inject = ['$http', '$log'];

angular
    .module('app')
    .factory('DataService', DataService);
