//this function is activated when screenshot button is clicked.
async function TakeScreenShot(){    
    scShot = await navigator.mediaDevices.getDisplayMedia({ //this variable fetches the display media i.e. Display Screen 
        video: {
            mediaSource : 'screen'
        },
    });
    shotStream = scShot.getVideoTracks()[0];
    shotRecorder = new ImageCapture(shotStream);
    shotMap = await shotRecorder.grabFrame();
    shotStream.stop();

    shotCanvas = document.createElement('canvas');
    shotCanvas.width = 800;
    shotCanvas.height = 450;

    pageBody = document.getElementsByTagName("body")[0];
    pageBody.appendChild(shotCanvas);

    shotCanvasContext = shotCanvas.getContext('2d');
    shotCanvasContext.drawImage(shotMap , 0 , 0 ,800, 450 );
}
