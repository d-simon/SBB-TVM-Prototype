(function () {
    'use strict';

    angular.module('tvmProtoApp', [
        'ui.router',

        'common',
        'angularMoment',

        'tvmProtoApp.root',
        'tvmProtoApp.main'
    ])
    .run(['amMoment', function (amMoment) {
        amMoment.changeLanguage('de');
    }]);

}());