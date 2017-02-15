import './vendors';
require('./assets/styles/main.css');

var dashboardUIApp = angular.module('dashboardApp', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'LocalStorageModule', 'ngMessages']);

(function() {
    'use strict';

    dashboardUIApp.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider', 'appConfiguration', myConfigFn]);

    function myConfigFn($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, appConfiguration) {
        // Remving ng-scope class in All HTML page  - it Increase the Page speed
        $compileProvider.debugInfoEnabled(appConfiguration.debugmode);
        $httpProvider.useApplyAsync(true);
        $httpProvider.interceptors.push('authInterceptorService');

        $stateProvider
            .state(appConfiguration.signInState, {
                url: appConfiguration.signIn,
                templateUrl: appConfiguration.templatePath + 'login.html',
                controller: 'mainCtrl'
            })
            .state(appConfiguration.signUpState, {
                url: appConfiguration.signUp,
                templateUrl: appConfiguration.templatePath + 'signup.html',
                controller: 'mainCtrl'
            })
            .state(appConfiguration.forgetPwdState, {
                url: appConfiguration.forgetPwd,
                templateUrl: appConfiguration.templatePath + 'forgetPassword.html',
                controller: 'mainCtrl'
            })
            .state(appConfiguration.dashboardState, {
                url: appConfiguration.dashboard,
                templateUrl: appConfiguration.templatePath + 'dashboard.html'
            });
        $urlRouterProvider.when('', appConfiguration.signIn);
        $urlRouterProvider.otherwise(appConfiguration.signIn);
    }


    dashboardUIApp.run(['$rootScope', myRunFn]);

    function myRunFn($rootScope) {
        $rootScope.showProcessing = false;
        $rootScope.loginId = '';
    }

})();
