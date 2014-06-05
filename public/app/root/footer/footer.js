(function () {
    'use strict';

    angular.module('tvmProtoApp.root')
        .controller('FooterCtrl' ,['$scope', 'StateDataService',
            function ($scope, stateSrv) {
                $scope.state = stateSrv.state;
                console.log($scope.state);
            }
        ]);

}());