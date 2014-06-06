(function () {
    'use strict';

    angular.module('tvmProtoApp.main', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.main', {
                        url: '/',
                        templateUrl: 'app/main/main.tpl.html',
                        controller: 'MainCtrl',
                        data: {
                            flags: true
                        }
                    });
            }
        ])
        .controller('MainCtrl', ['$scope', 'TicketService',
            function ($scope, ticketService) {
                $scope.resetTicket = function () {
                    ticketService.resetTicket();
                };
            }
        ]);

}());