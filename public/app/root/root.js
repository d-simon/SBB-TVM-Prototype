(function () {
    'use strict';

    angular.module('tvmProtoApp.root', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root', {
                        abstract:true,
                        views: {
                            '': {
                                templateUrl: 'app/root/root.tpl.html'
                            },
                            'header@root': {
                                templateUrl: 'app/root/root-header.tpl.html'
                            },
                            'footer@root': {},
                        }
                    });
            }
        ]);

}());