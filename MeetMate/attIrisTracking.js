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
        var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + ((150 || 500) / 1000));

}

    total_time +=2;
    totalAttScore += score;

    attPercentage = ((totalAttScore/total_time)*100).toFixed(1) +"%";
    
    let currentDate = new Date();
    let TimeString = currentDate.getHours()  + ":"+  currentDate.getMinutes() +":"+ currentDate.getSeconds();
    
    time_array.push(TimeString);
    attentive_array.push(score);

    var attentivenessTrace = {
        x : time_array,
        y : attentive_array,
        fill : 'tonexty',
        type : 'scatter'
    }
    
    var attData = [attentivenessTrace];
    Plotly.newPlot('attentivenessChart',attData);

    para = document.getElementById("p1");
    para.innerHTML = Status+ "  Attentiveness Score :"+attPercentage;
},2000)
