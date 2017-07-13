'use strict';

app.factory('getDataService', function($http, $q) {
	return {
		getData: function(method, url) {
			var deferred = $q.defer();
			$http({method: method, url: url})
				.then(function success(response) {
						deferred.resolve(response);
					},function error(reason) {
						deferred.reject(reason);
					});
			return deferred.promise;
		}
	}
});