(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.route')
        .directive('sbbAutocomplete', ['TicketService', function (ticketService) {
            return {
                scope: true,
                link: function ($scope, $element, $attrs) {
                    $scope.term = "";
                    $scope.suggestsions = [];

                    $scope.getSuggestions = function (term) {
                        ticketService.getJourneyStop(term).then(function (result) {
                            $scope.suggestions = result;
                            console.log(result);
                        });
                    }

                    $scope.$watch($attrs.sbbAutocomplete, function (value) {
                        console.log('new value', value);
                        $scope.term = value;
                        $scope.getSuggestions((value || ""));
                    });
                }
            };
        }]);

}());