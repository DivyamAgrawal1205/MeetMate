var xprediction = 0; // initialising the variable to track the x coorndiate of the prediction 
var yprediction = 0; // initialising the variable to track the y coorndiate of the prediction 

//using the webgazer.js used in index.html
//This function sets the model in the webpage and and generates reading rapidly.
//this function has two parameters , data and elapsed Timme
//data corresponds to the prediction data whereas elapsed time refers to time gap in whuch last prediction was made
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
     xprediction = data.x; //these x coordinates are relative to the viewport
     yprediction = data.y; //these y coordinates are relative to the viewport
}).begin();//beginning the webgazer.js module

var attArray=[]; // this array is used to store the score of the attentiveness 
var timeArray=[]; // this array is used to store the timings of the score  
var attScore = 0; // this variable stores the score and then is appended in attArray
var attStatus = null; // this variable stores the attentiveness Status and displays it to the user
var totalTime = 0; // this variable calculates the total Time (as it is used to find percentage it is more like ideal attentiveness of full score every time)
var totalAttScore = 0; // this variable adds up the attScore at each iteration

var prevXprediction1 = 0;//variable to store the last xprediction
var prevXprediction2 = 0;//variable to store the second last xprediction
var prevYprediction1 = 0;//variable to store the last yprediction
var prevYprediction2 = 0;//variable to store the second last yprediction

//This is a periodic function whose cycle period is 2 seconds.
/*This function does the following things:-
    1.) Generates the prediction of attentiveness
    2.) Produces a sound when the person is Very less attentive
    3.) Draws a plot using attArray and timeArray
*/ 
/*The criteria to find whether one is attentive or not is explained in the README, or in short
  we used the dimensions of screen and caculated ratios of a typical meet in Google Meet.
*/
setInterval(function(){
    //Whenever the user leaves the meet, webgazer.js shows the last reading only
    //so, it used to show previous score even when user is not present (i.e. it can show that user is attentive even when user is not there without this check)
    //so by if the last two readings are same(as it is impossible to do so due to webgazer's unstability) to the current readings
    //then the user gets zero attScore, hence beep Warning!
    if(prevXprediction2==prevXprediction1 && prevXprediction1==xprediction && prevYprediction2==prevYprediction1 && prevYprediction1 == yprediction){
        attScore = -1;//lowest score
        attStatus = "User Not Present!";
        //audio production
        var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);//calling the APIs
        var oscillator = audioCtx.createOscillator();// creating the ocsillator at predefined frequency
        var gainNode = audioCtx.createGain();// creating the variable to connect at the predefined volume
        oscillator.connect(gainNode);// connecting oscillator and volume variable
        gainNode.connect(audioCtx.destination);// connecting the volume variable to speaker
        oscillator.start(audioCtx.currentTime); // starting the oscillator
        oscillator.stop(audioCtx.currentTime + ((150 || 500) / 1000));// stopping the oscillator 
    }
    //This range is given the highest score as this region makes the region where screen is shared in a typical meet
    else if ((xprediction >= 0 && xprediction <= 1070) && (yprediction >= 80 && yprediction <= 680)) {
        attScore =2;//highest Score
        attStatus = "Attentive!!"; 
    } 
    //This range is given the average score as this regoin makes the region where typically chatbox and participant list is shown 
    else if ((xprediction >= 1071 && xprediction <= 1500) && (yprediction >= 80 && yprediction <= 680)) {
        attScore = 1;//average score
        attStatus = "Less Attentive!"; 
    }
    //This region is given the lowest score as this region is outside the meeting area
    //when this criteria is satisfied, it produces a beep to alert the user!
    else {
        attScore = 0;//low score
        attStatus = "Very Less Attentive!";
        //audio production
        var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);//calling the APIs
        var oscillator = audioCtx.createOscillator();// creating the ocsillator at predefined frequency
        var gainNode = audioCtx.createGain();// creating the variable to connect at the predefined volume
        oscillator.connect(gainNode);// connecting oscillator and volume variable
        gainNode.connect(audioCtx.destination);// connecting the volume variable to speaker
        oscillator.start(audioCtx.currentTime); // starting the oscillator
        oscillator.stop(audioCtx.currentTime + ((150 || 500) / 1000));// stopping the oscillator 
    }

    prevXprediction2 = prevXprediction1;// storing last xprecdiction in second last xprediction
    prevYprediction2 = prevYprediction1;// storing last yprecdiction in second last yprediction
    prevXprediction1 = xprediction;// storing current xprecdiction in last xprediction
    prevYprediction1 = yprediction;// storing current yprecdiction in last yprediction

    //calculating the attPercentage using the formula((real time cumulative attentiveness score)/(ideal(full score) attentiveness score))
    // and displaying it to the user
    totalTime +=2;//adding the ideal score after every two seconds 
    totalAttScore += attScore;//adding the attScore after every two seconds
    attPercentage = ((totalAttScore/totalTime)*100).toFixed(1) +"%"; // calculating the percentage
    attStatusReport = document.getElementById("attReport");//fetching the element by id "attReport" in index.html
    attStatusReport.innerHTML = attStatus + "  Attentiveness Score :"+ attPercentage; // printing the Status Report in user page
    
    //collecting the required data and plotting live graph
    let currentDate = new Date();//creating a new date
    let TimeString = currentDate.getHours()  + ":"+  currentDate.getMinutes() +":"+ currentDate.getSeconds();//a variable with only Time 
    timeArray.push(TimeString);//inserting Time in tTime array
    attArray.push(attScore);//inserting attScore in attArray

    //creating an object that Plotly.js would use
    var attTrace = {
        x : timeArray, // time as x axis
        y : attArray, // score as y axis
        fill : 'tonexty', // area graph
        type : 'scatter' // scatter type
    }
    var attData = [attTrace]; // creating the data to plot the graph
    Plotly.newPlot('attChart',attData); // Using Plotly.js to draw a chart in 'attChart' area of index,html
},2000)
