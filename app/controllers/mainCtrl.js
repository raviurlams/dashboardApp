(function() {
    'use strict';

    angular.module('dashboardApp').controller("mainCtrl", ['$scope', '$rootScope', 'appConfiguration', 
                '$state', '$ajaxFactory', 'localStorageService', mainCtrl]);

    function mainCtrl($scope, $rootScope, appConfiguration, $state, $ajaxFactory, localStorageService) {
        $scope.registationForm = {};
        $scope.loginFormObj = {};
        $scope.forgetPwdForm = {};
        $scope.isMatchPassword = true;
        $scope.isErorMsg = false;


        $scope.validateUser = function(e,form) {
            if (form && form.$valid) {
                $scope.isErorMsg = false;
                $scope.loginFormObj.$setPristine();
                var isUserFound = false;
                var d = $rootScope.userData;
                for (var i = 0; i < d.length; i++) {
                    if (d[i]['email'] == form.usernameStr && d[i]['password'] == form.password) {
                        localStorageService.set('email', d[i]['email']);
                        $rootScope.loginId = d[i]['email'];
                        $state.go(appConfiguration.dashboardState);
                        break;
                    }
                }
                $scope.isErorMsg = true;               
            }
        }

        $scope.createNewUser = function(form) {
            if (form && form.$valid && $scope.validateRePassword($scope.registationForm)) {
                $scope.registationForm.$setPristine();
                console.log('createNewUser Valid', $scope.registationForm);
            }
        }

        $scope.resetPassword = function(form) {
            if (form && form.$valid) {
                $scope.forgetPwdForm.$setPristine();
                console.log('resetPassword Valid', $scope.forgetPwdForm);
            }
        }

        $scope.validateRePassword = function(obj) {
            if (!isNullOrEmpty(obj.password.$viewValue) && !isNullOrEmpty(obj.repassword.$viewValue) && (obj.password.$viewValue !== obj.repassword.$viewValue)) {
                $scope.isMatchPassword = false;
            } else {
                $scope.isMatchPassword = true;
            }
            return $scope.isMatchPassword;
        };

        function isNullOrEmpty(obj) {
            return (angular.isUndefined(obj) || obj == null || obj == 'null' || typeof obj == "undefined" || obj == "");
        };
    }

})();
