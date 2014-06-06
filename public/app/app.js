(function () {
    'use strict';

    angular.module('tvmProtoApp', [
        'ui.router',
        'ngAnimate',
        'ngTouch',

        'common',
        'angularMoment',
        'onscreen-keyboard',
        'mm.foundation',

        'tvmProtoApp.root',
        'tvmProtoApp.main',
        'tvmProtoApp.ticket'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }])
    .run(['$rootScope', '$state', 'amMoment', 'StateDataService', function ($rootScope, $state, amMoment, stateService) {

        amMoment.changeLanguage('de');

        $rootScope.$safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn(this);
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.$state = $state;
        $rootScope.stateSrv = stateService;

    }]);

}());