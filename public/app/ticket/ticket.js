(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket', [
            'tvmProtoApp.ticket.route',
            'tvmProtoApp.ticket.via',
            'tvmProtoApp.ticket.options',
            'tvmProtoApp.ticket.date',
            'tvmProtoApp.ticket.pay'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket', {
                        url: '/ticket',
                        abstract: true,
                        views: {
                            '': {
                                templateUrl: 'app/ticket/ticket.tpl.html',
                                controller: 'TicketCtrl'
                            },
                            'sidebar@root.ticket': {
                                templateUrl: 'app/ticket/ticket-sidebar.tpl.html'
                            }
                        }
                    })
            }
        ])
        .controller('TicketCtrl', ['$scope', 'TicketService', function ($scope, ticketService) {

            $scope.ticket = ticketService.ticket;

            // Animation
            $scope.animateBack = false;
            $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                if (fromState.data && typeof fromState.data.step != 'undefined' &&
                      toState.data && typeof   toState.data.step != 'undefined' &&
                    toState.data.step > fromState.data.step)
                {
                    $scope.animateBack = false;
                } else {
                    $scope.animateBack = true;
                }
            });
        }]);

}());