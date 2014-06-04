
$(function () {
	jsKeyboard.init("virtualKeyboard");

	//first input focus
	var $firstInput = $('input[name=destination]').focus();
	jsKeyboard.currentElement = $firstInput;
	jsKeyboard.currentElementCursorPosition = 0;
});

$('input[name=destination]').change( function () {
	console.log("change");
    console.log( $(this).val() );
});

