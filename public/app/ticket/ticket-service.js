(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket')
        .factory('TicketService', ['$http',
            function ($http) {

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
                    return $http.get('http://www.corsproxy.com/fahrplan.sbb.ch/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&encoding=utf-8&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=10&' + 
                                     'REQ0JourneyStopsS0G=' +
                                      suggestion +
                                     '&js=true&');
                };
                service.resetTicket = function () {
                    service.ticket = angular.copy(defaultTicket);
                };

                return service;
            }
        ]);

}());