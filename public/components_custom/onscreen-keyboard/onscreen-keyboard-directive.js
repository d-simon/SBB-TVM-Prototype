(function () {
    'use strict';

    angular.module('onscreen-keyboard', [])
        .directive('keyboard', ['$rootScope', function ($rootScope) {
            return {
                scope: true,
                link: function($scope, $element, $attrs) {

                    // Create Keyboard if we don't already have one
                    if (!$('#onscreen-keyboard').length) {
                        $('main').append('<div id="onscreen-keyboard"></div>');
                    }

                    // Setup
                    var $onscreenKeyboard = $('#onscreen-keyboard');
                    jsKeyboard.init('onscreen-keyboard');
                    $onscreenKeyboard.hide();
                    $scope.isactive = false;

                    // Find Input Field
                    var $inputField = $($element).find('input').first();
                    jsKeyboard.currentElement = $inputField;
                    jsKeyboard.currentElementCursorPosition = $inputField.val().length;

                    $inputField.on('focus, click', function (e) {
                        $onscreenKeyboard.trigger('onScreenKeyPressed', 'enter');
                        jsKeyboard.currentElement = $(this);
                        jsKeyboard.currentElementCursorPosition = $(this).val().length;
                        $onscreenKeyboard.slideDown();
                        $scope.isactive = true;
                    });

                    $onscreenKeyboard.on('onScreenKeyPressed', function (event, key) {
                        setTimeout(function() {
                            $inputField.trigger('input');
                        }, 30);

                        if (key === 'enter') {
                            $scope.isactive = false;
                            $onscreenKeyboard.slideUp();
                        }
                    });
                }
            };

        }]);

}());