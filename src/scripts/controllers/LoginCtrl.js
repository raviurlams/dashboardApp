App.controller('LoginCtrl', function($scope, $rootScope, $location) {
    $rootScope.isLogin = false;
    $rootScope.isDisplayLeftNav = false;
    $location.url('/login');
    $scope.doSignIn = function(form) {
        console.log(form)
        if (form.$valid) {
            $rootScope.isLogin = true;
            $rootScope.isDisplayLeftNav = true;
            $location.url('/dashboard');
        }
    }
});
