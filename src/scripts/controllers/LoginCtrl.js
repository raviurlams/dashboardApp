App.controller('LoginCtrl', function($scope, $rootScope, $location) {    
    $scope.doSignIn = function(form) {
        $rootScope.isLogin = false;
        $rootScope.isDisplayLeftNav = false;
        console.log(form)
        if (form.$valid) {
            $rootScope.isLogin = true;
            $rootScope.isDisplayLeftNav = true;
            $location.url('/dashboard');
        }
    }
});
