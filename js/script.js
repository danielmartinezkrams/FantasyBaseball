/**
 * Created by h205p2 on 2/6/17.
 */
function nameChange(){
    document.getElementById("name").value = "";
}
$(document).ready(function(){
    $('output').hide();
    $('name').hover(function(){
        $(this).remove();
    });
    $("button").click(function(){
        $('output').show();
        $.getJSON("Database/master.json", function(result) {
            $.each(result, function (key, value) {
                if($("#name").val() == value.nameLast) {
                    $("#output").append(value.NameFirst + " " + value.nameLast + "<br>");
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {
                            if(value.playerID == pValue.playerID) {
                                $("#output").append(pValue.yearID+" "+pValue.teamID+" "+pValue.ERA+" "+pValue.W+" "+pValue.L+" "+pValue.BAOpp+"<br>");
                            }
                        });
                    });
                    $.getJSON("Database/batting.json", function(bResult) {
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                $("#output").append(bValue.yearID+" "+bValue.teamID+" "+bValue.G+" "+bValue.H+" "+bValue.AB+" "+(bValue.H)/(bValue.AB)+"<br>");
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