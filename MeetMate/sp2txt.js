// This function gets activated when we click Speech To Text Off button and STARTS Speech Recognition
async function speech2textOn(){ 
    recognition.start(); // Speech recognition start
}
// This function gets activated when we click Speech To Text On button and STOPS Speech Recognition 
async function speech2textOff(){
    recognition.stop(); // Speech Recognition Stop
}
///this function takes a string and converts it into an array of tokens for speech emotion to act efficiently.
function speechTokenize (input) {              //This speechTokenize function code is 
    return input                               //written by 
            .replace(/[^a-zA-Z ]+/g, '')       //Andrew Sliwinski 
            .replace('/ {2,}/',' ')            //and you can
            .toLowerCase()                     // find it on 
            .split(' ');                       //https://github.com/thisandagain/sentiment
}

var SpeechRecognition = window.webkitSpeechRecognition; //initialising the speechRecognition object from webkitSpeechRecognition API 
var recognition = new SpeechRecognition(); //initialising recognition variable from SpeechRecognition object

recognition.continuous = true; // making speech recognition continuous

var words = document.querySelector('.words'); //fectching the division in index.html with class "words"
words.appendChild(textArea);// inserting textarea as a node in division as a class "words"

var previousTranscipt = "";// storing the last transcript , i.e. the speech to text result that was produced before the new one.

//this peech to text API unfortunately switches it off even after being continuous so to
//prevent user's loss we alert the user by producing two high frequency beeps and a window alert
recognition.onend = function(){
    previousTranscipt = ""; // after the recognition ends , refreshing the previous transcript is necessary!
    
    //producing the first beep 
    var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);//calling the APIs
    var oscillator = audioCtx.createOscillator();// creating the ocsillator at predefined frequency
    var gainNode = audioCtx.createGain();// creating the variable to connect at the predefined volume
    oscillator.connect(gainNode);// connecting oscillator and volume variable
    gainNode.connect(audioCtx.destination);// connecting the volume variable to speaker
    oscillator.start(audioCtx.currentTime); // starting the oscillator
    oscillator.frequency.value = 1320; // setting oscillator value 1320 Hz
    oscillator.stop(audioCtx.currentTime + ((150 || 500) / 1000));// stopping the oscillator

    //producing second beep after 300 milliseconds first beep starts it also generates window alert
    setTimeout(function(){
        var audioCtx2 = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
        var oscillator2 = audioCtx2.createOscillator();
        var gainNode2 = audioCtx2.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioCtx2.destination);
        oscillator2.start(audioCtx2.currentTime);
        oscillator2.frequency.value = 1320;
        oscillator2.stop(audioCtx2.currentTime + ((250 || 500) / 1000));

        alert("PLEASE RESTART SPEECH TO TEXT"); // window alert for the user

        const speech_nt_clkbt = document.getElementById('speech_nt_clk'); // using Speech to Text Off Button from index.html 
        const speech_clkbt = document.getElementById('speech_clk'); // using Speech to Text On Button from index.html 
        speech_clkbt.style.display = 'none'; // hiding the Speech to Text On Button
        speech_nt_clkbt.style.display = 'inline-block'; // Showining the Speech to Text Off Button again
    
    },300)
}
//adding time after every one minute to the result for user's reference
setInterval(function(){
    timeBreak = document.createElement('br');//creating a break tag so that it would be easy for the user to see the time
    textBody = document.getElementsByTagName("p")[1];// fetching textarea
    textBody.appendChild(timeBreak);//appending break
    let currentDate = new Date(); // acessing the whole date
    let currentDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear(); // creating a string in Indian Date Format
    let dateTimeString = currentDateString + ',' + currentDate.getHours()  + ":"+  currentDate.getMinutes() + ":" + currentDate.getSeconds(); // creating final date string
    document.getElementById("textArea").innerHTML+=dateTimeString;
    timeBreak2 = document.createElement('br');//creating another break
    textBody.appendChild(timeBreak2);// appending break
},60000)

