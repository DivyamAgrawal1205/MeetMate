var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
var words = document.querySelector('.words');
words.appendChild(b);
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        document.getElementById("b").innerHTML = transcript;
        console.log(transcript);
});
