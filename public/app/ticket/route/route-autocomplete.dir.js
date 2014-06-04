(function () {
    'use strict';

    angular.module('tvmProtoApp.ticket.route')
        .directive('sbbAutocomplete', ['TicketService', '$parse', function (ticketService, $parse) {
            return {
                scope: true,
                link: function ($scope, $element, $attrs) {
                    $scope.term = "";
                    $scope.suggestions = [];
                    var model = $parse($attrs.sbbAutocomplete);  // Get the model

                    $scope.getSuggestions = function (term) {
                        ticketService.getJourneyStop(term).then(function (result) {
                            console.log(result);
                            if (result.length && result[0].value.toLowerCase() != $scope.term.toLowerCase()) {
                                $scope.suggestions = result;
                            } else {
                                $scope.suggestions = [];
                            }
                        });
                    };

                    $scope.select = function (term) {
                        model.assign($scope, term);  // Assign a value to it
                        $scope.$safeApply(function (self) {
                            console.log('self',self);
                            if (self[$attrs.sbbAutocompleteCallback] && typeof self[$attrs.sbbAutocompleteCallback] == 'function') {
                                self[$attrs.sbbAutocompleteCallback](term);
                            }
                        });
                    };

                    $scope.$watch($attrs.sbbAutocomplete, function (value) {
                        console.log('new value', value);
                        $scope.term = value;
                        $scope.getSuggestions((value || ""));
                    });
                }
            };
        }]);

}());