(function () {
    'use strict';

    angular.module('tvmProtoApp.root', [])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('root', {
                        abstract:true,
                        views: {
                            '': {
                                templateUrl: 'app/root/root.tpl.html'
                            },
                            'header@root': {
                                templateUrl: 'app/root/header/header.tpl.html'
                            },
                            'footer@root': {
                                templateUrl: 'app/root/footer/footer.tpl.html',
                                controller: 'FooterCtrl'
                            }
                        }
                    });
            }
        ])
        .factory('StateDataService', ['$injector', '$rootScope', '$state', 'TicketService',
            function ($injector, $rootScope, $state, ticketService) {

                var service = {},
                    defaultState = {
                        step:  0,
                        stop:  false,
                        next:  false,
                        back:  false,
                        help:  false,
                        flags: false
                    },
                    storeState = {};

                // init
                storeState = createState($state.current.data);
                service.state = evalState(storeState);

                service.resetState = function () {
                    service.state = createState($state.current.data);
                };

                function createState (data) {
                    var createState = angular.copy(defaultState);
                    angular.extend(createState, data);
                    return createState;
                }

                function evalState (state) { //storeState
                    var returnObj = {},
                        prop;
                    for (prop in state) {
                        if (state.hasOwnProperty(prop)) {

                            // dependency annotated function
                            if (state[prop].length &&
                                       Object.prototype.toString.call(state[prop]) === '[object Array]' &&
                                       typeof state[prop][state[prop].length-1] === 'function')
                            {
                                returnObj[prop] = $injector.invoke(state[prop]);

                            // function
                            } else if (typeof state[prop] === 'function') {
                                returnObj[prop] = state[prop]();

                            // regular values
                            } else {
                                returnObj[prop] = angular.copy(state[prop]);
                            }
                        }
                    }
                    return returnObj;
                }

                // Evaluate State at the beginning of
                // and only once during the $digest cycle
                service.stateHasBeenUpdated = false;
                $rootScope.$watch(function () {
                    if (service.stateHasBeenUpdated) return;
                        service.stateHasBeenUpdated = true;

                        // console.log('--- $digest START');
                        service.state = evalState(storeState);
                        // console.log('state',service.state);
                        // console.log('ticket', ticketService.ticket);


                        $rootScope.$$postDigest(function () {
                            service.state = evalState(storeState);
                            // console.log('--- $digest END');

                            service.stateHasBeenUpdated = false;
                        });
                });

                $rootScope.$on('$stateChangeSuccess', function (fromState, toState) {
                    storeState = createState(toState.data);
                });

            return service;
        }
    ]);

}());