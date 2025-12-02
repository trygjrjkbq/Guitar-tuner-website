////////////////////////////////////////////////////////////////////
//////////////Language control//////////////////////////////////////
////////////////////////////////////////////////////////////////////

var langSwitch = false;

var langimg = document.createElement("langimg");
var src = document.getElementById("lang");

function langSwitchBool() {
if (langSwitch)
{
englishSwitch();
langSwitch = false;
document.getElementById("langIcon").src="images/LanguagePolish.jpg";
}
else
{
polishSwitch();
langSwitch = true;
document.getElementById("langIcon").src="images/LanguageEnglish.jpg";
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
}

if (document.getElementById("info") != null)
{
    document.getElementById("info").textContent="Welocme to our guitar tuner project, the website is currenlty still in development, but most parts are already functional.\r\n";
    document.getElementById("info").textContent+="We will gladly accept any and all feedback :)";
}

if (document.getElementById("Nav1") != null)
{
    document.getElementById("Nav1").textContent="Home page";
}
if (document.getElementById("Nav2") != null)
{
    document.getElementById("Nav2").textContent="PZE page";
}
if (document.getElementById("Nav3") != null)
{
    document.getElementById("Nav3").textContent="Used components";
}
if (document.getElementById("Nav4") != null)
{
    document.getElementById("Nav4").textContent="Tutorials";
}
if (document.getElementById("Nav5") != null)
{
    document.getElementById("Nav5").textContent="Contact us";
}

///////////////////////Tuner labels/////////////////////////

if (document.getElementById("soundtest") != null)
{
    document.getElementById("soundtest").textContent="Play sound";
}

if (document.getElementById("sampleBufferButton") != null)
{
    document.getElementById("sampleBufferButton").textContent="Set sample buffer size";
}

if (document.getElementById("sliderLabel") != null)
{
    document.getElementById("sliderLabel").textContent="Value: ";
}

if (document.getElementById("noteClosestNote") != null)
{
    document.getElementById("noteClosestNote").textContent="Closest guitar note: ";
}

if (document.getElementById("noteOffsetCentLabel") != null)
{
    document.getElementById("noteOffsetCentLabel").textContent="Offset: ";
}

if (document.getElementById("noteOffsetLabel") != null)
{
    document.getElementById("noteOffsetLabel").textContent="Offset from note by: ";
}

/////////////////////////////////Components//////////////////////////////////////

if (document.getElementById("compHeader") != null)
{
    document.getElementById("compHeader").textContent="Użyte podzespoły";
}

if (document.getElementById("nameComponent1") != null)
{
    document.getElementById("nameComponent1").textContent="Microcontroler ESP32";
}

if (document.getElementById("infoComponent1") != null)
{
    document.getElementById("infoComponent1").textContent="The ESP-WROOM-32 microcontroller controls the entire behavior of our tuner. It receives the signal from the microphone, calculates the correct frequency, and sends the information to the display. It also includes WiFi and Bluetooth modules as well as 30 GPIO pins, which makes it easier to connect other components.";
}

if (document.getElementById("nameComponent2") != null)
{
    document.getElementById("nameComponent2").textContent="Display TFT LCD ST7735";
}

if (document.getElementById("infoComponent2") != null)
{
    document.getElementById("infoComponent2").textContent="The ST7735 display is 1.8 inches in size and has a resolution of 128×160 pixels. It can show different colors and shapes in a very readable and attractive way. The display requires a 3.3 V power supply, which is perfect for our microcontroller.";
}

if (document.getElementById("nameComponent3") != null)
{
    document.getElementById("nameComponent3").textContent="Microphone MAX4466";
}

if (document.getElementById("infoComponent3") != null)
{
    document.getElementById("infoComponent3").textContent="Our microphone requires a supply voltage between 2.4 V and 5.5 V, which is suitable because the ESP provides 3.3 V to the MAX4466. The microphone amplifier has a Power Supply Rejection Ratio of 112 dB, meaning the signal experiences less distortion from power supply better.";
}


}

////////////////////////////////////////////////////////////////////
//////////////Text blocks in polish/////////////////////////////////
////////////////////////////////////////////////////////////////////

