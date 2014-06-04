(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.pay', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.pay', {
                        url: '/pay',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/pay/pay.tpl.html'
                            }
                        },
                        data: {
                            step: 4,
                            back: 'root.ticket.date',
                            next: false
                        }
                    });
            }
        ]);

}());