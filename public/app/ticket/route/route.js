(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.route', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.route', {
                        url: '/route',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/route/route.tpl.html'
                            }
                        },
                        data: {
                            step: 0,
                            stop: true,
                            back: 'root.main',
                            next: 'root.ticket.via',
                            title: 'Reiseweg – Zielort wählen'
                        }
                    });
            }
        ]);

}());