var SpeechRecognition = window.webkitSpeechRecognition; //initialising the speechRecognition object from webkitSpeechRecognition API 
var recognition = new SpeechRecognition(); //initialising recognition variable from SpeechRecognition object
recognition.continuous = true; // making speech recognition continuous
var words = document.querySelector('.words'); //fectching the dividion in index.html with class "words"
words.appendChild(textArea);// inserting textarea as a node in division as a class "words"
//mapping the speech recognition result from an Array to a transcript variable
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results) // creating a transcript array using results from the Speech Recognition
        .map(result => result[0])
        .map(result => result.transcript)
        .join('') //joining the transcript array into string by spaces to create representable statements

        document.getElementById("textArea").innerHTML = transcript; //inserting result in the text area
});
