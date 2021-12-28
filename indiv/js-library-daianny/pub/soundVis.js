
(function(global, document) { 
    
    function ShapeGenerator(){
    this.AudioInfo = []
    this.nextId = 0
    this.numAudio = 0
    }

    ShapeGenerator.prototype = {
        makeShape: function( audioPath, blockId, audioName ){
            var soundVisElement = {
                audioPath: audioPath,
                div: NaN,
                controlDiv: NaN,
                canvasDiv: NaN,
                headderDiv: NaN,
                infoDiv: NaN,
                size: 0,
                theme: 'yellow',
                audioCtx: NaN,
                requestId: -1,
                id: this.nextId,
                background_color: "rgb(250,235,215)",
                colors: ["rgb(240, 200, 150)", "rgb(240, 200, 125)", "rgb(240, 200, 100)", "rgb(240, 200, 75)"],
                curr_color: 0
            }

            this.numAudio = this.numAudio + 1
            this.nextId = this.nextId + 1
            this.AudioInfo.push(soundVisElement)

            var wholeDiv = document.createElement('div');
            wholeDiv.id = 'vis_div_' + soundVisElement.id;

            // create and add the header element
            var headderElementDiv = document.createElement('div');
            var headderElement = document.createElement('p');
            var informationElement = document.createElement('p');
            var informationElementDisplay = document.createElement('p');

            headderElementDiv.style.height = "50px"
            headderElementDiv.style.width = "500px"
            headderElementDiv.style["background-color"] = "#FFF9EA"
            headderElement.innerHTML = audioName
            headderElement.className = `headder`
            informationElement.innerHTML = `i`
            informationElement.className = `info_icon`
            informationElement.addEventListener('mouseover', setInfoVisibility)
            informationElement.addEventListener('mouseout', setInfoVisibility)
            informationElementDisplay.className = `info_display`
            informationElementDisplay.innerHTML = `Title: ${audioName}`
            informationElementDisplay.style.visibility = "hidden"

            headderElementDiv.appendChild(headderElement)
            headderElementDiv.appendChild(informationElement)
            wholeDiv.appendChild(informationElementDisplay)
            wholeDiv.appendChild(headderElementDiv);


            // create and add audio element
            var audioElementDiv = document.createElement('div');
            var audioElement = document.createElement('audio');
            audioElement.id       = 'audio-player_' + soundVisElement.id;
            audioElement.controls = 'controls';
            audioElement.src      = audioPath;
            audioElement.type     = 'audio/mpeg';
            audioElement.addEventListener('timeupdate', setAudioProgress)
            audioElement.addEventListener('ended', audioEnd)
            audioElement.addEventListener('canplay', setAudioDuration)
            //audioElement.crossorigin = 'anonymous';
            audioElementDiv.appendChild(audioElement);

            wholeDiv.appendChild(audioElementDiv);

            //create and add canvas element
            var canvasElementDiv = document.createElement('div');
            var canvasElement = document.createElement('canvas');
            canvasElement.id = 'canvas-element_' + soundVisElement.id;
            canvasElement.height = '250';
            canvasElement.width = '500';
            canvasElement.addEventListener("click", changeShapeState)
            canvasElement.addEventListener("mousemove",drawMouse);
            canvasElementDiv.appendChild(canvasElement);
            wholeDiv.appendChild(canvasElementDiv);

            // initialize the control element div
            var controlElementDiv = document.createElement('div');
            //var pp_button = document.createElement('button');
            var pp_button_img = document.createElement('img');
            var seekbar = document.createElement('input');
            var timer = document.createElement('p')
            var sound_img = document.createElement('img');
            var volume = document.createElement('input');
            var volume_num = document.createElement('p')

            
            controlElementDiv.className =`control`
            controlElementDiv.id =`control_${soundVisElement.id}`
            //pp_button.className = `play_pause`
            //pp_button.id = `play-pause_${soundVisElement.id}`
            pp_button_img.src = "play.png"
            pp_button_img.id = `pp_icons_${soundVisElement.id}`
            pp_button_img.className = `play_pause`
            seekbar.type = "range"
            seekbar.className = "seekbar_yellow"
            seekbar.id=`seekbar_${soundVisElement.id}`
            timer.className = `seekbar_timer`
            timer.innerHTML = `0/0`
            sound_img.src = "audio.png"
            sound_img.id = `sound_icons_${soundVisElement.id}`
            volume.type = "range"
            volume.className = `volume_yellow`
            volume.id=`seekbar_${soundVisElement.id}`
            volume_num.innerHTML = `100`
            volume_num.className = `volume_num`
            
            pp_button_img.addEventListener("click", clickPlayPause)
            seekbar.addEventListener('input', onSeek)
            volume.addEventListener('input', onVolumeSeek)

        // pp_button.appendChild(pp_button_img)
            controlElementDiv.appendChild(pp_button_img)
            controlElementDiv.appendChild(seekbar)
            controlElementDiv.appendChild(timer)
            controlElementDiv.appendChild(sound_img)
            controlElementDiv.appendChild(volume)
            controlElementDiv.appendChild(volume_num)

            wholeDiv.appendChild(controlElementDiv);

            document.getElementById(blockId).appendChild(wholeDiv);

            // save what is needed to sound visualizer element block
            soundVisElement.div = wholeDiv
            soundVisElement.controlDiv = controlElementDiv
            soundVisElement.canvasDiv = canvasElement
            soundVisElement.headderDiv = headderElementDiv
            soundVisElement.infoDiv = informationElementDisplay

            //create convasCTX
            const canvasCtx = canvasElement.getContext('2d');

            var WIDTH = canvasElement.clientWidth;
            var HEIGHT = canvasElement.clientHeight;

            //control the audio state and the bars
            seekbar.value = 0
            volume.value = 100
            let audioState = {
                isReplay: false,
                isPaused: true
            }

            // create the audio ctx 
            // external library used    
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            soundVisElement.audioCtx = audioCtx

            const source = audioCtx.createMediaElementSource(audioElement);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;

            
            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            var mouseX = -1
            var mouseY = -1


            function draw(){
                WIDTH = canvasElement.clientWidth;
                HEIGHT = canvasElement.clientHeight;

                analyser.getByteFrequencyData(dataArray);
                canvasCtx.fillStyle = soundVisElement.background_color;
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                const barWidth = (WIDTH / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for(let i=0; i < bufferLength; i++){
                    barHeight = dataArray[i];
                    canvasCtx.fillStyle = soundVisElement.colors[soundVisElement.curr_color];
                    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                    
                    x += barWidth + 1;
                }

                if(5 <= mouseX & mouseX <= WIDTH - 5 & 5 <= mouseY & mouseY <= HEIGHT - 5 ){
                    gradient = canvasCtx.createRadialGradient(mouseX,mouseY,10, mouseX,mouseY,25);
                    gradient.addColorStop(0,  soundVisElement.colors[soundVisElement.curr_color]);
                    gradient.addColorStop(1, 'transparent');
                    canvasCtx.arc(mouseX, mouseY, 10, 0, 2*Math.PI)
                    canvasCtx.fillStyle = gradient;
                    canvasCtx.fillRect(mouseX - 25, mouseY - 25, 50, 50);
                }
                
                soundVisElement.requestId = requestAnimationFrame(draw);
                
            }
            
            draw();

            function changeShapeState(){
                console.log("changeShapeState");
                soundVisElement.curr_color = (soundVisElement.curr_color + 1) % (soundVisElement.colors.length)
                console.log(soundVisElement.curr_color)
            }

            function drawMouse(event){
                console.log('drawMouse')   
                mouseX = event.clientX - canvasCtx.canvas.getBoundingClientRect().left
                mouseY = event.clientY - canvasCtx.canvas.getBoundingClientRect().top
            }

            function clickPlayPause( event ){
                console.log("clicked play pause")
                // external library used    
                audioCtx.resume().then(() => {
                    if(audioState.isPaused){
                        audioElement.play()
                        pp_button_img.src = "pause.png"
                    } else{
                        if(audioState.isReplay){
                            audioElement.play()
                            audioState.isReplay = false
                            pp_button_img.src = "pause.png"
                            return
                        }
                        audioElement.pause()
                        pp_button_img.src = "play.png"
                    }

                    audioState.isPaused = !audioState.isPaused

                })
            }

            
            audioElement.addEventListener('timeupdate', setAudioProgress)
            audioElement.addEventListener('ended', audioEnd)
            audioElement.addEventListener('canplay', setAudioDuration)

            function setAudioProgress(){
                seekbar.value = audioElement.currentTime;
                timer.innerHTML = `${parseInt(audioElement.currentTime)} / ${parseInt(audioElement.duration)}`
            }

            function setAudioDuration(){
                seekbar.max = audioElement.duration;
            }

            function audioEnd(){
                audioElement.currentTime = 0;
                seekbar.value = 0;
                audioState.isReplay = true;
                pp_button_img.src = "replay.png"
            }

            function onSeek(event){
                audioElement.currentTime = event.target.value;
            }
            
            function onVolumeSeek(event){
                console.log("changeVolume")
                audioElement.volume = event.target.value / 100;
                volume_num.innerHTML = `${event.target.value}`
            }

            function setInfoVisibility(event){
                console.log("set info vis")
                if (informationElementDisplay.style.visibility == "visible"){
                    informationElementDisplay.style.visibility = "hidden"
                }
                else{
                    informationElementDisplay.style.visibility = "visible"
                }
                
            }

            return soundVisElement.id
        },

        deleteShape: function( audioId ){
            if(this.numAudio <= 0){
                return
            }

            const visElement = this.AudioInfo.filter(x => x.id == audioId)[0]
            // external library used    
            visElement.audioCtx.close();
            cancelAnimationFrame(visElement.requestId)
            this.AudioInfo = this.AudioInfo.filter(x => x.id != visElement.id)

            visDiv = document.getElementById('vis_div_' + audioId)
            visDiv.parentElement.removeChild(visDiv)

            this.numAudio = this.numAudio - 1

        },

        changeSize: function( audioId, newSize ){
            const visElement = this.AudioInfo.filter(x => x.id == audioId)[0]
            if (newSize == 1) {
                visElement.size = 1
                visElement.controlDiv.style["height"]  = "45px"
                visElement.controlDiv.style["width"]  = "700px"
                visElement.controlDiv.childNodes[0].style["height"]  = "40px"
                visElement.controlDiv.childNodes[0].style["width"]  = "40px"
                visElement.controlDiv.childNodes[1].style["height"]  = "40px"
                visElement.controlDiv.childNodes[1].style["width"]  = "350px"
                visElement.controlDiv.childNodes[2].style["width"]  = "75px"
                visElement.controlDiv.childNodes[2].style["font-size"]  = "12px"
                visElement.controlDiv.childNodes[3].style["height"]  = "40px"
                visElement.controlDiv.childNodes[3].style["width"]  = "40px"
                visElement.controlDiv.childNodes[4].style["height"]  = "40px"
                visElement.controlDiv.childNodes[4].style["width"]  = "150px"
                visElement.controlDiv.childNodes[5].style["width"]  = "25px"
                visElement.controlDiv.childNodes[5].style["font-size"]  = "12px"

                visElement.headderDiv.style["width"] = "700px"
                visElement.headderDiv.childNodes[0].style["width"] = "600px"

                visElement.canvasDiv.width  = "700"
                visElement.canvasDiv.height  = "250"
                visElement.canvasDiv.clientWidth  = 700
                visElement.canvasDiv.clientHeight  = 250
            }
            else if (newSize == 2) {
                visElement.size = 2
                visElement.controlDiv.style["height"]  = "65px"
                visElement.controlDiv.style["width"]  = "1000px"
                visElement.controlDiv.childNodes[0].style["height"]  = "60px"
                visElement.controlDiv.childNodes[0].style["width"]  = "60px"
                visElement.controlDiv.childNodes[1].style["height"]  = "60px"
                visElement.controlDiv.childNodes[1].style["width"]  = "550px"
                visElement.controlDiv.childNodes[2].style["width"]  = "75px"
                visElement.controlDiv.childNodes[2].style["font-size"]  = "15px"
                visElement.controlDiv.childNodes[3].style["height"]  = "60px"
                visElement.controlDiv.childNodes[3].style["width"]  = "60px"
                visElement.controlDiv.childNodes[4].style["height"]  = "60px"
                visElement.controlDiv.childNodes[4].style["width"]  = "200px"
                visElement.controlDiv.childNodes[5].style["width"]  = "25px"
                visElement.controlDiv.childNodes[5].style["font-size"]  = "15px"

                visElement.headderDiv.style["width"] = "1000px"
                visElement.headderDiv.childNodes[0].style["width"] = "900px"

                visElement.canvasDiv.width  = "1000"
                visElement.canvasDiv.height  = "250"
                visElement.canvasDiv.clientWidth  = 1000
                visElement.canvasDiv.clientHeight  = 250
            }
            else {
                visElement.size = 0
                visElement.controlDiv.style["height"]  = "25px"
                visElement.controlDiv.style["width"]  = "500px"
                visElement.controlDiv.childNodes[0].style["height"]  = "20px"
                visElement.controlDiv.childNodes[0].style["width"]  = "20px"
                visElement.controlDiv.childNodes[1].style["height"]  = "20px"
                visElement.controlDiv.childNodes[1].style["width"]  = "250px"
                visElement.controlDiv.childNodes[2].style["width"]  = "75px"
                visElement.controlDiv.childNodes[2].style["font-size"]  = "10px"
                visElement.controlDiv.childNodes[3].style["height"]  = "20px"
                visElement.controlDiv.childNodes[3].style["width"]  = "20px"
                visElement.controlDiv.childNodes[4].style["height"]  = "20px"
                visElement.controlDiv.childNodes[4].style["width"]  = "100px"
                visElement.controlDiv.childNodes[5].style["width"]  = "25px"
                visElement.controlDiv.childNodes[5].style["font-size"]  = "10px"

                visElement.headderDiv.style["width"] = "500px"
                visElement.headderDiv.childNodes[0].style["width"] = "400px"

                visElement.canvasDiv.width  = "500"
                visElement.canvasDiv.height  = "250"
                visElement.canvasDiv.clientWidth  = 500
                visElement.canvasDiv.clientHeight  = 250
            }
        },

        changeTheme: function( audioId, newTheme ){
            console.log("change theme")
            var visElement = this.AudioInfo.filter(x => x.id == audioId)[0]
            if(newTheme == 'blue'){
                visElement.controlDiv.style["background-color"] = "black"
                visElement.controlDiv.childNodes[0].style["background-color"]  = "#5961B4"
                visElement.controlDiv.childNodes[0].style["border-radius"]  = "50%"
                visElement.controlDiv.childNodes[1].className = "seekbar_blue"
                visElement.controlDiv.childNodes[2].style["color"] = "white"
                visElement.controlDiv.childNodes[3].style["background-color"]  = "#5961B4"
                visElement.controlDiv.childNodes[3].style["border-radius"]  = "50%"
                visElement.controlDiv.childNodes[4].className = "volume_blue"
                visElement.controlDiv.childNodes[5].style["color"] = "white"

                visElement.headderDiv.style["background-color"] = "#5961B4"
                visElement.headderDiv.childNodes[0].style["color"] = "white"
                
                visElement.background_color= "rgb(0,0,0)",
                visElement.colors= ["rgb(86, 87, 105)", "rgb(73, 76, 111)", "rgb(89, 94, 143)", "rgb(82, 86, 124)"],
                visElement.curr_color= 0
            }
            else if(newTheme == 'pink'){
                visElement.controlDiv.style["background-color"] = "#FFC8F1"
                visElement.controlDiv.childNodes[0].style["background-color"]  = "#CA66B2"
                visElement.controlDiv.childNodes[0].style["border-radius"]  = "50%"
                visElement.controlDiv.childNodes[1].className = "seekbar_pink"
                visElement.controlDiv.childNodes[2].style["color"] = "#CA66B2"
                visElement.controlDiv.childNodes[3].style["background-color"]  = "#FFC8F1"
                visElement.controlDiv.childNodes[3].style["border-radius"]  = "50%"
                visElement.controlDiv.childNodes[4].className = "volume_pink"
                visElement.controlDiv.childNodes[5].style["color"] = "#CA66B2"

                visElement.headderDiv.style["background-color"] = "#FFC6F2"
                visElement.headderDiv.childNodes[0].style["color"] = "#AA5596"
                
                visElement.background_color= "rgb(255, 222, 247)",
                visElement.colors= ["rgb(234, 150, 212)", "rgb(234, 126, 206)", "rgb(239, 111, 206)", "rgb(231, 102, 198)"],
                visElement.curr_color= 0
            }
            else {
                visElement.controlDiv.style["background-color"] = "antiquewhite"
                visElement.controlDiv.childNodes[0].style["background-color"]  = "#EACD7F"
                visElement.controlDiv.childNodes[0].style["border-radius"]  = "0%"
                visElement.controlDiv.childNodes[1].className = "seekbar_yellow"
                visElement.controlDiv.childNodes[2].style["color"] = "#9B8C63"
                visElement.controlDiv.childNodes[3].style["background-color"]  = "antiquewhite"
                visElement.controlDiv.childNodes[3].style["border-radius"]  = "0%"
                visElement.controlDiv.childNodes[4].className = "volume_yellow"
                visElement.controlDiv.childNodes[5].style["color"] = "#9B8C63"

                visElement.headderDiv.style["background-color"] = "#FFF9EA"
                visElement.headderDiv.childNodes[0].style["color"] = "#9B8C63"

                
                visElement.background_color= "rgb(250,235,215)",
                visElement.colors= ["rgb(240, 200, 150)", "rgb(240, 200, 125)", "rgb(240, 200, 100)", "rgb(240, 200, 75)"],
                visElement.curr_color= 0
            }
        },

        addToInfo: function( audioId, content ){
            var visElement = this.AudioInfo.filter(x => x.id == audioId)[0]
            visElement.infoDiv.innerHTML = visElement.infoDiv.innerHTML + content
        },

        changeInfo: function( audioId, content ){
            var visElement = this.AudioInfo.filter(x => x.id == audioId)[0]
            visElement.infoDiv.innerHTML = content
        },

        getNumVis: function(){
            return this.numAudio;
        }
        
    }

    global.ShapeGenerator = global.ShapeGenerator || ShapeGenerator

})(window, window.document);