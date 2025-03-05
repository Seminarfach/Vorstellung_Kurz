const display = document.getElementById("TimerText"); // belegt display mit dem Timer_Element

let Zeit = null; // Variable timer ist null

let startZeit = 0; // Variable startZeit ist null

let verstricheneZeit = 0; // Variable verstricheneZeit ist null

let istamLaufen = false; // Variable istamLaufen ist falsch

let benötigteZeit = 0; // Variable benötigteZeit ist null

let insgesamteZeit =0;

function startTimer(){ // definiert Funktion startTimer

    if(!istamLaufen){ //Code wird nur ausgeführt, wenn istamLaufen war ist
        startZeit = Date.now() - verstricheneZeit; // errechnet start Time aus jetzigen Datum minus verstrichener Zeit
        Zeit = setInterval(updateTimer, 10); // die Funktion updateTimer wird alle 10 Millisekunden aufgerufen
        istamLaufen = true; // Variable istamLaufen wird auf war gesetzt
    }
} 

function stopTimer(){ // Funktion stopTimer wird definiert

    if(istamLaufen){ // Code wird nur ausgeführt, wenn istamLaufen falsch ist
       clearInterval(Zeit); // das Interval von Zeit wird gestoppt
       verstricheneZeit = Date.now() - startZeit; // die verstrichene Zeit wird nochmals berechnet
       benötigteZeit = Math.floor(verstricheneZeit / 1000) // benötigteZeit ist verstricheneZeit in Sekunden umgewandelt
       istamLaufen = false; // Variable istamLaufen wird auf falsch gesetzt
       console.log(benötigteZeit)
    }
}

function resetTimer(){ 
    clearInterval(Zeit);
    startZeit = 0;
    verstricheneZeit = 0;
    istamLaufen = false;
    display.textContent = "00:00";
}

function updateTimer(){
    
    const momentaneZeit = Date.now();
    verstricheneZeit = momentaneZeit - startZeit;

    let minuten = Math.floor(verstricheneZeit / (1000 * 60) % 60);

    let sekunden = Math.floor(verstricheneZeit / 1000 % 60);

    insgesamteZeit = Math.floor(verstricheneZeit / 1000)

    //console.log(insgesamteZeit)

    minuten = String(minuten).padStart(2, "0");

    sekunden = String(sekunden).padStart(2, "0");

    

    

    display.textContent = `${minuten}:${sekunden}` ;

}
