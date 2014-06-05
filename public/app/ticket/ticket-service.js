(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket')
        .factory('TicketService', ['$http', '$q',
            function ($http, $q) {

                var defaultTicket = {
                    from: {
                        text: 'ZÜRICH HB',
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
                        $http.get('http://transport.opendata.ch/v1/locations?query=' + suggestion)
                        .success(function (result) {
                            //var suggestions = JSON.parse(result);
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

                return service;
            }
        ]);

}());