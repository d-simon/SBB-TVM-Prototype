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
                        },
                        data: {
                            stop: true,
                            back: 'root.ticket.main',
                            next: false
                        }
                    })
            }
        ])
        .controller('TicketCtrl', ['$scope', '$state', 'TicketService', function ($scope, $state, ticketService) {

            $scope.ticket = ticketService.ticket;
            $scope.stepTitle = $state.current.data.title || false;
            $scope.step = $state.current.data.step || 0;
            // Animation
            $scope.animateBack = false;
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                if (fromState.data && typeof fromState.data.step != 'undefined' &&
                      toState.data && typeof   toState.data.step != 'undefined' &&
                    toState.data.step > fromState.data.step)
                {
                    $scope.animateBack = false;
                } else {
                    $scope.animateBack = true;
                }
                $scope.stepTitle = toState.data.title || false;
                $scope.step = $state.current.data.step || $scope.step;
            });
        }]);

}());