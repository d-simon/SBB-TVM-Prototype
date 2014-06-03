(function () {
    'use strict';

    angular.module('tvmProtoApp', [
        'ui.router',

        'common',
        'angularMoment',

        'tvmProtoApp.root',
        'tvmProtoApp.main'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }])
    .run(['amMoment', function (amMoment) {
        amMoment.changeLanguage('de');
    }]);

}());