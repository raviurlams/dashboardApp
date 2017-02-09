App.controller('LoginCtrl', function($scope, $rootScope, $state) {
    
    $rootScope.isLogin = false;
    $rootScope.isDisplayLeftNav = false;
    $scope.doSignIn = function(form) {       
        if (form.$valid) {
            $rootScope.isLogin = true;
            $rootScope.isDisplayLeftNav = true;
            $state.go('dashboard');
        }
    }
});
