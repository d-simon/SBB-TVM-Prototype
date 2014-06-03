(function () {
    'use strict';

    angular.module('tvmProtoApp.root', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root', {
                        abstract:true,
                        templateUrl: 'app/root/root.tpl.html'
                    });
            }
        ]);

}());