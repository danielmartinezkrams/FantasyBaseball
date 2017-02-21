/**
 * Created by h205p2 on 2/6/17.
 */
function createArray(){
    var array = [];
    $.getJSON("Database/master.json", function(result){
        $.each(result, function (key, value) {
            array[key] = (value.nameLast + ", " + value.NameFirst);
        })
    });
    return array
}
$(document).ready(function(){
    $(function() {
        var availableTags = createArray();
        $("#name").autocomplete({
            source: availableTags
        });
    });
    $("#filter").click(function() {
        $('#statInput').toggle();
    });

    $("#submit").click(function(){
        $('#output').css("display", "block");
        $.getJSON("Database/master.json", function(result){
            //iterate over items in master
            $.each(result, function (key, value) {
                //if last name matches
                if ($("#name").val() == (value.nameLast + ", " + value.NameFirst)) {
                    //$("#output").prepend(value.NameFirst + " " + value.nameLast);
                    //iterate over items in pitching
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {
                            if(value.playerID == pValue.playerID) {
                                $("#pitch").append("<tr>"+"<td>" + pValue.yearID + "</td><td>" + pValue.teamID + "</td><td>" + pValue.ERA + "</td><td>" + pValue.W + "</td><td>" + pValue.L + "</td><td>" + pValue.BAOpp + "</td>"+"</tr>");
                            }
                        });
                    });
                    //end pitching iterate
                    //$("#output").append("Batting Data" + "<br>");
                    $.getJSON("Database/batting.json", function(bResult){
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                $("#bat").append("<tr><td>" + bValue.yearID + "</td><td>" + bValue.teamID + "</td><td>" + bValue.G + "</td><td>" + bValue.R + "</td><td>" + bValue.H + "</td><td>" + bValue.AB + "</td><td>" + bValue.HR + "</td><td>" + (Math.round(((bValue.H)/(bValue.AB)) * 1000) / 1000) + "</td></tr>");
                            }
                        });
                    });
                }
            });
        });
    });
});




/*stint, teamID, lgID, W, L, G, GS, CG, SHO, SV, IPouts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP
stint, teamID, lgID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP*/

