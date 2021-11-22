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

//mapping the speech recognition result from an Array to a transcript variable
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // creating a transcript array using results from the Speech Recognition
        .map(result => result[0])
        .map(result => result.transcript)
        .join('') //joining the transcript array into string by spaces to create representable statements

        document.getElementById("textArea").innerHTML = transcript; //updating the whole result result in the text area
                                                                    //we haven't added the changes using '+=' as it used to repeat itself three times 
                                                                    //using that method and that is why we have to dispaly screenshots and speech to text
                                                                    //results on different elements
});