//THIS IS A VERY IMPORTANT PART OF CODE
/*
  It does the following tasks:-
    1.)mapping the speech recognition result from an Array to a transcript variable
    2.)using AFINN.json and speechTokenize function by Andrew Sliwinski and producing
       speech emotion in speechWarn in index.html
    3.)producing three consecutive beeps if the claas Status is "Warning!"
*/
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // creating a transcript array using results from the Speech Recognition
        .map(result => result[0])
        .map(result => result.transcript)
        .join('') //joining the transcript array into string by spaces to create representable statements
       
        // This solved a major problem, transcript was the full array of all the speech to text done till now,
        // so we have to update the whole textarea, and due to this whenever we restarted the speech to text
        // (because it switches it off automatically after 15 - 20 second of no input) but now after restarting speech to text, our result remains intact!
        var latestSentence = transcript.substring(previousTranscipt.length);//The lastest update in the transcript is done
        document.getElementById("textArea").innerHTML+=latestSentence;// the latest update added to the textarea
        previousTranscipt = transcript;//storing the last transcript done.
        
        //tokenising the latSentence
        var speechTokens = speechTokenize(latestSentence);
        var speechWord = null;//variable to loop across the tokens
        var speechScore = 0; // speech score to identify the Claass Status
        /*
            Using fetch API to convet AFINN.json to a JavaScript object
            The catch is fetch API only works in a server so we recommend you to use 
            our Heroku deployment but if you want to test it locally and if you are using VS Code
            we recoomend you to use Live Server extension of VS Code.

            Let's talk about AFINN.json now!
            AFINN.json is a dataset of aroun 2,500 words that signify emotions in any way and a score is assigned
            to each word in the of -5 to 5. 
            the word that is positive is assigned a positive score around its degree of positivity 
            similarly negative words are assigned negative scores. 
        */
        
        fetch("./AFINN.json") // generates a promise
            .then(response => response.json())//gets a response
            .then(data => { //we can work with AFINN.json's data here only
                    // looping over tokens of lastSentence
                    for(speechWord in speechTokens){
                        if (typeof data[speechTokens[speechWord]] === 'undefined') { // to continue when it gets uncharted word's
                                continue;                                            //(which it gets the most) like I , we , is , in etc.
                        }
                        speechScore += data[speechTokens[speechWord]]; // if the word is charted, like good, bad, etc. add the value in speechScore 
                    }
                    // if cumulative speechScore is positive, then everything's fine 
                    //else warning is issued to the user by three beeps
                    if(speechScore >= 0){
                        document.getElementById("speechWarn").innerText = "All good!";
                    }
                    else{
                        document.getElementById("speechWarn").innerText = "Warning!";
                        //first beep
                        var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
                        var oscillator = audioCtx.createOscillator();
                        var gainNode = audioCtx.createGain();                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        oscillator.start(audioCtx.currentTime);
                        oscillator.frequency.value = 880;
                        oscillator.stop(audioCtx.currentTime + ((50 || 500) / 1000));
                        //second beep
                        setTimeout(function(){
                            var audioCtx2 = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
                            var oscillator2 = audioCtx2.createOscillator();
                            var gainNode2 = audioCtx2.createGain();
                            oscillator2.connect(gainNode2);
                            gainNode2.connect(audioCtx2.destination);
                            oscillator2.start(audioCtx2.currentTime);
                            oscillator2.frequency.value = 1320;
                            oscillator2.stop(audioCtx2.currentTime + ((50 || 500) / 1000));                        
                        },300)
                        //third beep 
                        setTimeout(function(){
                            var audioCtx3 = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
                            var oscillator3 = audioCtx3.createOscillator();
                            var gainNode3 = audioCtx3.createGain();
                            oscillator3.connect(gainNode3);
                            gainNode3.connect(audioCtx3.destination);
                            oscillator3.start(audioCtx3.currentTime);
                            oscillator3.frequency.value = 1320;
                            oscillator3.stop(audioCtx3.currentTime + ((50 || 500) / 1000));                        
                        },600)
                    }
                })
});
