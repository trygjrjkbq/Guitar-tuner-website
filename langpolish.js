////////////////////////////////////////////////////////////////////
//////////////Text blocks in polish/////////////////////////////////
////////////////////////////////////////////////////////////////////

function polishSwitch(){
///////////////////////Info and description/////////////////////////

    document.getElementById("Nav1").textContent="Strona główna";

    document.getElementById("Nav2").textContent="Strona platformy";

    document.getElementById("Nav3").textContent="Użyte komponenty";

    document.getElementById("Nav4").textContent="Tutoriale";

    document.getElementById("Nav5").textContent="Kontakt";

    document.getElementById("authors").textContent="Autorzy: Filip Duda oraz Jakub Garus";

    document.getElementById("copyright").textContent="©2025 copyright reserved";

if (document.getElementById("welcomeHeader") != null)
{
    document.getElementById("welcomeHeader").textContent="Witamy na stronie tunera do gitary";

    document.getElementById("info").innerHTML="Witamy na stronie naszego projektu stroika do gitary. Mogą Państwo tutaj odtworzyć nuty gitary, by nastroić na słuch lub użyć mikrofonu by nagrać dźwięk swej gitary. Można użyć poniższych suwaków by dostosować tuner do swych potrzeb: <br> - wielkość bufora próbek definiuje rozmiar bufora transformaty Fouriera, gdzie wyższe wartości są bardziej dokładne dla wyższych częstotliwości, i vice versa. <br>- Rozmiar bufora uśredniającego zmienia ilość iteracji programu, które są później uśredniane, co powoduje bardziej stabilne wyniki, kosztem niedokładności.";

    if (document.getElementById("Logi") != null)
    {
        document.getElementById("Logi").textContent="Zaloguj się!";
    }

    if (document.getElementById("Logo") != null)
    {
        document.getElementById("Logo").textContent="Wyloguj się!";
    }

///////////////////////////////Comments/////////////////////////////

    document.getElementById("commentsComments").textContent="Komentarze";

    if(getCookie('loggedIn') == 'true')
    {
    document.getElementById("buttonCommentSubmit").textContent="Opublikuj komentarz";
    }
    else
    {
    document.getElementById("commentsLoginLink").textContent="Zaloguj się";

    document.getElementById("commentsLogin").textContent=" aby móc pisać komentarze.";
    }

///////////////////////Tuner labels///////////////////////////////////

    document.getElementById("soundtest").textContent="Odtwórz dźwięk";

    document.getElementById("sampleBufferButton").textContent="Wybierz wielkość bufora próbek";

    document.getElementById("bufferButton").textContent="Wybierz wielkość bufora uśredniającego";

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

//////////////////////////Tutorials////////////////////////////////

if (document.getElementById("tutorialHeader") != null)
{
    document.getElementById("tutorialHeader").textContent="Tutoriale";

    const tutorialButtons = document.getElementsByClassName("tutorialBtn");
for (let i = 0; i < tutorialButtons.length; i++) {
    tutorialButtons[i].textContent = "Zobacz";
}
}

if (document.getElementById("tutorialSongHeader") != null)
{
    document.getElementById("tutorialSongHeader").textContent="Tutoriale";

    document.getElementById("ogVideo").textContent="Oryginalna piosenka";

    document.getElementById("tutorialVideo").textContent="Film z tutorialem";
}

///////////////////////////Logging in/////////////////////////////////////

if (document.getElementById("loginHeader") != null)
{  
    document.getElementById("loginHeader").textContent="Zaloguj się!";

    document.getElementById("info").innerHTML="Tu mozesz stworzyć konto do tunera by pisać komentarze.<br>Jeśli masz już konto, zaloguj się, a zapisane ustawienia zostaną zastosowane.";

    document.getElementById("loginboxlogin").innerHTML="Zaloguj się!";

    document.getElementById("usernametxt").innerHTML="Nazwa użytkownika:";

    document.getElementById("passwordtxt").innerHTML="Hasło:";

    document.getElementById("registerbtn").innerHTML="Zarejestruj się";

    document.getElementById("loginbtn").innerHTML="Zaloguj się";
}
}