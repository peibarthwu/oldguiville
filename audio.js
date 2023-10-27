let beepPlayer, sirensPlayer, naturePlayer, constructionPanner, clubPlayer, constructionPlayer, streetPanner, reverb, vol;
function setupAudio() {

    constructionPanner = new Tone.Panner(-1);
    constructionPlayer = new Tone.Player({
        url: `img/audio/construction.flac`,
        loop: true
    }).sync();
    constructionPlayer.chain(constructionPanner, Tone.Destination);
    constructionPlayer.volume.value = -25;
    constructionPlayer.loop=true;
    constructionPlayer.fadeOut = 0.5;


    clubPlayer = new Tone.Player({
        url: `img/audio/ambience.m4a`, // https://freesound.org/people/Robinhood76/sounds/383022/
        loop: true
    }).sync().start(0);
    clubPlayer.volume.value = -20;
    clubPlayer.chain(Tone.Destination);

    streetPlayer = new Tone.Player({
        url: `img/audio/street.wav`, // https://freesound.org/people/Robinhood76/sounds/383022/
        loop: true
    }).sync().start(0);
    streetPlayer.volume.value = -10;
    streetPlayer.chain(Tone.Destination);

    sirensPlayer = new Tone.Player({
        url: `img/audio/sirens.wav`,
        loop: true
    }).sync().start(0);
    sirensPlayer.volume.value = -25;
    sirensPlayer.chain(Tone.Destination);

    naturePlayer = new Tone.Player({
        url: `img/audio/nature.wav`, //from: https://freesound.org/people/InspectorJ/sounds/339326/
        loop: true
    }).sync().start(0);
    naturePlayer.volume.value = -Infinity;
    naturePlayer.fadeOut = 0.5;
    naturePlayer.chain(Tone.Destination);
}

function playConstruction(pos) {
    constructionPlayer.start();
    //pan based on location
    let value = -Math.cos(Math.PI*(pos / screen.width)); //THIS IS THE CORRENT LEFT RIGHT PANNING EQ
    constructionPanner.pan.rampTo(value, 0.5);
}

function stopConstructionNoise(){
    constructionPlayer.stop();
}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    console.log("screen width: " + window.innerWidth)
    if(window.innerWidth>2700){
        naturePlayer.volume.rampTo(10, 1);
        sirensPlayer.volume.rampTo(-60, 1);
        clubPlayer.volume.rampTo(-60, 1);
        streetPlayer.volume.rampTo(-60, 1);
    }
    else if(window.innerWidth<2100){
        naturePlayer.volume.rampTo(-Infinity, 1);
        sirensPlayer.volume.rampTo(-25, 1);
        clubPlayer.volume.rampTo(-20, 1);
        streetPlayer.volume.rampTo(-10, 1);
    }
}

function loadCheck(){
    return(constructionPlayer.loaded && naturePlayer.loaded && clubPlayer.loaded && sirensPlayer.loaded && streetPlayer.loaded);
}
