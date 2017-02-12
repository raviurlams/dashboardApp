/*
 Template cache module.
*/
angular.module('templates', []);

/*
 Main application module.
*/
var App = angular.module('App', ['ui.router', 'ngResource', 'templates', 'ui.bootstrap', 'ngMessages']);

/*
 App configuration. Enable things as needed.
*/
App.config(function($logProvider, $stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, $locationProvider) {

    var enableDebug = localStorage.debug == true; // jshint ignore:line

    $logProvider.debugEnabled(enableDebug);

    $compileProvider.debugInfoEnabled(enableDebug);

    // $httpProvider.interceptors.push('HttpInterceptor');

    // $httpProvider.defaults.headers.common.Accept = 'application/json';
    $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
    $urlRouterProvider.otherwise("/landingpage");
    // Now set up the states 
    $stateProvider
        .state('landingpage', {
                url: "/login",
                templateUrl: "landingpage.html",
                controller: 'landingpageCtrl'
            })
        .state('login', {
            url: "/login",
            templateUrl: "Login.html",
            controller: 'LoginCtrl'
        })
        .state('signUp', {
            url: "/signUp",
            templateUrl: "signUp.html",
            controller: 'signUpCtrl'
        }).state('dashboard', {
            url: "/dashboard",
            templateUrl: "home.html",
            controller: 'HomeCtrl'
        })
});

App.run(function($rootScope) {
    $rootScope.isLogin = false;
    $rootScope.isDisplayLeftNav = false;
    $rootScope.showhideLeftNav = function() {
        $rootScope.isDisplayLeftNav = !$rootScope.isDisplayLeftNav
    }
});
