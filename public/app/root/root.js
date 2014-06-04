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
                                templateUrl: 'app/root/header/header.tpl.html'
                            },
                            'footer@root': {
                                templateUrl: 'app/root/footer/footer.tpl.html',
                                controller: 'FooterCtrl'
                            }
                        }
                    });
            }
        ]);

}());