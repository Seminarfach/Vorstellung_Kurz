

const playerDownImage = new Image();
playerDownImage.src = './img/Spieler/Eule/player2down.png'

const playerUpImage = new Image();
playerUpImage.src = './img/Spieler/Eule/player2up.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/Spieler/Eule/player2left.png'

const playerRightImage = new Image();
playerRightImage.src = './img/Spieler/Eule/player2right.png'


 
const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, // Koordinaten x-Achse Mitte Haus
        y: canvas.height /2 - 68  / 2 // Koordinaten y-Achse Mitte 
        
       
       
    },
    image: playerDownImage,
    frames: { // wird benötigt um das Zuschneiden zu ermögliche, max kommt aus dem Sprite
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})






let movingtouchUp = false 

let movingtouchRight = false 

let movingtouchLeft = false 

let movingtouchDown = false 

let moving = true

let activeLayer = 'Schulhof'

const keys = {
    w: {
        pressed: false 
    },

    a: {
        pressed: false 
    },

    s: {
        pressed: false 
    },

    d: {
        pressed: false 
    },

    z: {
        pressed: false
    }
}


window.addEventListener('keydown', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
        break 

        case 'a':
            keys.a.pressed = true
        break 

        case 's':
            keys.s.pressed = true
        break 

        case 'd':
            keys.d.pressed = true 
        break 

        case 'z':
            keys.z.pressed = true
        break 
      
       

    }
        
})

window.addEventListener('keyup', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
        break 

        case 'a':
            keys.a.pressed = false
        break 

        case 's':
            keys.s.pressed = false
        break 

        case 'd':
            keys.d.pressed = false
        break 
        
        case 'z':
            keys.z.pressed = false 
       

    }
})     


document.getElementById('Up').addEventListener('touchstart', e => {
    
    movingtouchUp = true 
})

document.getElementById('Up').addEventListener('touchend', e => {
   
   movingtouchUp = false
})

document.getElementById('Right').addEventListener('touchstart', e => {
    
    movingtouchRight = true
})

document.getElementById('Right').addEventListener('touchend', e => {
  
   movingtouchRight = false
})

document.getElementById('Left').addEventListener('touchstart', e => {
    
    movingtouchLeft = true
})

document.getElementById('Left').addEventListener('touchend', e => {
   
   movingtouchLeft = false
})

document.getElementById('Down').addEventListener('touchstart', e => {
   
    movingtouchDown = true
})

document.getElementById('Down').addEventListener('touchend', e => {
   
   movingtouchDown = false
})