(function () {
    'use strict';

    angular.module('tvmProtoApp', [
        'ui.router',

        'common',
        'angularMoment',

        'tvmProtoApp.root',
        'tvmProtoApp.main'
    ])
    .run(['$state', '$stateParams', 'amMoment', function ($state, $stateParams, amMoment) {
        amMoment.changeLanguage('de');
    }]);

}());