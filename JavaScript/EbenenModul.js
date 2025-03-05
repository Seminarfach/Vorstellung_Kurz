import { schulhofConfig, Flur1Config, raum1Config} from './Ebenen/Ebene1.js';


class LevelManager {
    constructor(levelConfig, zoneDefaults) {
        this.config = levelConfig; // Konfiguration für alle Ebenen
        this.zoneDefaults = zoneDefaults; // Standardwerte für Zonen
        this.currentLevel = null; // Aktive Ebene
        this.player = null; // Spieler-Referenz
        this.movables = []; // Bewegliche Objekte der aktuellen Ebene
        this.globalOffset = { x: 0, y: 0};
        this.shouldAdjustBackground = false;
        this.lastPlayerPosition = null 
        this.initializeZones(); // Automatische Zonen-Erstellung
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.initialBackgroundAnchor = null
        this.initialBackgroundPosition = null
        this.allowVerticalMovement = false;
        this.allowHorizontalMovement = false;

        
    }

    calculateGlobalOffset() {

        const canvas = document.querySelector('#gameCanvas');
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const level = this.config[this.currentLevel];
        if (!level || !level.backgroundAnchor) {
            console.error("Fehler: Hintergrundanker fehlt in der Konfiguration.");
            return;
        }

        
        console.log(this.lastPlayerPosition)
        const levelanchor = level.backgroundAnchor
        const newlevelanchor = this.lastPlayerPosition
        const roomAnchor = this.lastRoomPosition
    

        if(this.shouldAdjustBackground && this.NewPlayerPosition) {

            this.globalOffset.x = canvasCenterX - newlevelanchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - newlevelanchor.y - player.position.y;
            
            
        } else if(!this.shouldAdjustBackground && !this.NewPlayerPosition) {
    
            this.globalOffset.x = canvasCenterX - levelanchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - levelanchor.y - player.position.y;
            
        } else if(this.NewPlayerPosition) {
           
            this.globalOffset.x = canvasCenterX - roomAnchor.x - player.position.x;
            this.globalOffset.y = canvasCenterY - roomAnchor.y - player.position.y;
    
        }
    

         

   

    }
    
    

    // Automatische Zonen-Erstellung basierend auf dem dataArray
    initializeZones() {
        Object.keys(this.config).forEach(levelName => {
            //console.log(`Initialisiere Zonen für Ebene: ${levelName}`);
            const level = this.config[levelName];

            // Prüfen, ob ein dataArray vorhanden ist
            if (level.zones && Array.isArray(level.zones)) {
                level.zones.forEach(zoneConfig => {

                    // if (!zoneConfig.dataArray || !Array.isArray(zoneConfig.dataArray)) {
                    //     console.error(`Fehler: Ungültiges oder fehlendes dataArray für Zone in Ebene "${levelName}".`);
                    //     return;
                    // }
    
                    //console.log(`Erstelle Zonen für Zone-Konfiguration:`, zoneConfig);

                    const zones = this.createZones(
                        zoneConfig.dataArray,
                        zoneConfig.tileWidth || this.zoneDefaults.tileWidth,
                        zoneConfig.tileHeight || this.zoneDefaults.tileHeight,
                        zoneConfig.matchSymbol || this.zoneDefaults.matchSymbol,
                        zoneConfig.ZoneClass || this.zoneDefaults.ZoneClass,
                        zoneConfig.blockMovement,
                        zoneConfig.transitionCondition,
                        zoneConfig.targetLevel,
                        zoneConfig.anchor
                    );

                    if (!level.allZones) level.allZones = [];
                    level.allZones.push(...zones);
                });
            } else {
                console.error(`Fehler: Keine gültigen Zonen für Ebene "${levelName}" definiert.`);
            }
        });
    }

