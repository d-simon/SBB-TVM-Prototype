(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket')
        .factory('TicketService', ['$http', '$q',
            function ($http, $q) {

                var defaultTicket = {
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
                        }
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
                        from: moment().format('L'),
                        until: moment().add('days', 7).format('L')
                    },
                    price: {
                        chf: 36,
                        eur: 30
                    }
                };

                var service = {};

                service.ticket = angular.copy(defaultTicket);

                service.getJourneyStop = function (suggestion) {
                    var deferred = $q.defer();

                    $http.get('http://transport.opendata.ch/v1/locations?query=' + suggestion + '&type=station')
                        .success(function (result) {
                            deferred.resolve(result.stations);
                        })
                        .error(function (data, status) {
                            deferred.reject(data);
                        });

                    return deferred.promise;
                };
                service.resetTicket = function () {
                    service.ticket = angular.copy(defaultTicket);
                };
                service.finalPrice = function () {
                    var price = service.ticket.options.tickets.full * service.ticket.price +
                                service.ticket.options.tickets.half * service.ticket.price * 0.5;
                    return price;
                };

                return service;

            }
        ]);

}());