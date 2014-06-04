(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.options', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.options', {
                        url: '/options',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/options/options.tpl.html'
                            }
                        },
                        data: {
                            step: 2,
                            back: 'root.ticket.via',
                            next: 'root.ticket.date'
                        }
                    });
            }
        ]);

}());