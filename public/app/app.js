(function () {
    'use strict';

    angular.module('tvmProtoApp', [
        'ui.router',
        'ngAnimate',

        'common',
        'angularMoment',

        'tvmProtoApp.root',
        'tvmProtoApp.main',
        'tvmProtoApp.ticket'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }])
    .run([ 'amMoment', function (amMoment) {
        amMoment.changeLanguage('de');
    }]);

}());