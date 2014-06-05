(function () {
    'use strict';

    angular.module('tvmProtoApp.root')
        .controller('FooterCtrl' ,['$scope', 'StateDataService',
            function ($scope, stateSrv) {
                $scope.stateSrv = stateSrv;
            }
        ]);

}());