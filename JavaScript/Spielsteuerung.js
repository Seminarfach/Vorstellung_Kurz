// import { levelManager } from "./EbenenModul.js";
import { levelManager } from "./EbenenModul.js";
console.log(levelManager); // Teste, ob es bereits existiert

import { riddleManager} from "./RätselManager.js";

let start = false 

let Handy = false 

export const SchwierigkeitsGrad = { riddle: "leicht" }

export function setSchwierigkeitsgrad (newriddle) {
    if(["leicht", "mittel", "schwer"].includes(newriddle)){
        SchwierigkeitsGrad.riddle = newriddle
    } else {
        console.error("Ungültiger Schwierigkeitsgrad:", newLevel);
    }
}



class GameController {
    constructor(levelManager, riddleManager) {
        this.levelManager = levelManager;
        this.riddleManager = riddleManager;
        this.state = "menu"; // Mögliche Zustände: 'menu', 'running', 'paused'
        this.StartbildschirmAnimationId = null; 
        this.HandyMode = false;
        this.startLevel = 'schulhof';
        this.Anleitung = false 
    }

    setupStartScreenButtons() {
        let isClicked = false 

        const guide = document.getElementById('guide');
        guide.innerHTML = '';

                    guide.style.width = `${canvas.width}px`;
                    guide.style.height = `${canvas.height}px`;
                    guide.style.overflowY = 'auto'
                    
                    guide.style.gridTemplateRows = "2"
                    guide.style.justifyContent = "center"
                    guide.style.backgroundColor = "grey"
                
                    const imgElement = document.createElement('img')
                    imgElement.src = './img/Anleitung/SteuerungPC.png'
                   
                    imgElement.style.maxWidth = '100%';

                    const imgHandy = document.createElement('img')
                    imgHandy.src = './img/Anleitung/SteuerungHandy.png'
                   
                    imgHandy.style.maxWidth = '100%';

                    const imgAnleitungRätsel = document.createElement('img')
                    imgAnleitungRätsel.src = './img/Anleitung/AnleitungRätsel.png'

                    imgAnleitungRätsel.style.maxWidth = '100%'
                   

                    
                    
                    const weiterbutton = document.createElement('button')
                    weiterbutton.textContent = 'Weiter'
                    
                    weiterbutton.style.textAlign = "1vw"
                    weiterbutton.style.cursor = "pointer"
                    weiterbutton.style.width = "100%"
                    weiterbutton.style.height = "200%"
                    weiterbutton.style.border =  "black, solid 0.3vw";
                    weiterbutton.style.backgroundColor =  "lightgrey";


                    const schließenButton = document.createElement('button')
                    schließenButton.textContent = 'Schließen'
                    
                    schließenButton.style.textAlign = "1vw"
                    schließenButton.style.cursor = "pointer"
                    schließenButton.style.width = "100%"
                    schließenButton.style.height = "200%"
                    schließenButton.style.border =  "black, solid 0.3vw";
                    schließenButton.style.backgroundColor =  "lightgrey";


                    
                    const scrollHint = document.createElement('div');
                    scrollHint.innerHTML = '⬇ Nach unten scrollen ⬇';
                    scrollHint.style.position = 'absolute';
                    scrollHint.style.bottom = '20px';
                    scrollHint.style.left = '50%';
                    scrollHint.style.transform = 'translateX(-50%)';
                    scrollHint.style.fontSize = '1.2em';
                    scrollHint.style.color = 'white';
                    scrollHint.style.padding = '10px 20px';
                    scrollHint.style.borderRadius = '10px';
                    scrollHint.style.backgroundColor = 'red';
                    scrollHint.style.fontFamily = 'Arial, sans-serif';
                    scrollHint.style.textAlign = 'center';
                    scrollHint.style.opacity = '0.8';
                    scrollHint.style.animation = 'bounce 2s infinite ease-in-out';

                    //guide.appendChild(scrollHint);

                    guide.addEventListener('scroll', () => {
                        if (guide.scrollTop > 20) {
                            scrollHint.style.opacity = '0';
                        } else {
                            scrollHint.style.opacity = '0.8';
                        }
                    });

                    weiterbutton.addEventListener('click', () => {
                        audio.ButtonKlick.play()

                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {

                                guide.innerHTML = ''
                                // guide.style.display = "none"
                                // document.querySelector('#Geräte').style.display = 'none'
                                // document.querySelector('#SchwierigkeitsGrad').style.display = 'grid'
                                // const Erklärung = document.getElementById('ErklärBox')
                                // Erklärung.innerHTML = 'Wähle die Schwierigkeit des Rätsels!'
                                setSchwierigkeitsgrad("mittel")
                                guide.appendChild(imgAnleitungRätsel)
                                guide.appendChild(schließenButton)
                                guide.appendChild(scrollHint)
                                guide.scrollTop = 0
                                
                                gsap.to('#overlappingDiv', { opacity: 0 });
                            }
                        });
                        
                    });

                    schließenButton.addEventListener('click', () => {
                        if(!isClicked) {
                            isClicked = true

                        
                            audio.ButtonKlick.play()
                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                onComplete: () => {
                                

                                    this.startGame(this.startLevel); // Spiel starten
                                    guide.style.display = "none"
                                    document.querySelector('#Interface').style.display = 'block';
                                    document.querySelector('#DialogBox').style.display = 'none';
                                    document.querySelector('#Geräte').style.display = 'none';
                                    document.querySelector('#Interface').style.display = 'block';
                                    
                                    document.querySelector('#SchwierigkeitsGrad').style.display = 'none';
                                    document.querySelector('#ErklärBox').style.display = 'none';
                                    if(!Handy) document.querySelector('#moving').style.display = 'none';;
                                    
                                    
                                    gsap.to('#overlappingDiv', { opacity: 0 });
                                }
                            });

                        }

                    })

        
         
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.currentTarget.innerHTML; // Button-Text auslesen
                
                if (mode === "Handy/Tablet" && !isClicked) {
                    guide.style.width = `${canvas.width}px`;
                    guide.style.height = `${canvas.height}px`;
                    isClicked = true
                    audio.ButtonKlick.play();
                    this.HandyMode = true; // Handy-Modus aktivieren
                    Handy = true 
                    console.log("Handy-Modus aktiviert.");
                    // Übergang und Spielstart
                    
                    isClicked = false 
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            guide.style.display = "grid"
                            guide.appendChild(imgHandy)
                            guide.appendChild(weiterbutton)
                            guide.appendChild(scrollHint)
                            const Erklärung = document.getElementById('ErklärBox')
                            Erklärung.innerHTML = 'Wähle die Schwierigkeit des Rätsels'
                          
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                } else if (mode === "PC" && !isClicked ) {
                    guide.style.width = `${canvas.width}px`;
                    guide.style.height = `${canvas.height}px`;
                    isClicked = true 
                    audio.ButtonKlick.play();
                    this.HandyMode = false; // Handy-Modus deaktivieren
                    console.log("PC-Modus aktiviert.");
                    // Übergang und Spielstart
                    
                  
                    isClicked = false 
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            guide.style.display = "grid"
                            guide.appendChild(imgElement)
                            guide.appendChild(weiterbutton)
                            guide.appendChild(scrollHint)
                    
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                    
                } else if(mode === "Leicht" && !isClicked) {
                    isClicked = true 
                    
                    audio.ButtonKlick.play()
                    setSchwierigkeitsgrad("leicht")
                    console.log(SchwierigkeitsGrad)
                    //this.Anleitung = true
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            guide.style.display = "grid"
                            guide.appendChild(imgAnleitungRätsel)
                            guide.appendChild(schließenButton)
                            guide.appendChild(scrollHint)
                            guide.scrollTop = 0
                     
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                    isClicked = false 
                } else if(mode === "Mittel" && !isClicked) {
                    isClicked = true 
                    audio.ButtonKlick.play()
                    setSchwierigkeitsgrad("mittel")
                    //this.Anleitung = true
                    console.log(SchwierigkeitsGrad)
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            guide.style.display = "grid"
                            guide.appendChild(imgAnleitungRätsel)
                            guide.appendChild(schließenButton)
                            guide.appendChild(scrollHint)
                            guide.scrollTop = 0
                           
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                    isClicked = false 

                } else if (mode === "Schwer" && !isClicked) {
                    isClicked = true 
                    audio.ButtonKlick.play()
                    setSchwierigkeitsgrad("schwer")
                    console.log(SchwierigkeitsGrad)
                    //this.Anleitung = true
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            guide.style.display = "grid"
                            guide.appendChild(imgAnleitungRätsel)
                            guide.appendChild(schließenButton)
                            guide.appendChild(scrollHint)
                            guide.scrollTop = 0

                            
                            gsap.to('#overlappingDiv', { opacity: 0 });
                        }
                    });
                    isClicked = false 
                }
                
                

                
            });
        });

        

        

    }
    
    animateStartbildschirm(){
        
        document.querySelector('#Anleitung').style.display = 'none'
    
        document.querySelector('#IDtimer').style.display = 'none'
    
        document.querySelector('#movingInterface').style.display ='none'
    
        document.querySelector('#Interface').style.display ='none'
    
        this.StartbildschirmAnimationId = window.requestAnimationFrame(() => this.animateStartbildschirm())


        //console.log(this.StartbildschirmAnimationId)
        
        this.drawBackground()
        
        
    }

    
    drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const startImage = new Image();
        startImage.src = './img/Startbildschirm/ArnoldiCode.png';
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    }


    
    // Startbildschirm initialisieren
    initializeMenu() {
        console.log("Startbildschirm wird initialisiert.");
         // Initiale Orientierung prüfen
        this.checkAndAnimateStartScreen();

        // Buttons einrichten
        this.setupStartScreenButtons();
        window.addEventListener("orientationchange", () => {
            this.checkAndAnimateStartScreen();
        });
    }

    // Neue Methode: Startbildschirm-Animation prüfen und starten/stoppen
    checkAndAnimateStartScreen() {
        
        const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;
        const isLandscape = orientation ? orientation.type.startsWith("landscape") : (window.innerWidth > window.innerHeight);

        if (isLandscape && !start) {
            console.log("Landscape-Modus erkannt. Animation wird gestartet.");
            if (!this.StartbildschirmAnimationId) {
                //this.setupStartScreenButtons
                this.animateStartbildschirm();
                start = false 

                
                 // Animation nur starten, wenn sie nicht bereits läuft
                
            }
        } else {
            console.log("Portrait-Modus erkannt. Animation wird gestoppt.");
            
            
        }
    }

    

    startGame(startLevel, startRiddle) {
        start = true
        console.log(Handy)
        this.state = "running";
        console.log(`Spiel startet mit Ebene: ${startLevel}`);
        
        // Animation des Startbildschirms beenden
        cancelAnimationFrame(this.StartbildschirmAnimationId);

        // Verstecke Startbildschirm-Elemente
        document.querySelector('#Geräte').style.display = 'none';
        document.querySelector('#Titel').style.display = 'none';
        document.querySelector('#Interface').style.display = 'block'
        this.levelManager.startLevel(startLevel, player); // Ebene starten
        //this.riddleManager.startRiddle('sudokuSchwer')
        //this.riddleManager.showGuide('sudokuLeicht');
        console.log(`Spiel ist jetzt im Zustand: ${this.state}`);
    }

    togglePause() {
        console.log(this.state)
        if (this.state === "running") {
            console.log("pausieren")
            this.pauseGame();
        } else if (this.state === "paused") {
            console.log("weiter")
            this.resumeGame();
        }
    }

    pauseGame() {
        
        if(riddle) {
            this.riddleManager.pauseRiddle();
        }
        else {
            this.levelManager.pauseLevel();
            
        }
        this.state = "paused";
        
        
        console.log("Spiel pausiert");
    }

    resumeGame() {
        
        if(riddle) {
            this.riddleManager.resumeRiddle();
        } else {
            this.levelManager.resumeLevel();

        }
        this.state = "running";
        
       
        console.log("Spiel fortgesetzt");
    }
}



function checkOrientation() {
    const orientation = screen.msOrientation || screen.orientation || screen.mozOrientation;

    if (orientation && orientation.type.startsWith("portrait")) {
        console.log("Portrait-Modus erkannt. Spiel pausieren.");
        console.log(start)
        if(start) {
            gameController.pauseGame(); // Spiel pausieren
        }
        //PleaseRotate.start()
        
    } else if (orientation && orientation.type.startsWith("landscape")) {
        console.log("Landscape-Modus erkannt. Spiel fortsetzen.");
        console.log(start)
        if(start) {
            gameController.resumeGame(); // Spiel fortsetzen
        }
        
        //PleaseRotate.stop()

       
    }
}

window.addEventListener("orientationchange", checkOrientation);



  

// Beispiel für Initialisierung des GameControllers
export const gameController = new GameController(levelManager, riddleManager);
console.log("GameController initialisiert:", gameController);
gameController.initializeMenu();
// Beispiel für die Verwendung
document.addEventListener("keydown", (event) => {
    //console.log(`Taste gedrückt: ${event.key}`); // Debugging-Ausgabe
    if (event.key === "Escape") {
        console.log("Escape erkannt"); // Debugging
        gameController.togglePause();
    }
});
