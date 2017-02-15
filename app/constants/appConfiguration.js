(function() {
    'use strict';
    dashboardUIApp.constant('appConfiguration', {
        datafiles: '/data/',
        templatePath: './app/templates/',
        debugmode: false,
        signIn: '/Login',
        signInState: 'signIn',
        signUp: '/SignUp',
        signUpState: 'signUp',
        forgetPwd: '/ResetPassword',
        forgetPwdState: 'resetPwd',
        dashboard: '/dashboard',
        dashboardState: 'Dashboard',
    });
})();
