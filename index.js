//Guitar note player
const enote = document.getElementById("enotecheck");
const anote = document.getElementById("anotecheck");
const bnote = document.getElementById("dnotecheck");
const gnote = document.getElementById("gnotecheck");
const dnote = document.getElementById("bnotecheck");
const ehighnote = document.getElementById("ehighnotecheck");

var audio1 = new Audio('notes/e2.mp3');
var audio2 = new Audio('notes/a2.mp3');
var audio3 = new Audio('notes/d3.mp3');
var audio4 = new Audio('notes/g3.mp3');
var audio5 = new Audio('notes/b3.mp3');
var audio6 = new Audio('notes/e4.mp3');

const playsound = document.getElementById("soundtest")

playsound.onclick = function() {

    if(enote.checked)
    {
        audio1.play();
    }
    else if(anote.checked)
    {
        audio2.play();
    }
    else if(dnote.checked)
    {
        audio3.play();
    }
    else if(gnote.checked)
    {
        audio4.play();
    }
    else if(bnote.checked)
    {
        audio5.play();
    }
    else if(ehighnote.checked)
    {
        audio6.play();
    }
    else
    {
        soundresponse.textContent = "No note selected";
    }
}
////////////////////////////////////////////////////////////////////



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
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var noteChart = [82.41, 110, 146.83, 196, 246.94, 329.63];
var noteChartString = ["E4", "B", "G", "D", "A", "E2"];
var bufSize = 2;
var Gnote = 0;
var detectorElem, 
	canvasElem,
	pitchElem,
	noteElem,
	detuneElem,
	noteMatch,
	noteOffsetVar,
	detuneAmount;

//Variables connected to the website
window.onload = function() {
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
}

// Updating size of buffer
    slider.oninput = function() {
	var sliderVal = slider.value - 1;
	bufSize = 1024*2**sliderVal;
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
function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
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
	console.log(noteTemp);
	return noteTemp;
}



function autoCorrelate( buf, sampleRate ) {
	var SIZE = buf.length;
	var MAX_SAMPLES = Math.floor(SIZE/2);
	var best_offset = -1;
	var best_correlation = 0;
	var rms = 0;
	var foundGoodCorrelation = false;
	var correlations = new Array(MAX_SAMPLES);

	//Computing whether sound is loud enough to be captured with minimal distortions
	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms<0.01) 
		return -1;


	var lastCorrelation=1;
	for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
		var correlation = 0;

		//Computing the frequency by comparing adjacents frames with each other
		//to find most accurate frequency of the sound
		for (var i=0; i<MAX_SAMPLES; i++) {
			correlation += Math.abs((buf[i])-(buf[i+offset]));
		}
		correlation = 1 - (correlation/MAX_SAMPLES);
		correlations[offset] = correlation;
		if ((correlation>0.9) && (correlation > lastCorrelation)) {
			foundGoodCorrelation = true;
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		//Once the region of good correlations end, we interpolate the frequency based on the best match found
		} else if (foundGoodCorrelation) {
			var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
			return sampleRate/(best_offset+(8*shift));
		}
		lastCorrelation = correlation;
	}
	//If no good correlation was found, we use the less accurate estimation
	if (best_correlation > 0.01) {
		return sampleRate/best_offset;
	}
	return -1;
}

// Updating all the html elements to display information
function updatePitch( time ) {
	var cycles = new Array;
	analyser.getFloatTimeDomainData( buf );
	var ac = autoCorrelate( buf, audioContext.sampleRate );

 	if (ac == -1) {
 		detectorElem.className = "vague";
	 	pitchElem.innerText = "--";
		noteElem.innerText = "-";
		detuneElem.className = "";
		detuneAmount.innerText = "--";
 	} else {
	 	detectorElem.className = "confident";
	 	pitch = ac;
	 	pitchElem.innerText = Math.round( pitch ) ;
	 	var note =  noteFromPitch( pitch );
		noteElem.innerHTML = noteStrings[note%12];
		var detune = centsOffFromPitch( pitch, note );
		if (detune == 0 ) {
			detuneElem.className = "";
			detuneAmount.innerHTML = "--";
		} else {
			if (detune < 0)
				detuneElem.className = "flat";
			else
				detuneElem.className = "sharp";
			detuneAmount.innerHTML = Math.abs( detune );
		}
		noteMatch.innerHTML = noteChartString[Gnote];
		var noteOffsetVar = guitarNoteSearch( pitch );
		noteOffset.innerHTML = Math.floor(noteOffsetVar);
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = window.webkitRequestAnimationFrame;
	rafID = window.requestAnimationFrame( updatePitch );
}
