/* 
This API is a combination of two different APIs , 
First one is html2canvas
  => This converts the web page to an image (probably stored in the canvas element , we dont know , guessed from the name)
Second one is jsPDF 
  => This converts that image to a PDF
so now its understood that whatever we want to show in the PDF, we have to show it on the HTML page itself
That's why we have to display the screenshots(we absolutely never wanted to increase the space of the page :( ) 
*/

function goPDF (){ // This function gets activated  when we click Download button calls html2pdf API and saves the contents of the element of id = "topdf"
    
    var pdf =html2pdf().from(document.getElementById("topdf")).save();
    return pdf;
    }