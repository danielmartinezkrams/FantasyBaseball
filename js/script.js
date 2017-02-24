/**
 * Created by h205p2 on 2/6/17.
 */
var W = false;
var L = false;
var G = false;
var GS = false;
var  CG= false;
var  SHO = false;
var SV = false;
var IPOuts = false;
var H = false;
var ER = false;
var HR = false;
var BB = false;
var SO = false;
var BAOpp = false;
var ERA = false;
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
pitcherStatsArray = [W, L, G, GS, CG, SHO, SV, IPOuts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP];
pitcherArray = ["W", "L", "G", "GS", "CG", "SHO", "SV", "IPOuts", "H", "ER", "HR", "BB", "SO", "BAOpp", "ERA", "IBB", "WP", "HBP", "BK", "BFP", "GF", "R", "SH", "SF", "GIDP"];
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
    $("#pitcherFilter").click(function(){
        $('#filter').html(pitcherStats);
        for(var j = 0; j < pitcherArray.length; j++){
            console.log(pitcherArray[j]);
            if(document.getElementById(pitcherArray[j]).checked){
                console.log("hi");
                pitcherStatsArray[j] = true;
            }
        }
        console.log(pitcherStatsArray);
    });

    $("#batterFilter").click(function(){
        $('#filter').html(batterStats)
    });
    $("#submit").click(function(){
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
                                var pitchHeader = "";
                                var pitchDisplay = ("<tr>" + pitchHeader + "</tr>");
                                var pitchRow = ("<tr></tr>");
                                console.log(pitcherStatsArray.length);
                                for(var i = 0; i < pitcherStatsArray.length; i++){
                                    pitchBody += ("<td></td>");
                                    if(pitcherStatsArray[i]){
                                        console.log(i);
                                        console.log(pitcherStatsArray[i]);

                                            //<th>Team</th> <th>ERA</th> <th>W</th> <th>L</th> <th>Opp BA</th></tr><tr><td>" + pValue + "</td><td>" + pValue.teamID + "</td><td>" + pValue.ERA + "</td><td>" + pValue.W + "</td><td>" + pValue.L + "</td><td>" + pValue.BAOpp + "</td></tr>");
                                    }

                                }
                            }
                        });
                        $("#pitch").append(pitchDisplay)
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


pitcherStats = "<div id='pitcherStats'><div class='btn-group' data-toggle='buttons'><label class='btn btn-primary active'><input id='W' type='checkbox' autocomplete='off' checked> W </label> <label class='btn btn-primary active'> <input id='L' type='checkbox' autocomplete='off' checked> L </label> <label class='btn btn-primary active'> <input id='ERA' type='checkbox' autocomplete='off' checked> ERA </label> <label class='btn btn-primary active'> <input id='SO' type='checkbox' autocomplete='off' checked> SO </label> <label class='btn btn-primary active'> <input id='BAOpp' type='checkbox' autocomplete='off' checked> BAOpp </label> <label class='btn btn-primary active'> <input id='G' type='checkbox' autocomplete='off' checked> G </label> <label class='btn btn-primary'> <input id='HR' type='checkbox' autocomplete='off' > HR </label> <label class='btn btn-primary'> <input id='GS' type='checkbox' autocomplete='off' > GS </label> <br> <label class='btn btn-primary'> <input id='CG' type='checkbox' autocomplete='off'> CG </label> <label class='btn btn-primary'> <input id='SHO' type='checkbox' autocomplete='off'> SHO </label> <label class='btn btn-primary'> <input id='SV' type='checkbox' autocomplete='off' > SV </label> <label class='btn btn-primary'> <input id='IPOuts' type='checkbox' autocomplete='off'> IPOuts </label> <label class='btn btn-primary'> <input id='H' type='checkbox' autocomplete='off'> H </label> <label class='btn btn-primary'> <input id='ER' type='checkbox' autocomplete='off'> ER </label> <label class='btn btn-primary'> <input id='BB' type='checkbox' autocomplete='off'> BB </label> <label class='btn btn-primary'> <input id='IBB' type='checkbox' autocomplete='off'> IBB </label> <br> <label class='btn btn-primary'> <input id='WP' type='checkbox' autocomplete='off'> WP </label> <label class='btn btn-primary'> <input id='HBP' type='checkbox' autocomplete='off'> HBP </label> <label class='btn btn-primary'> <input id='BK' type='checkbox' autocomplete='off'> BK </label> <label class='btn btn-primary'> <input id='BFP' type='checkbox' autocomplete='off'> BFP </label> <label class='btn btn-primary'> <input id='GF' type='checkbox' autocomplete='off'> GF </label> <label class='btn btn-primary'> <input id='R' type='checkbox' autocomplete='off'> R </label> <label class='btn btn-primary'> <input id='SH' type='checkbox' autocomplete='off'> SH </label> <label class='btn btn-primary'> <input id='SF' type='checkbox' autocomplete='off'> SF </label> <label class='btn btn-primary'> <input id='GIDP' type='checkbox' autocomplete='off'> GIDP </label> </div> </div>"
batterStats = "<div id='batterStats'> <div class='btn-group' data-toggle='buttons'> <label class='btn btn-primary active'> <input id='Gb' type='checkbox' autocomplete='off' checked> G </label> <label class='btn btn-primary active'> <input id='ABb' type='checkbox' autocomplete='off' checked> AB </label> <label class='btn btn-primary active'> <input id='Rb' type='checkbox' autocomplete='off' checked> R </label> <label class='btn btn-primary active'> <input id='Hb' type='checkbox' autocomplete='off' checked> H </label> <label class='btn btn-primary active'> <input id='2Bb' type='checkbox' autocomplete='off' checked> 2B </label> <label class='btn btn-primary active'> <input id='3Bb' type='checkbox' autocomplete='off' checked> 3B </label> <label class='btn btn-primary'> <input id='HRb' type='checkbox' autocomplete='off' > HR </label> <label class='btn btn-primary'> <input id='RBIb' type='checkbox' autocomplete='off' > RBI </label> <br> <label class='btn btn-primary'> <input id='SBb' type='checkbox' autocomplete='off'> SB </label> <label class='btn btn-primary'> <input id='CSb' type='checkbox' autocomplete='off'> CS </label> <label class='btn btn-primary'> <input id='BBb' type='checkbox' autocomplete='off' > BB </label> <label class='btn btn-primary'> <input id='SOb' type='checkbox' autocomplete='off'> SO </label> <label class='btn btn-primary'> <input id='IBPb' type='checkbox' autocomplete='off'> IBP </label> <label class='btn btn-primary'> <input id='HBPb' type='checkbox' autocomplete='off'> HBP </label> <label class='btn btn-primary'> <input id='SFb' type='checkbox' autocomplete='off'> SF </label> <label class='btn btn-primary'> <input id='SHb' type='checkbox' autocomplete='off'> SH </label> <label class='btn btn-primary'> <input id='GIDPb' type='checkbox' autocomplete='off'> GIDP </label> </div> </div>";


/*stint, teamID, lgID, W, L, G, GS, CG, SHO, SV, IPouts, H, ER, HR, BB, SO, BAOpp, ERA, IBB, WP, HBP, BK, BFP, GF, R, SH, SF, GIDP
stint, teamID, lgID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP*/

