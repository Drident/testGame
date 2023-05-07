let myAudio = new Audio();

function functionplayAudio() {
    //alert('The audio will start playing now.')
    myAudio.src = './music/song1.mp3';
    myAudio.autoplay = true;
    myAudio.loop = true;
}
