// This function gets activated when we click Speech To Text Off button and STARTS Speech Recognition
async function speech2textOn(){ 
    recognition.start(); // Speech recognition start
}
// This function gets activated when we click Speech To Text On button and STOPS Speech Recognition 
async function speech2textOff(){
    recognition.stop(); // Speech Recognition Stop
}
var SpeechRecognition = window.webkitSpeechRecognition; //initialising the speechRecognition object from webkitSpeechRecognition API 
var recognition = new SpeechRecognition(); //initialising recognition variable from SpeechRecognition object

recognition.continuous = true; // making speech recognition continuous

var words = document.querySelector('.words'); //fectching the division in index.html with class "words"
words.appendChild(textArea);// inserting textarea as a node in division as a class "words"

var previousTranscipt = "";

setInterval(function(){
    let currentDate = new Date(); // acessing the whole date
    let currentDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear(); // creating a string in Indian Date Format
    let dateTimeString = currentDateString + ',' + currentDate.getHours()  + ":"+  currentDate.getMinutes() + ":" + currentDate.getSeconds(); // creating final date string
    document.getElementById("textArea").innerHTML+=dateTimeString;
},60000)

//mapping the speech recognition result from an Array to a transcript variable
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // creating a transcript array using results from the Speech Recognition
        .map(result => result[0])
        .map(result => result.transcript)
        .join('') //joining the transcript array into string by spaces to create representable statements
       
       
        var latestSentence = transcript.substring(previousTranscipt.length);
        document.getElementById("textArea").innerHTML+=latestSentence;
        previousTranscipt = transcript;
        function tokenize (input) {
            return input
                    .replace(/[^a-zA-Z ]+/g, '')
                    .replace('/ {2,}/',' ')
                    .toLowerCase()
                    .split(' ');
        }
        
        tokens = tokenize(latestSentence);
        
        var score = 0;
        fetch("./AFINN.json")
            .then(response => response.json())
            .then(data => {
                    for(word in tokens){
                        if (typeof data[tokens[word]] === 'undefined') {
                                continue;
                        }
                        score += data[tokens[word]];
                    }
                    console.log(score);
                    if(score >= 0){
                        document.getElementById("warn").innerText = "All good";}
                    else{
                        document.getElementById("warn").innerText = "Warning!";
                    }
                })

});
