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
                    falgs: false
                };

                $scope.state = {};
                createState($state.current.data);

                function createState (data) {
                    $scope.state = angular.copy($scope.defaultState);
                    angular.extend($scope.state, data);
                };

                $rootScope.$on('$stateChangeSuccess', function (fromState, toState) {
                    createState(toState.data);
                });

            }
        ]);

}());