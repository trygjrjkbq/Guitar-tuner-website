////////////////////////////////////////////////////////////////////
//////////////Text blocks in polish/////////////////////////////////
////////////////////////////////////////////////////////////////////

function polishSwitch(){
///////////////////////Info and description/////////////////////////

if (document.getElementById("welcomeHeader") != null)
{
    document.getElementById("welcomeHeader").textContent="Witamy na stronie tunera do gitary, stworzoną przez Filipa Dudę oraz Jakuba Garusa";

    document.getElementById("info").textContent="Witamy na stronie naszego projektu stroika do gitary. W stanie dzisiejszym prace nad nią jeszcze trwają, jednak większość zawartości jest funkcjonalna\r\n";
    document.getElementById("info").textContent+="Bylibyśmy wdzięczni za jakiekolwiek wiadomości zwrotne :)";

    document.getElementById("Nav1").textContent="Strona główna";

    document.getElementById("Nav2").textContent="Strona platformy";

    document.getElementById("Nav3").textContent="Użyte komponenty";

    document.getElementById("Nav4").textContent="Tutoriale";

    document.getElementById("Nav5").textContent="Kontakt";

///////////////////////Tuner labels/////////////////////////

    document.getElementById("soundtest").textContent="Odtwórz dźwięk";

    document.getElementById("sampleBufferButton").textContent="Wybierz wielkość bufora próbek";

    document.getElementById("sliderLabel").textContent="Wartość: ";

    document.getElementById("noteClosestNote").textContent="Najbliższa nuta gitary: ";

    document.getElementById("noteOffsetCentLabel").textContent="Odchyłka: ";

    document.getElementById("noteOffsetLabel").textContent="Oddalona od nuty o: ";
}

////////////////////////////Components///////////////////////////

if (document.getElementById("compHeader") != null)
{
    document.getElementById("compHeader").textContent="Components of our tuner";

    document.getElementById("nameComponent1").textContent="Mikrokontroler ESP32";

    document.getElementById("infoComponent1").textContent="Mikrokontroler ESP-WROOM-32 jest sercem naszego fizycznego tunera. Odbiera on sygnał z mikrofonu, przeprowadza niezbędne obliczenia a później przesyła je do wyświetlacza. Zawarte w nim są również moduły WiFi, Bluetooth oraz 30 pinów GPIO, które znacznie ułatwiają przekazywanie danych między częściami";

    document.getElementById("nameComponent2").textContent="Wyświetlacz TFT LCD ST7735";

    document.getElementById("infoComponent2").textContent="Wyświetlacz ciekłokryształowy ST7735 ma 1.8 cala oraz rozdzielczość 128x160 pikseli. Pozwala na wyświetlanie różnych kształtów oraz kolorów, co pozwala na przekazanie danych w czytelny sposób. Wyświetlacz zasilany jest napięciem 3.3 V, co wpasowuje się perfekcyjnie w zasilanie naszego mikrokontrolera.";

    document.getElementById("nameComponent3").textContent="Mikrofon MAX4466";

    document.getElementById("infoComponent3").textContent="Mikrofon naszego wyboru zasilany jest napięciami między 2.4 V a 5.5 V, co pozwala na zasilenie przez 3.3 V od mikrokontrolera. Wzmacniacz mikrofonu posiada współczynnik odrzucenia wpływu zasilania równy 112 dB, co oznacza, że MAX4466 jest mało podatny na zakłócenia sygnału.";
}
}