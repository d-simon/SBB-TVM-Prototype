(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket', [
            'tvmProtoApp.ticket.route',
            'tvmProtoApp.ticket.via'
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
        .controller('TicketCtrl', ['$scope', function ($scope) {
            console.log($scope);
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                if (   fromState.data && fromState.data.step &&
                         toState.data && toState.data.step   &&
                    toState.data.step > fromState.data.step) {
                    $scope.animateLeft = true;
                } else {
                    $scope.animateLeft = false;
                }
            });
        }]);

}());