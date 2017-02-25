(function() {
    'use strict';
    dashboardUIApp.directive('tile', ['appConfiguration', sappTile]);

    function sappTile(appConfiguration) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: appConfiguration.templatePath + 'sappTile.html',
            controller: function($scope, $element, $attrs) {

            },
            link: function(scope, element, attrs, ctrl) {

            }
        }
    }
})();
