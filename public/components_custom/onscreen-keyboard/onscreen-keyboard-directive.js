(function () {
    'use strict';

    angular.module('onscreen-keyboard', [])
        .directive('keyboard', [function () {
                return function($scope, $element, $attrs) {

                    // Create Keyboard if we don't already have one
                    if (!$('#onscreen-keyboard').length) {
                        $('main').append('<div id="onscreen-keyboard"></div>');
                    }

                    // Setup
                    var $onscreenKeyboard = $('#onscreen-keyboard');

                    jsKeyboard.init('onscreen-keyboard');
                    $onscreenKeyboard.fadeIn();

                    var $inputField = $($element);
                    jsKeyboard.currentElement = $inputField;
                    jsKeyboard.currentElementCursorPosition = $inputField.val().length;

                    $inputField.on('focus, click', function (e) {
                        jsKeyboard.currentElement = $(this);
                        jsKeyboard.currentElementCursorPosition = $(this).val().length;
                        jsKeyboard.show();
                        $onscreenKeyboard.fadeIn();
                    });
                }
        }]);

}());