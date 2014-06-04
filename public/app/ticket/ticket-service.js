(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket')
        .factory('TicketService', [
            function () {

                var defaultState = {
                    from: {
                        text: 'Zürich HB',
                        selected: true
                    },
                    to: {
                        text: '',
                        selected: false,
                        via: {
                            direct: true,
                            text: '',
                            selected: false
                        },
                        price: 0
                    },
                    options: {
                        oneway: true,
                        klasse: 2,
                        tickets: {
                            full: 0,
                            half: 0
                        }
                    },
                    date: {
                        from: moment(),
                        validfor: 7
                    }
                };

                var state = angular.copy(defaultState),
                    service = {};

                service.
            }
        ]);

}());