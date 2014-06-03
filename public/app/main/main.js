(function () {
    'use strict';

    angular.module('tvmProtoApp.main', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.main', {
                        url: '/',
                        templateUrl: 'app/main/main.tpl.html',
                        controller: function ($state,$stateParams) {
                            console.log($state,$stateParams,$state.get());
                        }
                    });
            }
        ]);

}());