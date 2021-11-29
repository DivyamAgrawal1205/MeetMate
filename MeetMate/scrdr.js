let completeBlob = null; //initialing a variable that would help in creation of URL
let recorder = null; // initialising recorder variable
let chunks = []; // This variable would help in identifying the format of the video data
let stream = null; // this variable is initialised for using screen recording
let audio = null; // this variable is initialised for using audio recording

// This function is activated when record button is clicked.
async function startRecord() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({  //This variable fetches the display media i.e. Display Screen.
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
        mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);  //Intialising a variable that starts both screen recording and audio recording.
        recorder = new MediaRecorder(mixedStream); // Intialaising a variable to control the screen and audio recording.
        recorder.ondataavailable = (e) => chunks.push(e.data); // storing the recording data in chunks variable
        recorder.start(); // Starting the screen and audio recording.
        recorder.onstop = onstop; // Forwarding to onstop function in case when recording is stopped.
    } 
    catch (error) {
        const recordButton = document.getElementById('record'); // using Record Button from index.html 
        const stopButton = document.getElementById('stop'); // using Stop Recording Button from index.html 
        recordButton.style.display = 'inline-block';  // activating the Record Button again
        //hiding the Stop Recording Button
        stopButton.style.cssText = `
            display: none;` // in case of any error , reactivating the Record button Automatically
    }
}

// This function is activated when stop recording button is clicked.
async function stopScreen() {
    recorder.stop(); // Stopping the screen and audio recording.
    stream.getTracks().forEach(function (track) { 
        track.stop(); // Stopping the screen recording.
    });
    audio.getTracks().forEach(function (track) {
        track.stop(); // Stopping the audio recording.
    });
}

// coming to this function when recording is stopped
// this function mostly is used to download the video file
function onstop() {
    completeBlob = new Blob(chunks, { // Creating the address for URL creation.
        type: chunks[0].type // marking the type of file as the same as the type of chunks variable
    });
    // By emptying chunks, we can now download different recorded videos multiple times!
    // As without this, it used to download only the first session recorded even after recording multiple times 
    chunks = [];  
    let downloadButton = document.getElementById('download'); // Fetching download button from index.html.
    downloadButton.href = URL.createObjectURL(completeBlob); // Creating the URl.
    //to acess current date and time
    let currentDate = new Date(); // acessing the whole date
    let currentDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear(); // creating a string in Indian Date Format
    let dateTimeString = currentDateString + ',' + currentDate.getHours()  + "-"+  currentDate.getMinutes(); // creating final date string
    downloadButton.download = 'MeetMateVideo_' + dateTimeString + '.mp4'; // Naming the video file.
}

