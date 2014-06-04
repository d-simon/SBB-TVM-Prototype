(function () {
    'use strict';

    angular.module('tvmProtoApp.root')
        .controller('FooterCtrl' ,['$rootScope', '$scope', '$state',
            function ($rootScope, $scope, $state) {
                $scope.defaultState = {
                    step: 0,
                    stop: false,
                    next: false,
                    back: false
                };
                $scope.state = {};
                $scope.state = angular.copy($scope.defaultState);
                angular.extend($scope.state, $state.current.data);

                $rootScope.$on('$stateChangeSuccess', function (fromState, toState) {
                    $scope.state = angular.copy($scope.defaultState);
                    angular.extend($scope.state, toState.data);
                });

            }
        ]);

}());