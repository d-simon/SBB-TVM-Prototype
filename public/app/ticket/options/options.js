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
                                templateUrl: 'app/ticket/options/options.tpl.html',
                                controller: 'TicketOptionsCtrl'
                            }
                        },
                        data: {
                            step: 2,
                            back: 'root.ticket.via',
                            next: ['TicketService', function (ticketService) {
                                var ticket = ticketService.ticket;

                                if (ticket.options.tickets.full + ticket.options.tickets.half > 0) {
                                    return 'root.ticket.date';
                                } else {
                                    return false;
                                }
                            }],
                            title: 'Anzahl Tickets / Extras'
                        }
                    });
            }
        ])
        .controller('TicketOptionsCtrl', ['$scope', function ($scope) {
            console.log($scope.ticket);
            $scope.addTicket = function (type) {
                switch (type) {
                    case 'full':
                        $scope.ticket.options.tickets.full = Math.min($scope.ticket.options.tickets.full+1, 6);
                        break;
                    case 'half':
                        $scope.ticket.options.tickets.half = Math.min($scope.ticket.options.tickets.half+1, 6);
                        break;
                }
            };
            $scope.removeTicket = function (type) {
                switch (type) {
                    case 'full':
                        $scope.ticket.options.tickets.full = Math.max($scope.ticket.options.tickets.full-1, 0);
                        break;
                    case 'half':
                        $scope.ticket.options.tickets.half = Math.max($scope.ticket.options.tickets.half-1, 0);
                        break;
                }
            };
        }]);

}());