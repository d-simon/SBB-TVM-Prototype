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
        .controller('TicketViaCtrl', ['$scope', 'TicketService', '$state', '$modal',
            function ($scope, ticketService, $state, $modal) {
                $scope.ticketSrv = ticketService;

                $scope.selectVia = function (via) {
                    if (via === true) {
                        ticketService.ticket.to.via.direct = true;
                    } else {
                        ticketService.ticket.to.via.direct = false;
                        ticketService.ticket.to.via.text = via;
                    }
                };
                $scope.next = function () {
                    $state.go($state.current.data.next);
                };

                $scope.open = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/ticket/via/via-info.tpl.html',
                        controller: function($scope, $modalInstance, items) {

                            $scope.ok = function() {
                                $modalInstance.close();
                            };

                            $scope.cancel = function() {
                                $modalInstance.dismiss('cancel');
                            };
                        },
                        resolve: {
                            items: function() {
                                return $scope.items;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {
                    }, function() {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };



            }
        ]);

}());