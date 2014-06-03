var jsKeyboard = {
    settings: {
        buttonClass: "button", // default button class
        onclick: "jsKeyboard.write();", // default onclick event for button
        keyClass: "key", // default key class used to define style of text of the button
        text: {
            close: "close"
        }
    },
    "keyboard": [], // different keyboards can be set to this variable in order to switch between keyboards easily.
    init: function (elem, keyboard) {
        jsKeyboard.keyboard["default"] = jsKeyboard.defaultKeyboard;
        jsKeyboard.keyboardLayout = elem;

        if (keyboard != null && keyboard != undefined)
            jsKeyboard.generateKeyboard(keyboard);
        else
            jsKeyboard.generateKeyboard("default");

        jsKeyboard.addKeyDownEvent();

        jsKeyboard.show();
        $(':input').not('[type="reset"]').not('[type="submit"]').on('focus, click', function (e) {
            jsKeyboard.currentElement = $(this);
            jsKeyboard.currentElementCursorPosition = $(this).getCursorPosition();
            console.log('keyboard is now focused on ' + jsKeyboard.currentElement.attr('name') + ' at pos(' + jsKeyboard.currentElementCursorPosition + ')');
        });
    },
    focus: function (t) {
        jsKeyboard.currentElement = $(t);
        jsKeyboard.show();
    },
    keyboardLayout: "", // it shows the html element where keyboard is generated
    currentKeyboard: "default", // it shows the which keyboard is used. If it's not set default keyboard is used.
    currentElement: null,
    generateKeyboard: function (keyboard) {
        var bClass = "";
        var kClass = "";
        var onclick = "";
        var text = "";

        var s = "";
        s += "<div id=\"keyboard\">";
        s += "<div id=\"keyboardHeader\">";
        // s += "<div onclick=\"jsKeyboard.hide();\"><span>" + jsKeyboard.settings.text.close + "</span><span class=\"closex\"> X</span></div>"
        s += "</div>";

        /*capital letter*/
        s += "<table id=\"keyboardCapitalLetter\">";
        $.each(jsKeyboard.keyboard[keyboard].capitalLetter, function () {
            s += "<tr class=\"jsKeyboardRow\">";
            $(this).each(function (i, key) { generate(key); });
            s += "</tr>";
        });
        s += "</table>";

        function generate(key) {
            bClass = key.buttonClass == undefined ? jsKeyboard.settings.buttonClass : key.buttonClass;
            kClass = key.keyClass == undefined ? jsKeyboard.settings.keyClass : key.keyClass;
            onclick = key.onclick == undefined ? jsKeyboard.settings.onclick.replace("()", "(" + key.value + ")") : key.onclick;

            text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

            s += "<td class=\"" + bClass + " " + "button-key-"+text + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></td>";

            bClass = ""; kClass = ""; onclick = ""; text = "";
        }

        $("#" + jsKeyboard.keyboardLayout).html(s);
    },
    addKeyDownEvent: function () {
        $("#keyboardCapitalLetter > div.button, #keyboardSmallLetter > div.button, #keyboardNumber > div.button, #keyboardSymbols > div.button").
            bind('mousedown', (function () { $(this).addClass("buttonDown"); })).
            bind('mouseup', (function () { $(this).removeClass("buttonDown"); })).
            bind('mouseout', (function () { $(this).removeClass("buttonDown"); }));

        //key focus down on actual keyboard key presses
        //todo:....

    },
    updateCursor: function () {
        //input cursor focus and position during typing
        jsKeyboard.currentElement.setCursorPosition(jsKeyboard.currentElementCursorPosition);
    },
    write: function (m) {
        var a = jsKeyboard.currentElement.val(),
            b = String.fromCharCode(m),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
        jsKeyboard.updateCursor();
    },
    del: function () {
        var a = jsKeyboard.currentElement.val(),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos - 1), a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition--; //-1 cursor
        if (jsKeyboard.currentElementCursorPosition < 0)
        	jsKeyboard.currentElementCursorPosition = 0;
        jsKeyboard.updateCursor();
    },
    enter: function () {
        var t = jsKeyboard.currentElement.val();
        jsKeyboard.currentElement.val(t + "\n");
    },
    space: function () {
        var a = jsKeyboard.currentElement.val(),
            b = " ",
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
        jsKeyboard.updateCursor();
    },
    writeSpecial: function (m) {
        var a = jsKeyboard.currentElement.val(),
            b = m,
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition += b.length; //+n cursor
        jsKeyboard.updateCursor();
    },
    show: function () {
        $("#keyboard").animate({ "bottom": "0" }, "slow", function () { });
    },
    hide: function () {
        $("#keyboard").animate({ "bottom": "-350px" }, "slow", function () { });
    },
    defaultKeyboard: {
        capitalLetter:
            [
        // 1st row
               [{value: 81 }, { value: 87 }, { value: 69 }, { value: 82 }, { value: 84 }, { value: 90 },
               { value: 85 }, { value: 73 }, { value: 79 }, { value: 80 },
               { value: "L&oumlschen", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" }],
        // 2nd row
               [{value: 65, buttonClass: "button button_a" }, { value: 83 }, { value: 68 }, { value: 70 },
               { value: 71 }, { value: 72 }, { value: 74 }, { value: 75 }, { value: 76 }, { value: "Best&aumltigen", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" }
               ],
        // 3rd row
               [{ value: "Stop", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
               { value: "Hilfe", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
               { value: 89 }, { value: 88 }, { value: 67 }, { value: 86 }, { value: 66 }, { value: 78 }, { value: 77 },
               { value: "Leerzeichen", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" } 
               ]
           ]

    }
}


// GET CURSOR POSITION
jQuery.fn.getCursorPosition = function(){
	if(this.lengh == 0) return -1;
	return $(this).getSelectionStart();
}

jQuery.fn.getSelectionStart = function(){
	if(this.lengh == 0) return -1;
	input = this[0];

	var pos = input.value.length;

	if (input.createTextRange) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', input.value.length);
		if (r.text == '')
		pos = input.value.length;
		pos = input.value.lastIndexOf(r.text);
	} else if(typeof(input.selectionStart)!="undefined")
	pos = input.selectionStart;

	return pos;
}

//SET CURSOR POSITION
jQuery.fn.setCursorPosition = function(pos) {
	this.each(function(index, elem) {
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	});
	return this;
};
