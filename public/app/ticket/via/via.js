(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.via', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.via', {
                        url: '/via',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/via/via.tpl.html'
                            }
                        },
                        data: {
                            step: 1,
                            back: 'root.ticket.route',
                            next: 'root.ticket.options'
                        }
                    });
            }
        ]);

}());