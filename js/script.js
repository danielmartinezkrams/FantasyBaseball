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
function makeTotalArray(place, pResult, pKey){
    console.log(place);
    console.log
    console.log((pResult[pKey])[place]);
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
        $("#pitchFilter").hide();
        $("#batFilter").hide();
        $("#pitch").empty();
        $("#bat").empty();

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

        $("#pitch").append(pitchDisplay);
        $("#bat").append(batDisplay);
        $('#output').toggle();
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
                                //<th>Team</th> <th>ERA</th> <th>W</th> <th>L</th> <th>Opp BA</th></tr><tr><td>" + pValue + "</td><td>" + pValue.teamID + "</td><td>" + pValue.ERA + "</td><td>" + pValue.W + "</td><td>" + pValue.L + "</td><td>" + pValue.BAOpp + "</td></tr>");
                                var pitcherBody = ("<td>" + pValue.yearID + "</td><td>" + pValue.teamID + "</td>");
                                for(var k = 0; k < pitcherStatsArray.length; k++){
                                    if(pitcherStatsArray[k]){
                                        var place = pitcherArray[k];
                                        var totalArray = makeTotalArray(place, pValue, pKey);

                                        //pValue[place]
                                        if(1 == 3) {
                                            pitcherBody += ("<td class='highlight'>" + pValue[place] + "</td>");
                                        } else {
                                            pitcherBody += ("<td>" + pValue[place] + "</td>");
                                        }
                                    }
                                }
                                var pitchRow = ("<tr>" + pitcherBody + "</tr>");
                                $("#pitch").append(pitchRow);
                            }
                        });
                    });
                    //end pitching iterate
                    //$("#output").append("Batting Data" + "<br>");
                    $.getJSON("Database/batting.json", function(bResult){
                        $.each(bResult, function (bKey, bValue) {
                            if(value.playerID == bValue.playerID) {
                                var batterBody = ("<td>" + bValue.yearID + "</td><td>" + bValue.teamID + "</td>");
                                for(var m = 0; m < batterStatsArray.length; m++){
                                    if(batterStatsArray[m]){
                                        var holder = batterArray2[m];
                                        if(holder == "BA"){
                                            batterBody += ("<td>" + (Math.round(((bValue.H)/(bValue.AB)) * 1000) / 1000) + "</td>");
                                        }
                                        else{
                                            batterBody += ("<td>" + bValue[holder] + "</td>");
                                        }
                                    }

                                }
                                var batRow = ("<tr>" + batterBody + "</tr>");
                                $("#bat").append(batRow);
                                //(Math.round(((bValue.H)/(bValue.AB))
                            }
                        });
                    });
                }
            });
        });

    });
});


//pitcherStats = "<div id='pitcherStats'><div class='btn-group' data-toggle='buttons'><label class='btn btn-primary active'><input id='W' type='checkbox' autocomplete='off' checked> W </label> <label class='btn btn-primary active'> <input id='L' type='checkbox' autocomplete='off' checked> L </label> <label class='btn btn-primary active'> <input id='ERA' type='checkbox' autocomplete='off' checked> ERA </label> <label class='btn btn-primary active'> <input id='SO' type='checkbox' autocomplete='off' checked> SO </label> <label class='btn btn-primary active'> <input id='BAOpp' type='checkbox' autocomplete='off' checked> BAOpp </label> <label class='btn btn-primary active'> <input id='G' type='checkbox' autocomplete='off' checked> G </label> <label class='btn btn-primary'> <input id='HR' type='checkbox' autocomplete='off' > HR </label> <label class='btn btn-primary'> <input id='GS' type='checkbox' autocomplete='off' > GS </label> <br> <label class='btn btn-primary'> <input id='CG' type='checkbox' autocomplete='off'> CG </label> <label class='btn btn-primary'> <input id='SHO' type='checkbox' autocomplete='off'> SHO </label> <label class='btn btn-primary'> <input id='SV' type='checkbox' autocomplete='off' > SV </label> <label class='btn btn-primary'> <input id='IPOuts' type='checkbox' autocomplete='off'> IPOuts </label> <label class='btn btn-primary'> <input id='H' type='checkbox' autocomplete='off'> H </label> <label class='btn btn-primary'> <input id='ER' type='checkbox' autocomplete='off'> ER </label> <label class='btn btn-primary'> <input id='BB' type='checkbox' autocomplete='off'> BB </label> <label class='btn btn-primary'> <input id='IBB' type='checkbox' autocomplete='off'> IBB </label> <br> <label class='btn btn-primary'> <input id='WP' type='checkbox' autocomplete='off'> WP </label> <label class='btn btn-primary'> <input id='HBP' type='checkbox' autocomplete='off'> HBP </label> <label class='btn btn-primary'> <input id='BK' type='checkbox' autocomplete='off'> BK </label> <label class='btn btn-primary'> <input id='BFP' type='checkbox' autocomplete='off'> BFP </label> <label class='btn btn-primary'> <input id='GF' type='checkbox' autocomplete='off'> GF </label> <label class='btn btn-primary'> <input id='R' type='checkbox' autocomplete='off'> R </label> <label class='btn btn-primary'> <input id='SH' type='checkbox' autocomplete='off'> SH </label> <label class='btn btn-primary'> <input id='SF' type='checkbox' autocomplete='off'> SF </label> <label class='btn btn-primary'> <input id='GIDP' type='checkbox' autocomplete='off'> GIDP </label> </div> </div>"
//batterStats = "<div id='batterStats'> <div class='btn-group' data-toggle='buttons'> <label class='btn btn-primary active'> <input id='Gb' type='checkbox' autocomplete='off' checked> G </label> <label class='btn btn-primary active'> <input id='ABb' type='checkbox' autocomplete='off' checked> AB </label> <label class='btn btn-primary active'> <input id='Rb' type='checkbox' autocomplete='off' checked> R </label> <label class='btn btn-primary active'> <input id='Hb' type='checkbox' autocomplete='off' checked> H </label> <label class='btn btn-primary active'> <input id='Double' type='checkbox' autocomplete='off' checked> 2B </label> <label class='btn btn-primary active'> <input id='Triple' type='checkbox' autocomplete='off' checked> 3B </label> <label class='btn btn-primary'> <input id='HRb' type='checkbox' autocomplete='off' > HR </label> <label class='btn btn-primary'> <input id='RBIb' type='checkbox' autocomplete='off' > RBI </label> <br> <label class='btn btn-primary'> <input id='SBb' type='checkbox' autocomplete='off'> SB </label> <label class='btn btn-primary'> <input id='CSb' type='checkbox' autocomplete='off'> CS </label> <label class='btn btn-primary'> <input id='BBb' type='checkbox' autocomplete='off' > BB </label> <label class='btn btn-primary'> <input id='SOb' type='checkbox' autocomplete='off'> SO </label> <label class='btn btn-primary'> <input id='IBBb' type='checkbox' autocomplete='off'> IBB </label> <label class='btn btn-primary'> <input id='HBPb' type='checkbox' autocomplete='off'> HBP </label> <label class='btn btn-primary'> <input id='SFb' type='checkbox' autocomplete='off'> SF </label> <label class='btn btn-primary'> <input id='SHb' type='checkbox' autocomplete='off'> SH </label> <label class='btn btn-primary'> <input id='GIDPb' type='checkbox' autocomplete='off'> GIDP </label> </div> </div>";


/*stint, teamID, lgID, W, L, G, GS, CG, SHO, SV, IPouts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP
stint, teamID, lgID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP*/

