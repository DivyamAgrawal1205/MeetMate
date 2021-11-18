var SpeechRecognition = window.webkitSpeechRecognition; //initialising the speechRecognition object from webkitSpeechRecognition API 
var recognition = new SpeechRecognition(); //initialising recognition variable from SpeechRecognition object
recognition.continuous = true; // making speech recognition continuous
var words = document.querySelector('.words'); //
words.appendChild(b);
//mapping the speech recognition result from an Array to a transcript variable
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        document.getElementById("b").innerHTML = transcript; //inserting result in the txt area
});
