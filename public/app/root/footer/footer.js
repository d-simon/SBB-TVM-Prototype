(function () {
    'use strict';

    angular.module('tvmProtoApp.root')
        .controller('FooterCtrl' ,['$rootScope', '$scope', '$state',
            function ($rootScope, $scope, $state) {
                $scope.state = {
                    step: 0,
                    stop: false,
                    next: false,
                    back: false
                };

                $rootScope.$on('$stateChangeSuccess', function (fromState, toState) {
                    console.log(toState.data);
                    angular.extend($scope.state, toState.data);
                });

                angular.extend($scope.state, $state.current.data);
            }
        ]);

}());