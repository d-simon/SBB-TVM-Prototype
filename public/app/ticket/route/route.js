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
                console.log($scope.ticket.to.selected)
                if ($scope.ticket.from.selected !== true) {
                    setTimeout(function() { $('input[name=from]').click(); }, 0);
                } else if ($scope.ticket.to.text.length <= 0)  {
                    setTimeout(function() { $('input[name=to]').click(); }, 0);
                }
            }
        ]);

}());