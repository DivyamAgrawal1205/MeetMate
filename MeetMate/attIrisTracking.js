var xprediction = 0;
var yprediction = 0;
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
     xprediction = data.x; //these x coordinates are relative to the viewport
     yprediction = data.y; //these y coordinates are relative to the viewport
}).begin();

var attentive_array=[];
var time_array=[];
var score = 0; 
var Status = null;
var total_time = 0;
var totalAttScore = 0;
setInterval(function(){
    if ((xprediction >= 0 && xprediction <= 1070) && (yprediction >= 80 && yprediction <= 680)) {
        score =2;
        Status = "Attentive!!"; } 
    else if ((xprediction >= 1071 && xprediction <= 1500) && (yprediction >= 80 && yprediction <= 680)) {
        score = 1;
        Status = "Less Attentive!"; }
    else {
        score = 0; 
        Status = "Very Less Attentive!";
