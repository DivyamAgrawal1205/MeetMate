let completeBlob = null
let recorder = null
let chunks = [];
let stream = null
// This function is activated when record button is clicked.
async function startRecord() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({  //This variable fetches the user media i.e. Display Screen.
            video: {
                mediaSource: 'screen'  //Recording screen through stream variable.
            },
        })
        audio = await navigator.mediaDevices.getUserMedia({  // This variable fetches the user media i.e. microphone.
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44100,
			},
        });
        mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()])  //Intialising a variable that starts both screen recording and audio recording.
        recorder = new MediaRecorder(mixedStream); // Intialaising a variable to control the screen and audio recording.
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.start(); // Starting the screen and audio recording.
        recorder.onstop = onstop; // Forwarding to onstop function in case when recording is stopped.
    } catch (error) {
        window.alert(error) // Alerting the user of any errors.

    }
}
// This function is activated when stop recording button is clicked.
async function stopScreen() {
    recorder.stop() // Stopping the screen and audio recording.
    stream.getTracks().forEach(function (track) { // Stopping and storing the screen recording.
        track.stop();
    });
    audio.getTracks().forEach(function (track) {
        track.stop(); // Stopping and storing the audio recording.
    });
}

function onstop() {
    completeBlob = new Blob(chunks, {
        type: chunks[0].type
    });
    let downloadButton = document.getElementById('download');
    downloadButton.href = URL.createObjectURL(completeBlob);
    downloadButton.download = Date.now() + '.mp4';
}

