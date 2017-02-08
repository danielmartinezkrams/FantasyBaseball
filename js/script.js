/**
 * Created by h205p2 on 2/6/17.
 */

$(document).ready(function(){
    $("button").click(function(){
        $.getJSON("Database/master.json", function(result) {
            $.each(result, function (key, value) {
                if($("#name").val() == value.nameLast) {
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {
                            if(value.playerID == pValue.playerID) {
                                $("#output").append(pValue.yearID + " " + pValue.ERA + "<br>");
                            }
                        });
                    });
                }
            });
        });
    });
});

function onFocus(id){
    if(id.value == "Enter a Name") {
        id.value = "";
    }
}