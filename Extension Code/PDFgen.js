function goPDF (){ // This function gets activated  when we click Download button calls html2pdf API and saves the contents of the element of id = "topdf"
    html2pdf()
    .from(document.getElementById("topdf"))
    .save();
    }