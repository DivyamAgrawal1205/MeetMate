// This function is activated when Screenshot button is clicked.
async function TakeScreenShot(){    
    scShot = await navigator.mediaDevices.getDisplayMedia({ //This variable fetches the display media i.e. Display Screen.
        video: {
            mediaSource : 'screen'  //Recording screen through stream variable.
        },
    });
    shotStream = scShot.getVideoTracks()[0]; //recording the first element of the recording i.e. Image
    shotRecorder = new ImageCapture(shotStream); // capturing the image in a variable
    shotMap = await shotRecorder.grabFrame(); // storing all the image data in a variable
    shotStream.stop(); // stopping the recording as the work is done to grab an image

    // To display the picture to the user in the pdf , we have to draw the image(reason explained in PDFgen.js),
    // also we used canvas element as it only shows itself in the pdf
    //As we have to display a new image everytime when the Screenshot Button is clicked , we are adding a new canvas element.  
    shotCanvas = document.createElement('canvas');
    shotCanvas.width = 800; // this width coincedentially matches the width of the pdf so we used it!
    shotCanvas.height = 450; // also , to maintain general 16:9 ratio of screen for optimal screen shot , we used this value.

    //To display Date and Time
    shotTime = document.createElement('p');

     // paragraph tag was the simplest element where we could have inserted the canvas
     // we fetched the paragraph by its tag and not by its id as fetching by id just don't work
     //so we fetched the paragraph tag using its tag name , which had the id "screenshotArea"
    paraBody = document.getElementsByTagName("p")[0];
    paraBody.appendChild(shotTime);
    paraBody.appendChild(shotCanvas);//inserting (or appending) the canvas in paragraph (id : screenshotArea)

    let currentDate = new Date(); // acessing the whole date
    let currentDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear(); // creating a string in Indian Date Format
    let dateTimeString = currentDateString + ',' + currentDate.getHours()  + "-"+  currentDate.getMinutes() + '-' + currentDate.getSeconds(); // creating final date string adding time
    
    shotTime.innerHTML = dateTimeString;

    shotCanvasContext = shotCanvas.getContext('2d'); // accessing the canvas element's context
    shotCanvasContext.drawImage(shotMap , 0 , 0 ,800, 450 ); // drawing the image with the same dimensions of the canvas tag to cover the whole image
}