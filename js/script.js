/**
 * Created by h205p2 on 2/6/17.
 */
function nameChange(){
    if(document.getElementById("name").value == "Enter Last Name Here"){
        document.getElementById("name").value = "";
    }
}
$(document).ready(function(){
    /*$('output').empty();
    $('name').hover(function(){
        $(this).remove();
    });
    */
    $("button").click(function(){
        $('output').show();
        $.getJSON("Database/master.json", function(result){

            //iterate over items in master
            $.each(result, function (key, value) {

                //if last name matches
                if($("#name").val() == value.nameLast) {
                    console.log(" value: " + value);
                    $("#output").append(value.NameFirst + " " + value.nameLast + "<br>");

                    //iterate over items in pitching
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {
                            if(value.playerID == pValue.playerID) {
                                console.log(" pKey: " + pKey + " pValue: " + pValue);
                                $("#output").append(pValue.yearID+" "+pValue.teamID+" "+pValue.ERA+" "+pValue.W+" "+pValue.L+" "+pValue.BAOpp+"<br>");
                                console.log(pValue.yearID+" "+pValue.teamID+" "+pValue.ERA+" "+pValue.W+" "+pValue.L+" "+pValue.BAOpp+"<br>");
                            }
                        });
                    });
                    //end pitching iterate

                    console.log("hey");
                    $.getJSON("Database/batting.json", function(bResult){
                        console.log("hi");
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                $("#output").append(bValue.yearID+" "+bValue.teamID+" "+bValue.G+" "+bValue.H+" "+bValue.AB+" "+(bValue.H)/(bValue.AB)+"<br>");
                                console.log(bValue.yearID+" "+bValue.teamID+" "+bValue.G+" "+bValue.H+" "+bValue.AB+" "+(bValue.H)/(bValue.AB))
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