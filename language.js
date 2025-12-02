////////////////////////////////////////////////////////////////////
//////////////Language control//////////////////////////////////////
////////////////////////////////////////////////////////////////////

var langSwitch = 0;

var langimg = document.createElement("langimg");
var src = document.getElementById("lang");

function langSwitchCheck() {
if (langSwitch == 0)
{
polishSwitch();
document.getElementById("langIcon").src="images/LanguagePolish.jpg";
langSwitch = 1;
}
else if(langSwitch == 1)
{
englishSwitch();
document.getElementById("langIcon").src="images/LanguageEnglish.jpg";
langSwitch = 0;
}
}

////////////////////////////////////////////////////////////////////
///////////////////////Text blocks in english///////////////////////
////////////////////////////////////////////////////////////////////

function englishSwitch(){
///////////////////////Info and description/////////////////////////

if (document.getElementById("welcomeHeader") != null)
{
    document.getElementById("welcomeHeader").textContent="Welcome to guitar tuner website by Filip Duda and Jakub Garus";

    document.getElementById("info").textContent="Welocme to our guitar tuner project, the website is currenlty still in development, but most parts are already functional.\r\n";
    document.getElementById("info").textContent+="We will gladly accept any and all feedback :)";

    document.getElementById("Nav1").textContent="Home page";

    document.getElementById("Nav2").textContent="PZE page";

    document.getElementById("Nav3").textContent="Used components";

    document.getElementById("Nav4").textContent="Tutorials";

    document.getElementById("Nav5").textContent="Contact us";

///////////////////////Tuner labels/////////////////////////

    document.getElementById("soundtest").textContent="Play sound";

    document.getElementById("sampleBufferButton").textContent="Set sample buffer size";

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


}

