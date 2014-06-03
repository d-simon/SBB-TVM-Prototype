(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket', [
            'tvmProtoApp.ticket.route'
        ])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root.ticket', {
                        url: 'ticket',
                        abstract: true,
                        templateUrl: 'app/ticket/ticket.tpl.html'
                    })
            }
        ]);

}());