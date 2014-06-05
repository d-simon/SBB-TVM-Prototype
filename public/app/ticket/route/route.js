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
                            next: 'root.ticket.via',
                            title: 'Reiseweg – Zielort wählen'
                        }
                    });
            }
        ])
        .controller('TicketRouteCtrl', ['$scope',
            function ($scope) {

                $scope.doneSelecting = function () {
                    $('#onscreen-keyboard').trigger('onScreenKeyPressed', 'enter');
                };

                $scope.clickTicket = function (val) {
                    switch(val) {
                        case 'to':
                            $('input[name=ticket-to]').click();
                            break;
                        case 'from':
                            $('input[name=ticket-from]').click();
                            break;
                    }
                };

                if ($scope.ticket.from.selected !== true) {
                    setTimeout(function() { $scope.clickTicket('from'); }, 0);
                } else if ($scope.ticket.to.text.length <= 0)  {
                    setTimeout(function() { $scope.clickTicket('to'); }, 0);
                }
            }
        ]);

}());