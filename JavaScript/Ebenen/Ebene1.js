import { riddleManager } from '../RätselManager.js';

import { SchwierigkeitsGrad } from '../Spielsteuerung.js';


export const schulhofConfig = {

    

    zones: [
        {

        dataArray: SchulhofZonenData, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        matchSymbol: 2809, // Symbol für Zonen
        ZoneClass: ZoneSchulhof,
        blockMovement: true,
        transitionCondition: null,
        targetLevel: null,
        anchor: { x: 0, y: 0 }, // Fixpunkt für diese Zone
        },
        {
        dataArray: EingangSchulhofData, // Symbolarray für Zonen
        tileWidth: 36,
        tileHeight: 36,
        anchor: { x: 0, y: 0 }, // Fixpunkt für diese Zone
        matchSymbol: 2802, // Symbol für Zonen
        ZoneClass: ZoneSchulhof,
        blockMovement: false,
        transitionCondition: () => keys.w.pressed || movingtouchUp,
        targetLevel: 'flur1',
       
        }


    ],
    dialog: {
        text: "Willkommen auf dem Schulhof!<br>Begib dich nun zum Haupteingang.",
        show: true,
    },
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 1550, y: 700 },
 
    background: new Sprite({
        position: { x: 0, 
                    y: 0 
        },
        
        image: (() => {
            const image = new Image();
            image.src = './img/Schulhof/Schulhof.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img/Schulhof/VordergrundSchulhof.png';
            return image;
        })(),
    }),
    
    
    ui: { title: false, interface: false, moving: false },
    
};

//-------------------------------------------------------------------------------------------------------------------------



export const Flur1Config = {

    zones: [
        {

        dataArray: Flur1ZonenData, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: true,
        transitionCondition: null,
        },
        {
        dataArray: EingangRaum1Data, // Symbolarray für Zonen
        tileWidth: 72,
        tileHeight: 72,
        offsetX: -2800,
        offsetY: -1100,
        matchSymbol: 584, // Symbol für Zonen
        ZoneClass: ZoneFlur,
        blockMovement: false,
        transitionCondition: () => keys.w.pressed || movingtouchUp,
        targetLevel: 'raum1'


            
        }


    ],
    dialog: {
        text: "Willkommen auf dem 300er Flur! <br> Gehe nun zum Raum 305.",
        show: true,
    },
    blockMovementUntilContinue: true, 

    backgroundAnchor:  { x: 3000, y: 1300 },

    background: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img/Flure/Flur300/Flur1.png';
            return image;
        })(),
    }),

    foreground: new Sprite({
        position: { x: 0, y: 0 },
        image: (() => {
            const image = new Image();
            image.src = './img/Flure/Flur300/Flur1Vordergrund.png';
            return image;
        })(),
    }),

    
    //transitions: SchulhofTransitions,
    ui: { title: false, interface: false, moving: false },
};

// //-------------------------------------------------------------------------------------------------------------------------

export const raum1Config = {

zones: [
    {

    dataArray: Raum1ZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 3958, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    blockMovement: true,
    transitionCondition: null,
    targetLevel: null,
    },
    {
    dataArray: Rätsel1ZonenData, // Symbolarray für Zonen
    tileWidth: 36,
    tileHeight: 36,
    offsetX: 0,
    offsetY: 0,
    matchSymbol: 4392, // Symbol für Zonen
    ZoneClass: ZoneRaum,
    blockMovement: () => {
        const riddleName = `sudoku${SchwierigkeitsGrad.riddle.charAt(0).toUpperCase() + SchwierigkeitsGrad.riddle.slice(1)}`; // Name des Rätsels
        if (riddleManager.completedRiddles.has(riddleName)) {
        console.log(`Rätsel "${riddleName}" abgeschlossen. Bewegung blockiert.`);
        return true; // Blockiere Bewegung
        }
        return false; // Bewegung nicht blockieren
    },
    transitionCondition: () => {
        if (!riddleManager) {
            console.error('RätselManager ist nicht initialisiert.');
            return false;
        }

        const riddleName = `sudoku${SchwierigkeitsGrad.riddle.charAt(0).toUpperCase() + SchwierigkeitsGrad.riddle.slice(1)}`; // Name des Rätsels
        if (riddleManager.completedRiddles.has(riddleName)) {
            console.log(`Rätsel "${riddleName}" bereits abgeschlossen. Kein erneuter Eintritt möglich.`);
            return false; // Zone blockiert
        }



        if(keys.w.pressed || movingtouchUp) {
                               
            riddleManager.showGuide(riddleName);  // Die Flur1-Ebene starten
            return true;  // Bedingung erfüllt, Übergang wird ausgelöst
        }
            return false;
    }
}


],

riddle: true, 
blockMovementUntilContinue: true, 
backgroundAnchor:  { x: 1300, y: 1100 },
//backgroundAnchorRiddle: {x: 1330, y: 670},
background: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img/Räume/Raum1/KlassenraumSpiel.png';
        return image;
    })(),
}),

foreground: new Sprite({
    position: { x: 0, y: 0 },
    image: (() => {
        const image = new Image();
        image.src = './img/Räume/Raum1/Raum1Vordergrund.png';
        return image;
    })(),
}),
dialog: {
    text: "Willkommen im Matheraum 305! <br> Gehe nun zur Tafel, um das Rätsel zu starten.",
    show: true,
},
ui: { title: false, interface: false, moving: false },
};

// //-------------------------------------------------------------------------------------------------------------------------

