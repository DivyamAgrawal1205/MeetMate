/* 
This API is a combination of two different APIs , 
First one is html2canvas
  => This converts the web page to an image (probably stored in the canvas element , we dont know , guessed from the name)
Second one is jsPDF 
  => This converts that image to a PDF
so now its understood that whatever we want to show in the PDF, we have to show it on the HTML page itself
That's why we have to display the screenshots(we absolutely never wanted to increase the space of the page :( ) 
*/
//This function gets activated  when we click Download button and saves the contents of the element of id = "pdfDiv"
function goPDF (){ 
    //to access current date and time
    let currentDate = new Date(); // acessing the whole date
    let currentDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear(); // creating a string in Indian Date Format
    let dateTimeString = currentDateString + ',' + currentDate.getHours()  + "-"+  currentDate.getMinutes(); // creating final date string adding time
    var additionalConfig ={
        margin : 1,
        filename : 'MeetMatePDF_'+ dateTimeString + '.pdf'
      };
      var pdfDivision = document.getElementById("pdfDiv"); // accessing the division that contains both Text and Screenshots 
      var pdf =html2pdf().set(additionalConfig).from(pdfDivision).save(); // calling the html2pdf API 
      return pdf;  // returning the pdf variable and and saving the PDF file in the user's device.
    }