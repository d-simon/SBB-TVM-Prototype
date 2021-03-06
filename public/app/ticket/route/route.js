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
                                templateUrl: 'app/ticket/route/route.tpl.html',
                                controller: 'TicketRouteCtrl'
                            }
                        },
                        data: {
                            step: 0,
                            stop: true,
                            back: 'root.main',
                            next: ['TicketService', function (ticketService) {
                                var ticket = ticketService.ticket;

                                if (ticket.to.text.length && ticket.from.text.length) {
                                    return 'root.ticket.via';
                                } else {
                                    return false;
                                }
                            }],
                            title: 'Reiseweg – Zielort wählen'
                        }
                    });
            }
        ])
        .controller('TicketRouteCtrl', ['$scope', 'TicketService',
            function ($scope, ticketService) {
                $scope.ticketSrv = ticketService;
                $scope.ticket = ticketService.ticket;
                // $scope.ticket
                $scope.$watch(
                    function () {
                        return ticketService.ticket;
                    },
                    function () {
                        console.log('to scope')
                        $scope.ticket = ticketService.ticket;
                    }
                );
                $scope.$watch('ticket', function (ticket) {
                        console.log('from scope')
                    ticketService.ticket = ticket;
                });


                $scope.doneSelecting = function () {
                    $('#onscreen-keyboard').trigger('onScreenKeyPressed', 'enter');
                };

                $scope.clickTicket = function (val) {
                    switch(val) {
                        case 'to':
                            $('input[name=ticket-to]').val("").click();
                            break;
                        case 'from':
                            $('input[name=ticket-from]').val("").click();
                            break;
                    }
                };

                if (ticketService.ticket.from.selected !== true) {
                    setTimeout(function() { $scope.clickTicket('from'); }, 0);
                } else if (ticketService.ticket.to.text.length <= 0)  {
                    setTimeout(function() { $scope.clickTicket('to'); }, 0);
                }
            }
        ]);

}());