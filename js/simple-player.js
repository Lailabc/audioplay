const audio = new Audio();
const img = new Image ();
const button = document.getElementById("play-pause-button");
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
const showImg = document.getElementById("img-container");
let seeking = false;
const track1Button = document.getElementById("track1");
track1Button.onclick = function() {
    audio.src="audio/track1.webm"
};
const track2Button = document.getElementById("track2");
track2Button.onclick = function() {
    audio.src="audio/track2.webm"
};
const track3Button = document.getElementById("track3");
track3Button.onclick = function() {
    audio.src="audio/track3.webm"
};
/*trying to show image by clicking on the track button
const track1ButtonImg = document.getElementById("imgtrack1");
track1ButtonImg.onclick = function() {
    img.src="img/sunrise.gif"
};

const track2ButtonImg = document.getElementById("imgtrack2");
track2ButtonImg.onclick = function() {
    img.src="img/sunset.gif"
};

const track3ButtonImg = document.getElementById("imgtrack3");
track3ButtonImg.onclick = function() {
    img.src="img/twilight.gif"
};
showImg.onclick = function () {
    if(track1Button){
        track1ButtonImg
    } else {
       console.log("choose another track");
}*/

button.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};
audio.oncanplaythrough = () => {
    button.disabled = false;
    seekBar.disabled = false;
};
audio.onplay = function () {
    button.src = "images/pause.svg";
};
audio.onpause = function () {
    button.src = "images/play.svg";
};
audio.onended = function () {
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
};
audio.onloadedmetadata = function () {
    trackTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
};
audio.ontimeupdate = function (){
    trackTime.innerHTML = formatTime(audio.currentTime);
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime);
    }
};
seekBar.oninput = function () {
    seeking = true;
};
seekBar.onchange = function() {
    audio.currentTime = seekBar.value;
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
};

function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}

