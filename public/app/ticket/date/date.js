(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.date', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.date', {
                        url: '/date',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/date/date.tpl.html'
                            }
                        },
                        data: {
                            step: 3,
                            back: 'root.ticket.options',
                            next: 'root.ticket.pay',
                            title: 'Datum bestätigen'
                        }
                    });
            }
        ]);

}());