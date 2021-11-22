let completeBlob = null //initialing a variable that would help in creation of URL
let recorder = null // initialising recorder variable
let chunks = []; // This variable would help in identifying the format of the video data
let stream = null // this variable is initialised for using screen recording
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
        recorder.ondataavailable = (e) => chunks.push(e.data); // storing the recording data in chunks variable
        recorder.start(); // Starting the screen and audio recording.
        recorder.onstop = onstop; // Forwarding to onstop function in case when recording is stopped.
    } catch (error) {
        window.alert(error) // Alerting the user of any errors.

    }
}
// This function is activated when stop recording button is clicked.
async function stopScreen() {
    recorder.stop() // Stopping the screen and audio recording.
    stream.getTracks().forEach(function (track) { 
        track.stop(); // Stopping the screen recording.
    });
    audio.getTracks().forEach(function (track) {
        track.stop(); // Stopping the audio recording.
    });
}

function onstop() {
    completeBlob = new Blob(chunks, { // Creating the address for URL creation.
        type: chunks[0].type // marking the type of file as the same as the type of chunks variable
    });
    chunks = []; // by emptying chunks, we can now download different recorded videos multiple times
                // as without this, it used to download only the first session recorded even after recording multiple times 
    let downloadButton = document.getElementById('download'); // Fetching download button from index.html.
    downloadButton.href = URL.createObjectURL(completeBlob); // Creating the URl.
    downloadButton.download = Date.now() + '.mp4'; // Naming the video file.
}

