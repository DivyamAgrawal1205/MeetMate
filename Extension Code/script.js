const recordButton = document.getElementById('record');
//const pauseButton = document.getElementById('pause');
//const resbt = document.getElementById('res');
const stopButton = document.getElementById('stop');
const speech_nt_clkbt = document.getElementById('speech_nt_clk');
const speech_clkbt = document.getElementById('speech_clk');
const video_dwn = document.getElementById('dwn_vid_btn');


recordButton.addEventListener('click', function() {
    recordButton.style.display = 'none';
    // paubt.style.display = 'inline-block';
    stopButton.style.cssText = `
    display: inline-block;
    cursor: pointer;
    `

})

// paubt.addEventListener('click', function() {
//     paubt.style.display = 'none';
//     resbt.style.display = 'inline-block';
// })

// resbt.addEventListener('click', function() {
//     resbt.style.display = 'none';
//     paubt.style.display = 'inline-block';
// })

stopButton.addEventListener('click', function() {
    // resbt.style.display = 'none';
    // paubt.style.display = 'none';
    recordButton.style.display = 'inline-block';
    video_dwn.disabled = false;
    stopButton.style.cssText = `
    display: none;
    `
})

speech_nt_clk.addEventListener('click', function() {
    speech_nt_clkbt.style.display = 'none';
    speech_clkbt.style.display = 'inline-block';
})


speech_clk.addEventListener('click', function() {
    speech_clkbt.style.display = 'none';
    speech_nt_clkbt.style.display = 'inline-block';
})
