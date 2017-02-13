/**
 * Created by h205p2 on 2/6/17.
 */
function nameChange(){
    if(document.getElementById("name").value == "Enter Last Name Here"){
        document.getElementById("name").value = "";
    }
}
$(document).ready(function(){
    $('output').empty();
    $('name').hover(function(){
        $(this).remove();
    });
    $("button").click(function(){
        $('output').show();
        $.getJSON("Database/master.json", function(result){

            //iterate over items in master
            $.each(result, function (key, value) {

                //if last name matches
                if($("#name").val() == value.nameLast) {
                    console.log(" value: " + value);
                    $("#output").prepend(value.NameFirst + " " + value.nameLast);
                    //iterate over items in pitching
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {
                            if(value.playerID == pValue.playerID) {
                                console.log(" pKey: " + pKey + " pValue: " + pValue);
                                $("#pitch").append("<tr>"+"<td>" + pValue.yearID + "</td><td>" + pValue.teamID + "</td><td>" + pValue.ERA + "</td><td>" + pValue.W + "</td><td>" + pValue.L + "</td><td>" + pValue.BAOpp + "</td>"+"</tr>");
                                console.log(pValue.yearID+" "+pValue.teamID+" "+pValue.ERA+" "+pValue.W+" "+pValue.L+" "+pValue.BAOpp+"<br>");
                            }
                        });
                    });
                    //end pitching iterate

                    //$("#output").append("Batting Data" + "<br>");
                    $.getJSON("Database/batting.json", function(bResult){
                        console.log("hi");
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                $("#bat").append("<tr>"+"<td>" + bValue.yearID + "</td><td>" + bValue.teamID + "</td><td>" + bValue.G + "</td><td>" + bValue.H + "</td><td>" + bValue.AB + "</td><td>" + ((bValue.H)/(bValue.AB)) + "</td>"+"</tr>");
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
stint, teamID, lgID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP

("#table").append("<tr>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("<td>" + bValue.id + "</td>")
("#table").append("</tr>")

 */


