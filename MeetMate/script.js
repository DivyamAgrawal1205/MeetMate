const recordButton = document.getElementById('record'); // using Record Button from index.html 
const stopButton = document.getElementById('stop'); // using Stop Recording Button from index.html 
const speech_nt_clkbt = document.getElementById('speech_nt_clk'); // using Speech to Text Off Button from index.html 
const speech_clkbt = document.getElementById('speech_clk'); // using Speech to Text On Button from index.html 
const video_dwn = document.getElementById('dwn_vid_btn'); // using Download Button from index.html 

recordButton.addEventListener('click', function() { // This function gets activated when Record Button is clicked
    recordButton.style.display = 'none'; // hiding the Record Button to show Stop Recording Button in place of it
    // configuring the Stop Recording Button to dispaly itself
    stopButton.style.cssText = `  
    display: inline-block;
    cursor: pointer;`
})

stopButton.addEventListener('click', function() { // This function gets activated when Stop Recording Button is clicked
    recordButton.style.display = 'inline-block';  // activating the Record Button again
    video_dwn.disabled = false; // activating the Download Button
    //hiding the Stop Recording Button
    stopButton.style.cssText = `
    display: none;`
})

speech_nt_clkbt.addEventListener('click', function() { // This function gets activated when Speech to Text Off Button is clicked
    speech_nt_clkbt.style.display = 'none'; // hiding the Speech to Text Off Button 
    speech_clkbt.style.display = 'inline-block'; // Showing the Speech to Text On Button
})

speech_clkbt.addEventListener('click', function() { // This function gets activated when Speech to Text On Button is clicked
    speech_clkbt.style.display = 'none'; // hiding the Speech to Text On Button
    speech_nt_clkbt.style.display = 'inline-block'; // Showining the Speech to Text Off Button
})
