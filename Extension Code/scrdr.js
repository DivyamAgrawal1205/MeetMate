let completeBlob = null
let recorder = null
let chunks = [];
let stream = null
async function startRecord() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen'
            },
        })
        audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44100,
			},
        });
        mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()])
        recorder = new MediaRecorder(mixedStream);
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.start();
        recorder.onstop = onstop;
    } catch (error) {
        window.alert(error)
    }
}

async function stopScreen() {
    recorder.stop()
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
    audio.getTracks().forEach(function (track) {
        track.stop();
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

