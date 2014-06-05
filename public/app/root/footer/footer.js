(function () {
    'use strict';

    angular.module('tvmProtoApp.root')
        .controller('FooterCtrl' ,['$rootScope', '$scope', '$state',
            function ($rootScope, $scope, $state) {
                $scope.defaultState = {
                    step:  0,
                    stop:  false,
                    next:  false,
                    back:  false,
                    help:  false,
                    flags: false
                };

                $scope.storeState = {};
                createState($state.current.data);

                function createState (data) {
                    $scope.storeState = angular.copy($scope.defaultState);
                    angular.extend($scope.storeState, data);
                };

                function evalState () {
                    var returnObj = {},
                        prop;
                    for (prop in $scope.storeState) {
                        if ($scope.storeState.hasOwnProperty(prop)) {
                            if (typeof $scope.storeState[prop] === 'function') {
                                returnObj[prop] = $scope.storeState[prop]();
                                console.log( $scope.storeState[prop]());
                            } else {
                                returnObj[prop] = angular.copy($scope.storeState[prop]);
                            }
                        }
                    }
                    return returnObj;
                };

                // Evaluate State at the beginning of
                // and only once during the $digest cycle
                var stateHasBeenUpdated = false;
                $scope.$watch(function () {
                    if (stateHasBeenUpdated) return;

                        console.log('--- $digest START');
                        stateHasBeenUpdated = true;

                        $scope.state = evalState();

                        $scope.$$postDigest(function () {
                            stateHasBeenUpdated = false;
                            console.log('--- $digest END');
                        });
                });

                $rootScope.$on('$stateChangeSuccess', function (fromState, toState) {
                    createState(toState.data);
                });

            }
        ]);

}());