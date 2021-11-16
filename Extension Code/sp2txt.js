var speech = true;
                window.SpeechRecognition = window.SpeechRecognition
                                || window.webkitSpeechRecognition;
          
                const recognition = new SpeechRecognition();
                recognition.interimResults = true;
                const words = document.querySelector('.words');
                words.appendChild(b);
          
                recognition.addEventListener('result', e => {
                    const transcript = Array.from(e.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('')

                        document.getElementById("b").innerHTML = transcript;
                        console.log(transcript);
                });
                  
                if (speech == true) {
                    recognition.continuous = true
                    recognition.start();
                    recognition.addEventListener('end',recognition.continuous = true, recognition.start);
                }