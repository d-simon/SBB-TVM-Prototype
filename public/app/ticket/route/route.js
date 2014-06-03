(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.route', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.route', {
                        url: '',
                        views: {
                            '@root.ticket': {
                                templateUrl: 'app/ticket/route/route.tpl.html'
                            }
                        }
                    });
            }
        ]);

}());