initCharcounter();

/*
* data-textinput_input="charcount" : 文字数をカウントするinput要素の指定
* data-textinput="display-charcount" : 文字数を表示する要素の指定(inputの兄弟要素)
* data-textinput-maxlength="8" : 全半角での文字数制限の指定
*/
function initCharcounter() {
    var textinputs = document.querySelectorAll('[data-textinput_input="charcount"]');
    for(var i = 0; i < textinputs.length; i++) {
        countCharsByType(textinputs[i]);
        textinputs[i].addEventListener('input', updateCharcountByType);
        textinputs[i].addEventListener('change', setMaxlengthByType);
    }
}

function updateCharcountByType(e) {
    countCharsByType(e.target);
}

function countCharsByType(input) {
    var maxlength = input.getAttribute('data-textinput-maxlength');
    var charcount = getCharcountByType(input.value);
    var charcountTag = input.parentNode.querySelector('[data-textinput="display-charcount"]');
    var charcountText = charcount + '/' + maxlength + '文字';
    charcountTag.innerHTML = charcountText;
}

function setMaxlengthByType(e) {
    var input = e.target;
    var charcount = getCharcountByType(input.value);
    var maxlength = input.getAttribute('data-textinput-maxlength');

    if(isMaxlength()) {
        var maxlengthByType = getMaxlengthByType(input.value);
        var charcountTag = input.parentNode.querySelector('[data-textinput="display-charcount"]');
        input.value = input.value.slice(0, maxlengthByType);
        charcountTag.innerHTML = maxlength + '/' + maxlength + '文字';
    }

    function isMaxlength() {
        return charcount > parseInt(maxlength);
    }

    function getMaxlengthByType(words) {
        var result = 0;
        for(var i = 0; i < parseInt(maxlength); i++) {
            var halfwidth = words[i].match(/^[\x01-\x7E\xA1-\xDF]+$/) ? true : false;
            if(halfwidth) {
                result += 2;
            } else {
                result += 1;
            }
        }
        return result;
    }
}

function getCharcountByType(words) {
    var result = 0;
    for(var i = 0; i < words.length; i++) {
        result += countByType(words[i]);
    }
    return Math.round(result);
    function countByType(char) {
        var halfwidth = char.match(/^[\x01-\x7E\xA1-\xDF]+$/) ? true : false;
        if(halfwidth) {
            return 0.5;
        }
        return 1;
    }
}