'use strict';

var app = angular.module("tryHttp", ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/main',
    {
        templateUrl: './templates/main.html',
        controller: 'mainController'

    });
})