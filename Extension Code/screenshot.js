//this function is activated when screenshot button is clicked.
async function TakeScreenShot(){    
    scShot = await navigator.mediaDevices.getDisplayMedia({ //this variable fetches the display media i.e. Display Screen 
        video: {
            mediaSource : 'screen'   //Recording screen through stream variable.
        },
    });
    shotStream = scShot.getVideoTracks()[0];  //recording the first element of the recording i.e. Image
    shotRecorder = new ImageCapture(shotStream);    // capturing the image in a variable
    shotMap = await shotRecorder.grabFrame();       // storing all the image data in a variable
    shotStream.stop();                             // stopping the recording as the work is done to grab an image

    
    // To display the picture to the user in the pdf , we have to draw the image(reason explained in PDFgen.js),
    // also we used canvas element as it only shows itself in the pdf
    //As we have to display a new image everytime when the Screenshot Button is clicked , we are adding a new canvas element.  
    shotCanvas = document.createElement('canvas');
    shotCanvas.width = 800;
    shotCanvas.height = 450;

    pageBody = document.getElementsByTagName("body")[0];
    pageBody.appendChild(shotCanvas);

    shotCanvasContext = shotCanvas.getContext('2d');
    shotCanvasContext.drawImage(shotMap , 0 , 0 ,800, 450 );
}
