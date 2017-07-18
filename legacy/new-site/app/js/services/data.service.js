/**
 * Created by marcoramires on 1/22/17.
 */
function DataService($http, $log) {

    return {
        getCollection: getCollection,
        getItem: getItem
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

    function getItem(type, query, queryBy) {
        return $http.get('data/app.' + type + '.json')
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