function polishSwitch(){
///////////////////////Info and description/////////////////////////

if (document.getElementById("welcomeHeader") != null)
{
    document.getElementById("welcomeHeader").textContent="Witamy na stronie tunera do gitary, stworzoną przez Filipa Dudę oraz Jakuba Garusa";
}

if (document.getElementById("info") != null)
{
    document.getElementById("info").textContent="Witamy na stronie naszego projektu stroika do gitary. W stanie dzisiejszym prace nad nią jeszcze trwają, jednak większość zawartości jest funkcjonalna\r\n";
    document.getElementById("info").textContent+="Bylibyśmy wdzięczni za jakiekolwiek wiadomości zwrotne :)";
}

if (document.getElementById("Nav1") != null)
{
    document.getElementById("Nav1").textContent="Strona główna";
}
if (document.getElementById("Nav2") != null)
{
    document.getElementById("Nav2").textContent="Strona platformy";
}
if (document.getElementById("Nav3") != null)
{
    document.getElementById("Nav3").textContent="Użyte komponenty";
}
if (document.getElementById("Nav4") != null)
{
    document.getElementById("Nav4").textContent="Tutoriale";
}
if (document.getElementById("Nav5") != null)
{
    document.getElementById("Nav5").textContent="Kontakt";
}

///////////////////////Tuner labels/////////////////////////

if (document.getElementById("soundtest") != null)
{
    document.getElementById("soundtest").textContent="Odtwórz dźwięk";
}

if (document.getElementById("sampleBufferButton") != null)
{
    document.getElementById("sampleBufferButton").textContent="Wybierz wielkość bufora próbek";
}

if (document.getElementById("sliderLabel") != null)
{
    document.getElementById("sliderLabel").textContent="Wartość: ";
}

if (document.getElementById("noteClosestNote") != null)
{
    document.getElementById("noteClosestNote").textContent="Najbliższa nuta gitary: ";
}

if (document.getElementById("noteOffsetCentLabel") != null)
{
    document.getElementById("noteOffsetCentLabel").textContent="Odchyłka: ";
}

if (document.getElementById("noteOffsetLabel") != null)
{
    document.getElementById("noteOffsetLabel").textContent="Oddalona od nuty o: ";
}

////////////////////////////Components///////////////////////////

if (document.getElementById("compHeader") != null)
{
    document.getElementById("compHeader").textContent="Components of our tuner";
}

if (document.getElementById("nameComponent1") != null)
{
    document.getElementById("nameComponent1").textContent="Mikrokontroler ESP32";
}

if (document.getElementById("infoComponent1") != null)
{
    document.getElementById("infoComponent1").textContent="Mikrokontroler ESP-WROOM-32 jest sercem naszego fizycznego tunera. Odbiera on sygnał z mikrofonu, przeprowadza niezbędne obliczenia a później przesyła je do wyświetlacza. Zawarte w nim są również moduły WiFi, Bluetooth oraz 30 pinów GPIO, które znacznie ułatwiają przekazywanie danych między częściami";
}

if (document.getElementById("nameComponent2") != null)
{
    document.getElementById("nameComponent2").textContent="Wyświetlacz TFT LCD ST7735";
}

if (document.getElementById("infoComponent2") != null)
{
    document.getElementById("infoComponent2").textContent="Wyświetlacz ciekłokryształowy ST7735 ma 1.8 cala oraz rozdzielczość 128x160 pikseli. Pozwala na wyświetlanie różnych kształtów oraz kolorów, co pozwala na przekazanie danych w czytelny sposób. Wyświetlacz zasilany jest napięciem 3.3 V, co wpasowuje się perfekcyjnie w zasilanie naszego mikrokontrolera.";
}

if (document.getElementById("nameComponent3") != null)
{
    document.getElementById("nameComponent3").textContent="Mikrofon MAX4466";
}

if (document.getElementById("infoComponent3") != null)
{
    document.getElementById("infoComponent3").textContent="Mikrofon naszego wyboru zasilany jest napięciami między 2.4 V a 5.5 V, co pozwala na zasilenie przez 3.3 V od mikrokontrolera. Wzmacniacz mikrofonu posiada współczynnik odrzucenia wpływu zasilania równy 112 dB, co oznacza, że MAX4466 jest mało podatny na zakłócenia sygnału.";
}

}