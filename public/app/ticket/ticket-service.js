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
                    var localhost = '//' + window.location.host,
                        onlinehost = 'http://www.corsproxy.com/fahrplan.sbb.ch';

                    $http.get(onlinehost + '/bin/ajax-getstop.exe/dny?start=1&tpl=suggest2json&encoding=utf-8&REQ0JourneyStopsS0A=7&getstop=1&noSession=yes&REQ0JourneyStopsB=5&' + 
                                     'REQ0JourneyStopsS0G=' +
                                      suggestion +
                                     '&js=true&')
                        .success(function (result) {
                            var suggestions = JSON.parse(result.replace(';SLs.showSuggestion();','').replace('SLs.sls=',''));
                            deferred.resolve(suggestions.suggestions);
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