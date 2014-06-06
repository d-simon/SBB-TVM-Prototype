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
                                templateUrl: 'app/ticket/pay/pay.tpl.html',
                                controller: 'TicketPayCtrl'
                            }
                        },
                        data: {
                            step: 4,
                            stop: true,
                            back: 'root.ticket.date',
                            next: false,
                            titel: 'Bezahlen'
                        }
                    });
            }
        ])
        .controller('TicketPayCtrl', ['$scope', 'TicketService',
            function ($scope, ticketService) {
                $scope.ticketSrv = ticketService;
            }
        ]);

}());