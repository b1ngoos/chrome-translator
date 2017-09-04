var URL = "https://translate.yandex.net/api/v1.5/tr.json/translate";
var KEY = "trnsl.1.1.20170824T105138Z.7f63c8f08b90b918.7ac577a8b078bb3e6354250a7b7b8f4614208ba9";

$(document).ready(function(){

    var history = [];
    var lastInput = "";
    $('#input').keyup(function (e) {
        if (e.keyCode == 13){

            var text = $('#input').val();
            console.log(text);


            $.getJSON(URL, {key: KEY, lang: getLang(text), text: text})
                .done(function(res) {

                    if($('#result').text()!=="") {
                        history.push(lastInput + " : " + $('#result').text());
                        if (history.length > 5)
                            history.shift();
                    }

                    $('#result').text("");

                    for (var i in res.text) {
                        $('#result').text($('#result').text() + res.text[i] + " ");
                    }
                    lastInput = text;
                    writeHistory(history);
                })
                .fail(function( jqxhr, textStatus, error ) {
                    var err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
            });
        }
    });

    function writeHistory(history) {
        $('#history').text("");
        for(var i = history.length - 1; i >= 0 ; i--) {
            $('#history').text($('#history').text() + history[i] + "\n");
        }
    }

    function getLang(text) {
        if((/[а-яёЁ]/i).test(text))
            return 'ru-en';
        else
            return 'en-ru';
    }
});