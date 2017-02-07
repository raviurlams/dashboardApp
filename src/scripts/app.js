/*
 Template cache module.
*/
angular.module('templates', []);

/*
 Main application module.
*/
var App = angular.module('App', ['ngRoute', 'ngResource', 'templates','ui.bootstrap']);

/*
 App configuration. Enable things as needed.
*/
App.config(function($logProvider, $routeProvider, $httpProvider, $compileProvider, $locationProvider) {

    var enableDebug = localStorage.debug == true; // jshint ignore:line

    $logProvider.debugEnabled(enableDebug);

    $compileProvider.debugInfoEnabled(enableDebug);

    // $httpProvider.interceptors.push('HttpInterceptor');

    // $httpProvider.defaults.headers.common.Accept = 'application/json';
    //$locationProvider.html5Mode(true).hashPrefix('#');
    $routeProvider        
        .when('/dashboard', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        }).when('/login', {
            templateUrl: 'Login.html',
            controller: 'LoginCtrl'
        }).when('/signUp', {
            templateUrl: 'signUp.html',
            controller: 'signUpCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });

});

App.run(function($rootScope) {
    $rootScope.isLogin = false;
    $rootScope.isDisplayLeftNav = false;
    $rootScope.showhideLeftNav = function() {
        $rootScope.isDisplayLeftNav = !$rootScope.isDisplayLeftNav
    }
});
