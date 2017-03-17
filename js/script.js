/**
 * Created by h205p2 on 2/6/17.
 */
var W = true;
var L = true;
var G = true;
var GS = false;
var  CG= false;
var  SHO = false;
var SV = false;
var IPouts = false;
var H = false;
var ER = false;
var HR = false;
var BB = false;
var SO = true;
var BAOpp = true;
var ERA = true;
var IBB = false;
var WP = false;
var HBP = false;
var BK = false;
var BFP = false;
var GF = false;
var R = false;
var SH = false;
var SF = false;
var GIDP = false;
pitcherStatsArray = [W, L, G, GS, CG, SHO, SV, IPouts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP];
pitcherArray = ["W", "L", "G", "GS", "CG", "SHO", "SV", "IPouts", "H", "ER", "HR", "BB", "SO", "BAOpp", "ERA", "IBB", "WP", "HBP", "BK", "BFP", "GF", "R", "SH", "SF", "GIDP"];
var Gb = true;
var ABb = false;
var Rb = true;
var Hb = true;
var Double = true;
var Triple = true;
var HRb = true;
var RBIb = true;
var SBb = true;
var CSb = false;
var BBb = false;
var SOb = false;
var IBBb = false;
var HBPb = false;
var SHb = false;
var SFb = false;
var GIDPb = false;
var BAb = true;
batterStatsArray = [Gb, ABb, Rb, Hb, Double, Triple, HRb, RBIb, SBb, CSb, BBb, SOb, IBBb, HBPb, SHb, SFb, GIDPb, BAb];
batterArray = ["Gb", "ABb", "Rb", "Hb", "Double", "Triple", "HRb", "RBIb", "SBb", "CSb", "BBb", "SOb", "IBBb", "HBPb", "SHb", "SFb", "GIDPb", "BAb"];
batterArray2 = ["G", "AB", "R", "H", "2B", "3B", "HR", "RBI", "SB", "CS", "BB", "SO", "IBB", "HBP", "SH", "SF", "GIDP", "BA"];
function pitchFilterCheck(){
    for(var j = 0; j < pitcherArray.length; j++){
        if(document.getElementById(pitcherArray[j]).checked){
            pitcherStatsArray[j] = true;
        }
    }
}
function batFilterCheck(){
    for(var l = 0; l < batterArray.length; l++){
        if(document.getElementById(batterArray[l]).checked){
            batterStatsArray[l] = true;
        }
    }
}

