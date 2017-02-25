 import './vendors';
 require('./assets/styles/main.css');
 require('./constants');
 require('./controllers');
 require('./factories');
 require('./templates');

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
                 controller: 'mainCtrl',
                 templateUrl: require(appConfiguration.templatePath + 'login.html'),

             })
             .state(appConfiguration.signUpState, {
                 url: appConfiguration.signUp,
                 controller: 'mainCtrl',
                 templateUrl: require(appConfiguration.templatePath + 'signup.html'),

             })
             .state(appConfiguration.forgetPwdState, {
                 url: appConfiguration.forgetPwd,
                 controller: 'mainCtrl',
                 templateUrl: require(appConfiguration.templatePath + 'forgetPassword.html')
             })
             .state(appConfiguration.dashboardState, {
                 url: appConfiguration.dashboard,
                 controller: 'mainCtrl',
                 templateUrl: require(appConfiguration.templatePath + 'dashboard.html')
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
