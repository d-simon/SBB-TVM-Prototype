(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.via', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket.via', {
                        url: '/via',
                        views: {
                            'content@root.ticket': {
                                templateUrl: 'app/ticket/via/via.tpl.html',
                                controller: 'TicketViaCtrl'
                            }
                        },
                        data: {
                            step: 1,
                            back: 'root.ticket.route',
                            next: 'root.ticket.options',
                            title: 'Reiseweg – Via wählen'
                        }
                    });
            }
        ])
        .controller('TicketViaCtrl', ['$scope', '$state',
            function ($scope, $state) {
                $scope.selectVia = function (via) {
                    if (via === true) {
                        $scope.ticket.to.via.direct = true;
                    } else {
                        $scope.ticket.to.via.direct = false;
                        $scope.ticket.to.via.text = via;
                    }
                };
                $scope.next = function () {
                    $state.go($state.current.data.next);
                };
            }
        ]);

}());