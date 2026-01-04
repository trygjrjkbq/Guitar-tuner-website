////////////////////////////////////////////////////////////////////
//////////////Language control//////////////////////////////////////
////////////////////////////////////////////////////////////////////

/*var langSwitch = 0;

var langimg = document.createElement("langimg");
var src = document.getElementById("lang");

function langSwitchCheck() {
if (langSwitch == 0)
{
polishSwitch();
document.getElementById("langIcon").src="images/LanguageEnglish.jpg";
langSwitch = 1;
}
else if(langSwitch == 1)
{
englishSwitch();
document.getElementById("langIcon").src="images/LanguagePolish.jpg";
langSwitch = 0;
}
}*/

/* helper: cookie get/set */
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + ";path=/";
}

function getCookie(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? decodeURIComponent(m.pop()) : null;
}

/* apply language based on cookie (call on load) */
function applyLanguageFromCookie() {
    var lang = getCookie('lang') || 'english';
    var icon = document.getElementById("langIcon");
    if (lang === 'polish') {
        if (typeof polishSwitch === 'function') polishSwitch();
        if (icon) icon.src = "images/LanguageEnglish.jpg";
    } else {
        if (typeof englishSwitch === 'function') englishSwitch();
        if (icon) icon.src = "images/LanguagePolish.jpg";
    }
}

/* replace toggle to use cookie */
function langSwitchCheck() {
    var current = getCookie('lang') || 'english';
    var icon = document.getElementById("langIcon");
    if (current === 'english') {
        setCookie('lang', 'polish', 365);
        if (typeof polishSwitch === 'function') polishSwitch();
        if (icon) icon.src = "images/LanguageEnglish.jpg";
    } 
    if(current === 'polish'){
        setCookie('lang', 'english', 365);
        if (typeof englishSwitch === 'function') englishSwitch();
        if (icon) icon.src = "images/LanguagePolish.jpg";
    }
}

// ensure language applied after DOM ready
document.addEventListener('DOMContentLoaded', applyLanguageFromCookie);

////////////////////////////////////////////////////////////////////
///////////////////////Text blocks in english///////////////////////
////////////////////////////////////////////////////////////////////

function englishSwitch(){
///////////////////////Info and description/////////////////////////

    document.getElementById("Nav1").textContent="Home page";

    document.getElementById("Nav2").textContent="PZE page";

    document.getElementById("Nav3").textContent="Used components";

    document.getElementById("Nav4").textContent="Tutorials";

    document.getElementById("Nav5").textContent="Contact us";

    document.getElementById("authors").textContent="Authors: Filip Duda and Jakub Garus";

    document.getElementById("copyright").textContent= "©2025 copyright reserved";

if (document.getElementById("welcomeHeader") != null)
{
    document.getElementById("welcomeHeader").textContent="Welcome to guitar tuner website";

    document.getElementById("info").innerHTML="Welcome to our guitar tuner website. Here You can play guitar notes to tune by ear, or use Your microphone to record Your guitar. Use the sliders below to adapt tuner to Your needs: <br> - sample buffer size determines the size of Fourier transform buffer, higher values are more accurate for high pitch sounds. <br>- averaging buffer size changes how many iterations of calculations are being averaged, resulting in more stable tuner results but may introduce inaccuracies.";


    if (document.getElementById("Logi") != null)
    {
        document.getElementById("Logi").textContent="Log in!";
    }

    if (document.getElementById("Logo") != null) 
    {
        document.getElementById("Logo").textContent="Log out!";
    }

///////////////////////////////Comments/////////////////////////////

    document.getElementById("commentsComments").textContent="Comments";

    if(getCookie('loggedIn') == 'true')
    {
    document.getElementById("buttonCommentSubmit").textContent="Submit comment";
    }
    else
    {
    document.getElementById("commentsLoginLink").textContent="Log in";

    document.getElementById("commentsLogin").textContent=" to write a comment.";
    }

///////////////////////Tuner labels/////////////////////////

    document.getElementById("soundtest").textContent="Play sound";

    document.getElementById("sampleBufferButton").textContent="Set sample buffer size";

    document.getElementById("bufferButton").textContent="Set averaging buffer size";

    document.getElementById("sliderLabel").textContent="Value: ";

    document.getElementById("noteClosestNote").textContent="Closest guitar note: ";

    document.getElementById("noteOffsetCentLabel").textContent="Offset: ";

    document.getElementById("noteOffsetLabel").textContent="Offset from note by: ";
}

/////////////////////////////////Components//////////////////////////////////////

if (document.getElementById("compHeader") != null)
{
    document.getElementById("nameComponent1").textContent="Microcontroler ESP32";

    document.getElementById("infoComponent1").textContent="The ESP-WROOM-32 microcontroller controls the entire behavior of our tuner. It receives the signal from the microphone, calculates the correct frequency, and sends the information to the display. It also includes WiFi and Bluetooth modules as well as 30 GPIO pins, which makes it easier to connect other components.";

    document.getElementById("nameComponent2").textContent="Display TFT LCD ST7735";

    document.getElementById("infoComponent2").textContent="The ST7735 display is 1.8 inches in size and has a resolution of 128×160 pixels. It can show different colors and shapes in a very readable and attractive way. The display requires a 3.3 V power supply, which is perfect for our microcontroller.";

    document.getElementById("nameComponent3").textContent="Microphone MAX4466";

    document.getElementById("infoComponent3").textContent="Our microphone requires a supply voltage between 2.4 V and 5.5 V, which is suitable because the ESP provides 3.3 V to the MAX4466. The microphone amplifier has a Power Supply Rejection Ratio of 112 dB, meaning the signal experiences less distortion from power supply better.";
}

//////////////////////////Tutorials////////////////////////////////

if (document.getElementById("tutorialHeader") != null)
{
    document.getElementById("tutorialHeader").textContent="Tutorials";

const tutorialButtons = document.getElementsByClassName("tutorialBtn");
for (let i = 0; i < tutorialButtons.length; i++) {
    tutorialButtons[i].textContent = "Learn";
}
}

if (document.getElementById("tutorialSongHeader") != null)
{
    document.getElementById("tutorialSongHeader").textContent="Tutorials";

    document.getElementById("ogVideo").textContent="Original video";

    document.getElementById("tutorialVideo").textContent="Tutorial video";
}

}

