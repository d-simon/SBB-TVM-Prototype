(function () {
    'use strict';

    angular.module('tvmProtoApp.root', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root', {
                        url: '',
                        templateUrl: 'app/root/root.html'
                    });
            }
        ]);

}());