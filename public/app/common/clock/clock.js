(function () {
    'use strict';

    angular.module('common.clock', [])
        .directive('clock', ['$timeout', 'dateFilter', function ($timeout, dateFilter) {
            return function(scope, element, attrs) {
                var format = 'M/d/yy h:mm:ss a';

                scope.$watch(attrs.clock, function (value) {
                    console.log('watch activated');
                    format = value;
                    updateTime();
                });

                function updateTime(){
                    var dt = dateFilter(new Date(), format);
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