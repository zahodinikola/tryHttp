'use strict';

app.controller("mainController", function($scope, getDataService, $compile) {
                
    $scope.data = ["raw"];
	$scope.method = [];
	$scope.url = [];
	$scope.index = 0;
								
	$scope.getData = function (index) {

		var promisObj = getDataService.getData(($scope.method[index]), ($scope.url[index]));
		promisObj.then(function(response) {
			$scope.data[index] = response.data;
			})
	};
				
	function indexCounter() {
				
		var counter = 0;
					
		return function(option) {
			//return counter += option;
            return (counter + option == 0)?counter:counter += option;
			};
		};
				
	var indexChange = indexCounter();
			
	$scope.appendField = function() {
					
		$scope.index = indexChange(1);
							
		var newEntry = $compile(angular.element(
			'<div id="entry' + $scope.index + '">\
				<select ng-model="method[' + $scope.index + ']">\
					<option value="GET">Get</option>\
					<option value="POST">Post</option>\
				</select>\
				<input type="text" ng-model="url[' + $scope.index + ']" ng-pattern="/^[a-z0-9.-]+$/"></input>\
				<input class="btn" type="button" ng-click="getData(' + $scope.index + ')" value="Get Data"></input>\
				<input class="btn" type="button" ng-click="appendField()" value="+"></input>\
                         <input class="btn" type="button" ng-click="deleteField()" value="-"></input>\
				{{data[' + $scope.index + ']}}\
				<br />\
			</div>'))($scope);
			
		var urlFieldSet = angular.element(document.getElementById('urlFieldSet'));
		urlFieldSet.append(newEntry);
				
	};

	$scope.deleteField = function() {

		var target = angular.element(document.querySelector("#entry" + $scope.index));
		target.remove();

		delete $scope.method[$scope.index];
		delete $scope.url[$scope.index];
					
		$scope.index = indexChange(-1);
					
	};						
});