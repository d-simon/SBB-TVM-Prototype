(function () {
    'use strict';

    angular.module('common.clock', [])
        .directive('clock', ['$timeout', function ($timeout) {
            return function(scope, element, attrs) {
                var defaultDate = 'dddd DD MMM YYYY / HH:MM:ss',
                    format = defaultDate;

                scope.$watch(attrs.clock, function (value) {
                    format = value || defaultDate;
                    updateTime();
                });

                function updateTime(){
                    var dt = moment().format(format);
                    element.text(dt);
                }

                function updateLater() {
                    $timeout(function() {
                      updateTime(); // update DOM
                      updateLater(); // schedule another update
                    }, 1000);
                }

                updateLater();
            }
        }]);

}())