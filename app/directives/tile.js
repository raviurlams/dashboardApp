(function() {
    'use strict';
    angular.module('dashboardApp').directive('tile', ['appConfiguration', sappTile]);

    function sappTile(appConfiguration) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            template: require('./../templates/sappTile.html'),
            controller: function($scope, $element, $attrs) {
                console.log('calling directive constroller');
            },
            link: function(scope, element, attrs, ctrl) {
                console.log('calling directive link function');
            }
        }
    }
})();
