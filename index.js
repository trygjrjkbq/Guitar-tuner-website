// Guitar note player
const enote = document.getElementById("enotecheck");
const anote = document.getElementById("anotecheck");
const dnote = document.getElementById("dnotecheck");
const gnote = document.getElementById("gnotecheck");
const bnote = document.getElementById("bnotecheck");
const ehighnote = document.getElementById("ehighnotecheck");

const playsound = document.getElementById("soundtest");
const soundresponse = document.getElementById("soundresponse");

const audio1 = new Audio('notes/e2.mp3');
const audio2 = new Audio('notes/a2.mp3');
const audio3 = new Audio('notes/d3.mp3');
const audio4 = new Audio('notes/g3.mp3');
const audio5 = new Audio('notes/b3.mp3');
const audio6 = new Audio('notes/e4.mp3');

playsound.onclick = function() {
    if(enote.checked) audio1.play();
    else if(anote.checked) audio2.play();
    else if(dnote.checked) audio3.play();
    else if(gnote.checked) audio4.play();
    else if(bnote.checked) audio5.play();
    else if(ehighnote.checked) audio6.play();
    else soundresponse.textContent = "No note selected";
}


////////////////////////////////////////////////////////////////////
//////////////////Pitch detector code below/////////////////////////
////////////////////////////////////////////////////////////////////

//Initialising variables
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
var isRecording = false;
var analyser = null;
var theBuffer = null;
var mediaStreamSource = null;
var rafID = null;
var buf = new Float32Array(4096);
var MIN_SAMPLES = 0;

const noteStrings = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var noteChart = [82.41, 110, 146.83, 196, 246.94, 329.63];
var noteChartString = ["E2", "A2", "D3", "G3", "B3", "E4"];
var Gnote = 0;
var bufSize = 2;
var detectorElem, 
	canvasElem,
	pitchElem,
	noteElem,
	detuneElem,
	noteMatch,
	detuneAmount;

const freqDisplay = document.getElementById('freqDisplay');
const colorBox = document.getElementById('colorBox');
const needle = document.getElementById('needle');

//Variables connected to the website
window.onload = function() {
    englishSwitch();
	audioContext = new AudioContext();
	detectorElem = document.getElementById( "detector" );
	canvasElem = document.getElementById( "output" );
	pitchElem = document.getElementById( "pitch" );
	noteElem = document.getElementById( "note" );
	detuneElem = document.getElementById( "detune" );
	detuneAmount = document.getElementById( "detune_amt" );
	slider = document.getElementById("slider");
    result = document.getElementById("sliderValue");
	noteMatch = document.getElementById("noteMatch");
    noteOffset = document.getElementById("noteOffset");
    createArcTicks(17, 15, -80, 80);
}

// Updating size of buffer
    slider.oninput = function() {
	var sliderVal = slider.value - 1;
	bufSize = 1024*2**sliderVal;
    if (result) result.innerHTML = bufSize;
}

function updateBufferSize(){
result.innerHTML = bufSize;
buf = new Float32Array(bufSize);
}


//Establishing connection with microphone
//Error popup
function error() {
    alert('Stream generation failed.');
}

//Aquiring information about user microphone
function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

//Establishing connection to user microphone and creating an analyser node
function gotStream(stream) {
    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(function(e){console.warn('resume failed', e); });
    }
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect( analyser );
    updatePitch();
}

//recording and analysing the audio input
function toggleLiveInput() {
getUserMedia({"audio": true}, gotStream);
}

//Computing notes and frequency
function noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440)/Math.log(2));
    return Math.round(noteNum) + 69;
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note))/Math.log(2));
}

function guitarNoteSearch( frequency ){
	var compareNote;
	var noteTemp;
	for (o=0;o<noteChart.length;o++)
	{
		noteTemp = frequency-noteChart[o];
		if(Math.abs(noteTemp) < compareNote || o == 0)
		{
			compareNote = Math.abs(noteTemp);
			Gnote = o;
		}
	}
	//console.log(noteTemp);
	return noteTemp;
}

function autoCorrelate(buf, sampleRate) {
    var correlateAvg = 0;
    var correlateTemp = 0;
    var correlateError = 0;
    // Taking an average to prevent jittery movement and instability 
    for (let u = 0; u<128; u++)
    {
        correlateTemp = autoCorrelateStep(buf, sampleRate);
        //console.log("ac start");
        if (correlateTemp==-1)
        {
            correlateError++;
           // console.log("correlate error");
            if(correlateError >= 6)
            {
                return -1;
            }
        }
        else
        {
            console.log("correlate calc");
            console.log(correlateAvg);
            correlateAvg = correlateAvg + correlateTemp;
        }
    }
        correlateAvg = correlateAvg/(128-correlateError);
        //console.log(correlateAvg);
        return correlateAvg;
}