    // Zonen-Erstellungsfunktion
    createZones(dataArray, tileWidth, tileHeight, matchSymbol,ZoneClass, blockMovement, transitionCondition, targetLevel, anchor) {
        
        if (!dataArray || !Array.isArray(dataArray)) {
            console.error('Fehler: Ungültiges oder fehlendes dataArray in createZones:', dataArray);
            return [];
        }
        
        
        
        const zonesMap = [];

        // Aufteilen der Daten in Reihen
        for (let i = 0; i < dataArray.length; i += 70) {
            zonesMap.push(dataArray.slice(i, i + 70));
        }

        const zones = [];
        
        

        //Erstellen der Zonen basierend auf den Symbolen
        zonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === matchSymbol) {
                    zones.push(new ZoneClass({
                        position: {
                            x: j * tileWidth,
                            y: i * tileHeight  
                        },
                        blockMovement,
                        transitionCondition,
                        targetLevel,
                        anchor,
                        
                    }));
                    // console.log("Zone erstellt bei:", {
                    //     x: j * tileWidth,
                    //     y: i * tileHeight,
                    //     anchor,
                    // });
                }
            });
        });

        //console.log(`Zonen für Ebene erstellt:`, zones);
        return zones;
    }

    // Spieler in Bezug auf den Hintergrund positionieren
    


    // Ebene starten
    startLevel(levelName, player) {

        const HandyContainer = document.getElementById('moving')
        const HandyValue = window.getComputedStyle(HandyContainer).display
        
        if(HandyValue == 'grid') Handy = true 
        
        
        
        //console.log(this.shouldAdjustBackground)

        this.resizeCanvas()
        audio.Map.play()
        if (!this.config[levelName]) {
            console.error(`Fehler: Ebene "${levelName}" existiert nicht in der Konfiguration.`);
            return;
        }

        const newConfig = this.config[levelName];

        this.currentLevel = levelName;
        
        
        this.player = player;
        this.player.position.x = canvas.width / 2 - (192 / 4) / 2
        this.player.position.y = canvas.height /2 - 68  / 2
        console.log(this.player)



        const level = this.config[levelName];
        //this.calculateZoneOffset()
        this.calculateGlobalOffset()
        if (level.background) {
            this.adjustBackgroundPosition(level.background, level.foreground);
        }

        //this.initializeZones()

        //console.log(`Starte Ebene: ${levelName}`);

        this.checkLevelConfig(level);
        this.initializeUI(level.ui);
        this.updateMovables();

            //Dialogbox anzeigen, falls in der Konfiguration definiert
        if (level.dialog?.show) {
            
            
            this.player.image = player.sprites.down; 
            const canvas = document.querySelector('#gameCanvas');
            const interfaceElement = document.querySelector('#Interface');
            interfaceElement.style.display = 'block';
            interfaceElement.style.width = `${canvas.width}px`;
            interfaceElement.style.height = `${canvas.height * 0.3}px`; // 30% der Canvas-Höhe
            document.querySelector('#Content').style.display = 'none'
            const dialogBox = document.querySelector('#GuideBox');
            
           
            const dialogText = document.querySelector('#GuideText');
            const fortfahrenButton = document.querySelector('#Weiter');
            fortfahrenButton.style.height = "100%"
            fortfahrenButton.style.width = "75%"

            if (dialogBox && dialogText && fortfahrenButton && !this.shouldAdjustBackground) {
                dialogBox.style.display = 'grid';
                dialogText.innerHTML = level.dialog.text || '';
                fortfahrenButton.style.display = 'inline-block';
           
                

                // Bewegung blockieren, bis auf Fortfahren geklickt wird
                if (level.blockMovementUntilContinue) {
                    console.log("Bewegung blockiert.");
                    this.player.movementBlocked = true;
                    console.log("Erklärung")

                    fortfahrenButton.addEventListener('click', () => {
                        console.log("Fortfahren gedrückt.");
                        dialogBox.style.display = 'none';
                        interfaceElement.style.display = 'none';
                        this.player.movementBlocked = false; // Bewegung erlauben
                        console.log(Handy)
                        if(Handy) {
                            document.querySelector('#movingInterface').style.display = 'block';
                        }
                    }, { once: true });
                }
            } else {
                dialogBox.style.display = 'none';
                interfaceElement.style.display = 'none'
                console.log(Handy)
                if(Handy) {
                    document.querySelector('#movingInterface').style.display = 'block';

                }
            
                console.error("Dialog-Elemente nicht gefunden!");
            }
        }

        this.initialBackgroundPosition = {
            x: level.background.position.x,
            y: level.background.position.y
        };
    
        this.initialBackgroundAnchor = { 
            x: level.backgroundAnchor.x, 
            y: level.backgroundAnchor.y 
        };

        // console.log(this.initialBackgroundPosition)
        // console.log(this.initialBackgroundAnchor)
        

        
        // Starte Animation
        this.animateLevel(newConfig);
    }

    // Konfigurationsprüfung
    checkLevelConfig(level) {
        if (!level.background) {
            console.error(`Fehler: Hintergrund für Ebene "${this.currentLevel}" fehlt.`);
        }

        if (!Array.isArray(level.zones) && !level.dataArray) {
            console.error(`Fehler: Weder Zonen noch ein dataArray für Ebene "${this.currentLevel}" definiert.`);
        }

        

        if (!level.ui || typeof level.ui !== 'object') {
            console.error(`Fehler: UI-Konfiguration für Ebene "${this.currentLevel}" fehlt oder ist ungültig.`);
        }
    }

    // UI initialisieren
    initializeUI(uiConfig) {
        if (!uiConfig) {
            console.error('UI-Konfiguration fehlt.');
            return;
        }
        
        document.querySelector('#Titel').style.display = uiConfig.title ? 'block' : 'none';
        document.querySelector('#Interface').style.display = uiConfig.interface ? 'block' : 'none';
        if(Handy) {
            document.querySelector('#movingInterface').style.display = uiConfig.interface = 'block' ;
        }

        document.querySelector('#IDtimer').style.display = 'none';

       

        
    }



    

    // Berechnung des globalen Offsets basierend auf der Canvas-Größe
    

    // Anpassung der Hintergrundposition mit dem globalen Offset
    adjustBackgroundPosition(background, foreground) {

        const canvas = document.querySelector('#gameCanvas');
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const level = this.config[this.currentLevel];
        if (!level?.backgroundAnchor) {
            console.error("Kein Hintergrund-Fixpunkt (`backgroundAnchor`) definiert.");
            return;
    }

    //const anchor = level.backgroundAnchor; // Fixpunkt im Hintergrund
    
    const anchor = level.backgroundAnchor
    const newanchor = this.lastPlayerPosition
    const roomAnchor = this.lastRoomPosition

    
    
    if(this.shouldAdjustBackground && this.NewPlayerPosition) {
        // Berechne die neue Position des Hintergrunds so, dass der Fixpunkt relativ zur Canvas-Mitte bleibt
        background.position.x = canvasCenterX - newanchor.x;
        background.position.y = canvasCenterY - newanchor.y;

        if(level.foreground) {
            foreground.position.x = canvasCenterX - newanchor.x;
            foreground.position.y = canvasCenterY - newanchor.y;
            //console.log("Vordergrundposition:", foreground.position)

        }
        
    } else if(!this.shouldAdjustBackground && !this.NewPlayerPosition) {

        // Berechne die neue Position des Hintergrunds so, dass der Fixpunkt relativ zur Canvas-Mitte bleibt
        background.position.x = canvasCenterX - anchor.x;
        background.position.y = canvasCenterY - anchor.y;

        if(level.foreground) {
            foreground.position.x = canvasCenterX - anchor.x;
            foreground.position.y = canvasCenterY - anchor.y;
            //console.log("Vordergrundposition:", foreground.position)

        }
        
    } else if(this.NewPlayerPosition) {
        // Berechne die neue Position des Hintergrunds so, dass der Fixpunkt relativ zur Canvas-Mitte bleibt
        background.position.x = canvasCenterX - roomAnchor.x;
        background.position.y = canvasCenterY - roomAnchor.y;

        if(level.foreground) {
            foreground.position.x = canvasCenterX - roomAnchor.x;
            foreground.position.y = canvasCenterY - roomAnchor.y;
            //console.log("Vordergrundposition:", foreground.position)

        }

    }



   
    

   

    
    
    

    //console.log("Hintergrundposition angepasst:", background.position);

    }
        
    

    // Größe des Canvas und Offset bei Größenänderung anpassen
    resizeCanvas() {
        const canvas = document.querySelector('#gameCanvas');
        canvas.width = document.documentElement.clientWidth * 0.7;
        canvas.height = document.documentElement.clientHeight * 0.8;

        

        const currentLevel = this.config[this.currentLevel]
        

        this.calculateGlobalOffset(); // Offset nach der Größenänderung neu berechnen


        // if(currentLevel?.background) {
        //     this.adjustBackgroundPosition(this.currentLevel.background)
        // }

        //this.initializeZones()
        this.updateMovables()

        
    }

    
    
    // Animation der Ebene
    animateLevel(level) {
         
        
        const animate = () => {
            if (!level.background || !this.player) {
                console.error('Animation abgebrochen: Hintergrund oder Spieler fehlt.');
                cancelAnimationFrame(this.currentAnimationId);
                return;
            }
            

            this.currentAnimationId = requestAnimationFrame(animate);

            //console.log(this.currentAnimationId)

            
            //console.log(this.currentAnimationId)
            // Canvas reinigen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Hintergrund zeichnen
            
            level.background.draw()
            //console.log(level.background.position)
            this.player.draw();

            if(level.foreground) {
                level.foreground.draw()

            }
                
            (level.allZones || []).forEach(zone => {
                        if (zone.draw) {
                            zone.draw(level.backgroundAnchor, canvas);
                        } else {
                            console.error('Zone fehlt eine gültige Draw-Methode:', zone);
                        }
                        
                    });
            

        
            
                    

            // Zonen zeichnen
            
            

            // Spielerbewegung prüfen
            this.handleMovement();
        };

        animate();
    }
    

    // Ebene pausieren
    pauseLevel() {
        if (this.currentAnimationId) {
            cancelAnimationFrame(this.currentAnimationId);
            this.currentAnimationId = null;
            console.log("Ebene pausiert");
        }
    }

    // Ebene fortsetzen
    resumeLevel() {
        if (!this.currentAnimationId) {
            console.log("Ebene wird fortgesetzt");
            this.animateLevel(this.config[this.currentLevel]);
        }
    }
    

    rectangularCollision({ rectangle1, rectangle2, direction }) {
        const tolerance = 5; 
    
        if (direction === 'up') {
            return (
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&  // Spieler-Unterkante berührt Zone-Oberkante
                rectangle1.position.y >= rectangle2.position.y &&  
                rectangle1.position.x + rectangle1.width - tolerance > rectangle2.position.x && // Nur horizontale Überlappung prüfen
                rectangle1.position.x + tolerance < rectangle2.position.x + rectangle2.width
            );
        } 
        
        if (direction === 'down') {
            return (
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&  
                rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height &&  
                rectangle1.position.x + rectangle1.width - tolerance > rectangle2.position.x &&
                rectangle1.position.x + tolerance < rectangle2.position.x + rectangle2.width
            );
        }
    
        if (direction === 'left') {
            return (
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&  
                rectangle1.position.x >= rectangle2.position.x &&  
                rectangle1.position.y + rectangle1.height - tolerance > rectangle2.position.y && // Nur vertikale Überlappung prüfen
                rectangle1.position.y + tolerance < rectangle2.position.y + rectangle2.height
            );
        }
    
        if (direction === 'right') {
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&  
                rectangle1.position.x + rectangle1.width <= rectangle2.position.x + rectangle2.width &&  
                rectangle1.position.y + rectangle1.height - tolerance > rectangle2.position.y &&
                rectangle1.position.y + tolerance < rectangle2.position.y + rectangle2.height
            );
        }
    
        return false;
    }
    
    

    

    

    BewegungSpieler({ player, zones, direction, step, background}) {
        //console.log(`Bewegung gestartet: Richtung ${direction}`); // Debugging-Ausgabe
        
        
    
        const level = this.config[this.currentLevel];
        const offset = { x: 0, y: 0 };

        
    
        //Bewegungsoffset abhängig von der Richtung 
        if (direction === 'up') {
            offset.y = step;
            player.image = player.sprites.up

        }
            
        if (direction === 'down') {
            offset.y = -step;
            player.image = player.sprites.down 

        }

        if(direction === 'right') {
            offset.x = -step
            player.image =  player.sprites.right
        }

        if(direction === 'left') {
            offset.x = step
            player.image = player.sprites.left
        }

        
        
        let transitionTriggered = false;
        let allowHorizontalMovement = false 
        let allowVerticalMovement = false 
        const nextPosition = {
            x: player.position.x + offset.x,
            y: player.position.y + offset.y,
        };

        let canMove = true;
        //this.allowVerticalMovement = false
        
    
        // Kollisionsprüfung
        for (let i = 0; i < zones.length; i++) {
            const zone = zones[i];

           
            
            if (this.rectangularCollision({
                    rectangle1: {...player, position: nextPosition},
                    rectangle2: {
                        ...zone,
                        position: {
                            x: canvas.width / 2 - level.backgroundAnchor.x + zone.position.x ,
                            y: canvas.height / 2 - level.backgroundAnchor.y + zone.position.y ,
                        },
                        
                    },
                direction,
                })) {
                    if (zone.blockMovement) {
                        console.log("Kollision")
                        canMove = false;
    

                        // Ermöglicht Bewegung entlang der Kante
                        if (direction === 'left' || direction === 'right') {
                            allowVerticalMovement = true;
                            
                        } 
                        
                        
                        if (direction === 'up' || direction === 'down') {
                            allowHorizontalMovement = true;
                        
                        }

                        
                    }

                    if(zone.transitionCondition && zone.transitionCondition()) {
                        console.log(`Transition ausgelöst bei Zone ${i}`);
                        transitionTriggered = true
                        //console.log(this.player.position)

                    

                        this.handleTransition({
                            player,
                            zones: levelManager.movables,
                            audio: { Map: audio.Map, Tuer: audio.Tuer },
                            //level: levelManager.config[levelManager.riddle],

                            nextAnimation: () => {

                                if(zone.targetLevel) {

                                    levelManager.startLevel(zone.targetLevel, levelManager.player)
                                
                                    console.log("Nächste Animation startet...");
                                }
                            },
                            currentAnimationId: levelManager.currentAnimationId, // Das ist die aktuelle Animation-ID, die gestoppt werden soll
                            transitionAudio: {
                                stop: ['Map'], // Stoppt die Hintergrundmusik
                                play: ['Tuer'], // Spielt das Türgeräusch
                            },
                        });

                        break;
                    }
                }


                    
            }

                if (canMove) {

                    const movables = levelManager.updateMovables();
                    movables.forEach((movable) => {
                        movable.position.y += offset.y
                        movable.position.x += offset.x
                    })

                    background.position.x += offset.x
                    background.position.y += offset.y

                    
                        // Verlangsame den Framewechsel
                         if (!player.frameTimer) player.frameTimer = 0; // Initialisiere den Timer, falls nicht vorhanden
                         player.frameTimer++;
             
                         // Wechsel den Frame nur alle X Spielzyklen (z. B. alle 10 Frames)
                         const frameDelay = 15; // Je höher der Wert, desto langsamer der Framewechsel
                         if (player.frameTimer >= frameDelay) {
                             player.frames.val++;
                             player.frameTimer = 0; // Timer zurücksetzen
                         }
             
                         if (player.frames.val >= player.frames.max) {
                             player.frames.val = 0; // Zurücksetzen, wenn der Frame-Zyklus beendet ist
                         }
                     
                    
                } else {
                    if (this.allowVerticalMovement ) {
                        console.log("vertikal erlaubt")
                        //offset.x = 0;
                        const movables = levelManager.updateMovables();
                        movables.forEach((movable) => {
                            movable.position.y += offset.y;
                        });
                        background.position.y += offset.y;
                    }
                    if (this.allowHorizontalMovement ) {
                        //offset.y = 0;
                        const movables = levelManager.updateMovables();
                        movables.forEach((movable) => {
                            movable.position.x += offset.x;
                        });
                        background.position.x += offset.x;
                    }
                }



    }

    // Spielerbewegung
    handleMovement() {
        if (!this.player || !this.movables || this.player.movementBlocked) return;
        //this.resetMovementDirections()
        if (keys.w.pressed || movingtouchUp) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'up', step: 3, background: this.config[this.currentLevel].background });
            
        } else if (keys.a.pressed || movingtouchLeft) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'left', step: 3, background: this.config[this.currentLevel].background});
            
        } else if (keys.s.pressed || movingtouchDown) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'down', step: 3, background: this.config[this.currentLevel].background });
            
        } else if (keys.d.pressed || movingtouchRight) {
            this.BewegungSpieler({ player: this.player, zones: this.movables, direction: 'right', step: 3, background: this.config[this.currentLevel].background });
            
        }

        
    }

    calculateNewBackgroundAnchor() {
        const level = this.config[this.currentLevel];
    
        // Aktuelle Hintergrundposition
        const aktuelleHintergrundPosition = {
            x: level.background.position.x,
            y: level.background.position.y
        };
        
        // Berechnung des neuen `backgroundAnchor`
        const neuerBackgroundAnchor = {
            x: this.initialBackgroundAnchor.x + (this.initialBackgroundPosition.x - aktuelleHintergrundPosition.x),
            y: this.initialBackgroundAnchor.y + (this.initialBackgroundPosition.y - aktuelleHintergrundPosition.y)
        };
    
        return neuerBackgroundAnchor;
    }
    

    
    

    handleTransition({
        player,
        zones,
        audio,
        nextAnimation,
        currentAnimationId,
        transitionAudio = { stop: [], play: []},
        
    }) {

        if (currentAnimationId) {
            console.log(`Animation mit ID ${currentAnimationId} beendet.`);
            cancelAnimationFrame(currentAnimationId);
        }

        

        // Audio-Handling für die Transition
        const { stop = [], play = [] } = transitionAudio;

            // Standard Audio-Handling
            stop.forEach((audioKey) => {
                if (audio[audioKey]) {
                    console.log(`Stoppe Audio: ${audioKey}`);
                    audio[audioKey].stop();
                }
            });
    
            play.forEach((audioKey) => {
                if (audio[audioKey]) {
                    console.log(`Spiele Audio: ${audioKey}`);
                    audio[audioKey].play();
                }
            });
        
    
       


        if (typeof nextAnimation === 'function') {
            
            
            

            //console.log(this.lastPlayerPosition)
           
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 3,
                yoyo: true,
                duration: 0.4,
                onComplete: () => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete: () => {
                            nextAnimation();
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.4,
                            });
                            if (this.config[this.currentLevel].riddle){
                                console.log("Rätsel")
                                if(!this.shouldAdjustBackground){
                                    this.lastPlayerPosition = this.calculateNewBackgroundAnchor()
                                    this.NewPlayerPosition = true 
                                } else if(this.NewPlayerPosition) {
                                    this.lastRoomPosition = this.calculateNewBackgroundAnchor()
                                    this.NewPlayerPosition = false 
                                }
                                

                            };
                            
                        },
                    });
                },
            });
        } else {
            console.error("nextAnimation ist keine gültige Funktion.");
        }

        
    }

    // Aktualisiere movables
    updateMovables() {
        const level = this.config[this.currentLevel];

        if (!level) {
            console.error(`Fehler: Keine Daten für aktive Ebene "${this.currentLevel}" gefunden!`);
            return [];
        }

        const movables = [
            
            level.foreground,  // Vordergrund der aktuellen Ebene (falls vorhanden)
            ...(level.allZones || []), // Zonen der aktuellen Ebene
        ].filter(item => !!item); // Entferne undefined- oder null-Werte

        
        this.movables = movables;
        return movables;
    }

    // Event-Listener für Fenstergrößenänderung
    onResize() {

        window.addEventListener('resize', () => {
            const canvas = document.querySelector('#gameCanvas');
            canvas.width = document.documentElement.clientWidth * 0.7;
            canvas.height = document.documentElement.clientHeight * 0.8;
    
            console.log("Canvas-Größe aktualisiert:", { width: canvas.width, height: canvas.height });
        });
        
    }
    
}

// Initialisierung des LevelManagers
export const levelManager = new LevelManager({ schulhof: schulhofConfig, flur1: Flur1Config, raum1: raum1Config});