$(document).ready(function(){
    var array = [];
    $.getJSON("Database/master.json", function(result){
        $.each(result, function (key, value) {
            array[key] = (value.nameLast + ", " + value.NameFirst);
        })
    });
    $(function() {
        $("#name").autocomplete({
            source: array
        });
    });
    $("#pitcherFilter").click(function(){
        $("#batFilter").hide();
        $('#pitchFilter').toggle()
    });

    $("#batterFilter").click(function(){
        $("#pitchFilter").hide();
        $('#batFilter').toggle()
    });
    $("#submit").click(function(){
        var $output = $('#output');
        $("#pitchFilter").hide();
        $("#batFilter").hide();
        var $pitch = $("#pitch");
        $pitch.empty();

        var $bat = $("#bat");
        $bat.empty();

        var pitchHeader = "";
        for(var i = 0; i < pitcherStatsArray.length; i++){
            if(pitcherStatsArray[i]){
                pitchHeader += ("<th>" + pitcherArray[i] + "</th>");

            }
        }
        var pitchDisplay = ("<tr><th>Year</th><th>Team</th>" + pitchHeader + "</tr>");

        var batHeader = "";
        for(var n = 0; n < batterStatsArray.length; n++){
            if(batterStatsArray[n]){
                batHeader += ("<th>" + batterArray2[n] + "</th>");

            }
        }
        var batDisplay = ("<tr><th>Year</th><th>Team</th>" + batHeader + "</tr>");

        $pitch.append(pitchDisplay);
        $bat.append(batDisplay);
        $pitch.append("<div class='loader'></div>");
        $bat.append("<div class='loader'></div>");

        $output.toggle();
        $.getJSON("Database/master.json", function(result){
            //iterate over items in master
            $.each(result, function (key, value) {
                //if last name matches
                if ($("#name").val() == (value.nameLast + ", " + value.NameFirst)) {
                    $output.prepend(value.NameFirst + " " + value.nameLast);
                    //iterate over items in pitching
                    $.getJSON("Database/pitching.json", function(pResult) {
                        $.each(pResult, function (pKey, pValue) {

                            if(value.playerID == pValue.playerID) {
                                var pitcherBody = ("<td>" + pValue.yearID + "</td><td>" + pValue.teamID + "</td>");
                                for(var k = 0; k < pitcherStatsArray.length; k++){
                                    if(pitcherStatsArray[k]){

                                        var place = pitcherArray[k];
                                        //console.log("current stat: " + place);
                                        var counter = [];
                                        for(var q = 0; q < pResult.length; q++){
                                            //console.log(pResult[q].yearID);
                                            if (pResult[q].yearID == pValue.yearID) {
                                                counter.push(Number((pResult[q])[place]));
                                                counter.sort(function (a, b) {
                                                    return a - b
                                                });
                                            }
                                        }



                                        if(place == "ER" || place =="HR"|| place == "BB" || place =="BAOpp" || place =="ERA" || place =="IBB" || place =="HBP" || place =="BK"){
                                            /*console.log("array: " + counter);
                                            console.log("player value: " + pValue[place]);
                                            console.log("90th percent: " +Math.round(0.1*(counter.length)));
                                            console.log("90th percentile: "+counter[Math.round(0.1*(counter.length))]);
                                            */
                                            //console.log(counter[0]);
                                            if(pValue[place] == counter[0]) {
                                                //console.log("player number 1 " + "player value: " + pValue[place] + " Number 1: "+counter[0]);
                                                pitcherBody += ("<td class='highlightRed'>" + pValue[place] + "</td>");
                                            }
                                            else if(pValue[place] < counter[Math.round(0.05*(counter.length))]) {
                                                //console.log("player above 95th percentile " + "player value: " + pValue[place] + " 95th percentile: "+counter[Math.round(0.05*(counter.length))]);
                                                pitcherBody += ("<td class='highlightOrange'>" + pValue[place] + "</td>");
                                            }
                                            else if(pValue[place] < counter[Math.round(0.1*(counter.length))]) {
                                                //console.log("player above 90th percentile " + "player value: " + pValue[place] + " 90th percentile: "+counter[Math.round(0.1*(counter.length))]);
                                                pitcherBody += ("<td class='highlightYellow'>" + pValue[place] + "</td>");
                                            }
                                            else {
                                                pitcherBody += ("<td>" + pValue[place] + "</td>");
                                            }
                                        }
                                        else{
                                            /*console.log("array: " + counter);
                                            console.log("player value: " + pValue[place]);
                                            console.log("90th percent: " +Math.round(0.9*(counter.length)));
                                            console.log("90th percentile: "+counter[Math.round(0.9*(counter.length))]);
                                            */
                                            //console.log("first place: " + counter[counter.length - 1]);
                                            if(pValue[place] == counter[counter.length - 1]) {
                                                //console.log("player number 1 " + "player value: " + pValue[place] + " Number 1: "+counter[counter.length -1]);
                                                pitcherBody += ("<td class='highlightRed'>" + pValue[place] + "</td>");
                                            }
                                            else if(pValue[place] > counter[Math.round(0.95*(counter.length))]) {
                                                //console.log("player above 95th percentile " + "player value: " + pValue[place] + " 95th percentile: "+counter[Math.round(0.95*(counter.length))]);
                                                pitcherBody += ("<td class='highlightOrange'>" + pValue[place] + "</td>");
                                            }
                                            else if(pValue[place] > counter[Math.round(0.9*(counter.length))]) {
                                                //console.log("player above 90th percentile " + "player value: " + pValue[place] + " 90th percentile: "+counter[Math.round(0.9*(counter.length))]);
                                                pitcherBody += ("<td class='highlight'>" + pValue[place] + "</td>");
                                            }
                                            else {
                                                pitcherBody += ("<td>" + pValue[place] + "</td>");
                                            }
                                        }
                                    }
                                }
                                var pitchRow = ("<tr>" + pitcherBody + "</tr>");
                                $pitch.append(pitchRow);
                            }
                        });
                    });
                    //end pitching iterate
                    $.getJSON("Database/batting.json", function(bResult){
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                var batterBody = ("<td>" + bValue.yearID + "</td><td>" + bValue.teamID + "</td>");
                                for(var m = 0; m < batterStatsArray.length; m++){
                                    if(batterStatsArray[m]){
                                        var holder = batterArray2[m];
                                        //console.log("current stat: " + holder);
                                        var counter = [];
                                        for(var w = 0; w < bResult.length; w++){
                                            if (bResult[w].yearID == bValue.yearID) {
                                                counter.push(Number((bResult[w])[holder]));
                                                counter.sort(function (a, b) {
                                                    return (a - b)
                                                });
                                            }
                                        }


                                        if(holder == "CS" || holder =="SO"){
                                            if(bValue[holder] == counter[0]) {
                                                //console.log("player number 1 " + "player value: " + bValue[holder] + " Number 1: "+counter[0]);
                                                batterBody += ("<td class='highlightRed'>" + bValue[holder] + "</td>");
                                            }
                                            else if(bValue[holder] < counter[Math.round(0.05*(counter.length))]) {
                                                //console.log("player above 95th percentile " + "player value: " + bValue[holder] + " 95th percentile: "+counter[Math.round(0.05*(counter.length))]);
                                                batterBody += ("<td class='highlightOrange'>" + bValue[holder] + "</td>");
                                            }
                                            else if(bValue[holder] < counter[Math.round(0.1*(counter.length))]) {
                                                //console.log("player above 90th percentile " + "player value: " + bValue[holder] + " 90th percentile: "+counter[Math.round(0.1*(counter.length))]);
                                               batterBody += ("<td class='highlightYellow'>" + bValue[holder] + "</td>");
                                            }
                                            else {
                                                batterBody += ("<td>" + bValue[holder] + "</td>");
                                            }
                                        }
                                        else if(holder == "BA"){
                                            batterBody += ("<td>" + (Math.round(((bValue.H)/(bValue.AB)) * 1000) / 1000) + "</td>");
                                        }
                                        else{
                                            if(bValue[holder] == counter[counter.length - 1]) {
                                                //console.log("player number 1 " + "player value: " + bValue[holder] + " Number 1: "+counter[counter.length - 1]);
                                                batterBody += ("<td class='highlightRed'>" + bValue[holder] + "</td>");
                                            }
                                            else if(bValue[holder] > counter[Math.round(0.95*(counter.length))]) {
                                                //console.log("player above 95th percentile " + "player value: " + bValue[holder] + " 95th percentile: "+counter[Math.round(0.95*(counter.length))]);
                                                batterBody += ("<td class='highlightOrange'>" + bValue[holder] + "</td>");
                                            }
                                            else if(bValue[holder] > counter[Math.round(0.9*(counter.length))]) {
                                                //console.log("player above 90th percentile");
                                                batterBody += ("<td class='highlight'>" + bValue[holder] + "</td>");
                                            }
                                            else {
                                                batterBody += ("<td>" + bValue[holder] + "</td>");
                                            }
                                        }
                                    }

                                }
                                var batRow = ("<tr>" + batterBody + "</tr>");
                                $bat.append(batRow);
                                //(Math.round(((bValue.H)/(bValue.AB))
                            }
                        });
                    });
                    $(".loader").hide()
                }
            });
        });

    });

});




/*stint, teamID, lgID, W, L, G, GS, CG, SHO, SV, IPouts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP
stint, teamID, lgID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP*/