function autoCorrelateStep(buf, sampleRate) {
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE/2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    const correlations = new Array(MAX_SAMPLES);

    //Computing whether sound is loud enough to be captured with minimal distortions
    for (let i=0;i<SIZE;i++) rms += buf[i]*buf[i];
    rms = Math.sqrt(rms/SIZE);
    if (rms<0.01) return -1;

    let lastCorrelation=1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;
        //Computing the frequency by comparing adjacents frames with each other
		//to find most accurate frequency of the sound
        for (let i=0; i<MAX_SAMPLES; i++)
            correlation += Math.abs(buf[i]-buf[i+offset]);
        correlation = 1 - (correlation/MAX_SAMPLES);
        correlations[offset] = correlation;
        if ((correlation>0.9) && (correlation>lastCorrelation)) {
            foundGoodCorrelation = true;
            if(correlation>best_correlation){
                best_correlation = correlation;
                best_offset = offset;
            }
        //Once the region of good correlations end, we interpolate the frequency based on the best match found
        } else if(foundGoodCorrelation){
            const shift = (correlations[best_offset+1]-correlations[best_offset-1])/correlations[best_offset];
            return sampleRate/(best_offset + (8*shift));
        }
        lastCorrelation = correlation;
    }
    if(best_correlation>0.01) return sampleRate/best_offset;
    return -1;
}

// Converting pitch to needle angle
function centsToAngle(cents){
    const maxCents = 50;
    const maxAngle = 80;
    const clamped = Math.max(-maxCents, Math.min(maxCents, cents));
    return (clamped/maxCents)*maxAngle;
}

function colorForCents(absCents){
    if(absCents<=5) return '#2aa552';
    if(absCents<=15) return '#e0a03a';
    return '#c84b4b';
}

// drawing dots
function createArcTicks(count=17, radius=15, startAngle=-80, endAngle=80){
    const meter = document.getElementById('meter');
    if(!meter) return;
    const existing = meter.querySelectorAll('.arc-tick');
    existing.forEach(e=>e.remove());
    for(let i=0;i<count;i++){
        const t = document.createElement('div');
        t.className = 'arc-tick';
        const frac = i/(count-1);
        const angle = startAngle + frac*(endAngle-startAngle);
        t.style.transform = `rotate(${angle}deg) translateY(-${radius}px)`;
        meter.appendChild(t);
    }
}


function updateArcTicks(detune, count=17, maxCents=50){
    const meter = document.getElementById('meter');
    if(!meter) return;
    const ticks = Array.from(meter.querySelectorAll('.arc-tick'));
    const centerIndex = Math.floor((ticks.length-1)/2);
    const absC = Math.min(Math.abs(detune), maxCents);
    const sideCount = Math.round((absC/maxCents)*centerIndex);
    ticks.forEach(t=>t.classList.remove('activeR','activeY','ok'));

    const mid = ticks[centerIndex];
    if(Math.abs(detune)<=4){ mid.classList.add('ok'); return; }

    const yellowNear = 3;
    if(detune>0){
        for(let i=1;i<=sideCount;i++){
            const t = ticks[centerIndex+i]; if(!t) continue;
            if(i<=yellowNear) t.classList.add('activeY'); else t.classList.add('activeR');
        }
    } else{
        for(let i=1;i<=sideCount;i++){
            const t = ticks[centerIndex-i]; if(!t) continue;
            if(i<=yellowNear) t.classList.add('activeY'); else t.classList.add('activeR');
        }
    }
}

// updating the detector elements on diplay
function updatePitch(){
    if(!analyser) return requestAnimationFrame(updatePitch);
    analyser.getFloatTimeDomainData(buf);
    const ac = autoCorrelate(buf, audioContext.sampleRate);

    if(ac==-1){
	 	if (pitchElem) pitchElem.innerText = "--";
		if (noteElem) noteElem.innerText = "-";
		if (detuneElem) detuneElem.className = "";
		if (detuneAmount) detuneAmount.innerText = "--";
        if (freqDisplay) freqDisplay.textContent='-- Hz';
        if (needle) needle.style.transform='rotate(0deg)';
        if (colorBox) colorBox.style.background='#888';
        updateArcTicks(0);

    } else{
        let pitch = ac;
        let note = noteFromPitch(pitch);
        let detune = centsOffFromPitch(pitch, note);

        if(freqDisplay) freqDisplay.textContent = pitch.toFixed(1)+' Hz';

        if(needle) needle.style.transform = `rotate(${centsToAngle(detune)}deg)`;
        if(colorBox) colorBox.style.background = colorForCents(Math.abs(detune));
        updateArcTicks(detune);
        
        if (detuneAmount) {
            if (detune === 0) {
                detuneAmount.innerHTML = "--";
            } else {
                detuneAmount.innerHTML = Math.abs(detune);
            }
        }

        if (detuneElem) {
            if (detune === 0) {
                detuneElem.className = "";
            } else {
                    if (detune < 0)
                    detuneElem.className = "flat";
                    else
                    detuneElem.className = "sharp";
            }
        }
        noteMatch.innerHTML = noteChartString[Gnote];
		var noteOffsetVar = guitarNoteSearch( pitch );
		noteOffset.innerHTML = Math.floor(noteOffsetVar);
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame( updatePitch );
}
