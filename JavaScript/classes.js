

const canvas = document.querySelector('canvas'); // definiert Variable mit konstantem Wert 

const ctx = canvas.getContext('2d'); // -"- , vorbestimmt 2d Zeichenelemente für das Canvas

const guide = document.getElementById('guide')



ctx.canvas.width = document.documentElement.clientWidth;

ctx.canvas.height= document.documentElement. clientHeight;







let Verschiebung = false 



// var render = function (){

//     ctx.canvas.width = document.documentElement.clientWidth * 0.7;

//     ctx.canvas.height= document.documentElement. clientHeight * 0.8 ;

// };

// window.addEventListener("resize", render)

// render()


function resizeCanvas() {
    ctx.canvas.width = window.innerWidth * 0.7;
    ctx.canvas.height = window.innerHeight * 0.8;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initiales Setzen der Größe



let riddle = false 

let Handy = false 



class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = [], scrollSpeed = 1 })
    {
        this.position = position 
        this.image = image
        this.frames = {...frames, val: 0, elapsed:0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
            
        }
        this.moving = false
        this.sprites = sprites
        this.scrollSpeed = scrollSpeed
        this.frameSpeed = 10
    }

    draw() {
        ctx.drawImage(
            this.image, // Bild Spieler zeichnen
            this.frames.val * this.width, // Startwert Zuschneiden x-Koordinate
            0, // Startwert Zuschneiden y-Koordinate
            this.image.width / this.frames.max, // Zuschneiden der Breite des Bildes (4 -> vier Figuren -> soll nur eine)
            this.image.height, // Zuschneiden Höhe des Bildes
    
            this.position.x,
            this.position.y,
            
           
            this.image.width / this.frames.max,  // "Echte" Breite Bild
            this.image.height // "Echte" Höhe Bild
    
            // Vier Argumente repäsentieren, "Echte" Eigenschaften Bild zeichnen 
        )

        if (!this.moving) return 

        

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frameSpeed === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0 

        }

    } 

    

    
}





class ZoneSchulhof {
    static width = 36;
    static height = 36;

    constructor({ position, blockMovement, transitionCondition, targetLevel, anchor }) {
        
        this.anchor = anchor || {x: 0, y: 0};
        this.position = {
            x: position.x ,
            y: position.y,
        };
        this.blockMovement = blockMovement;
        this.transitionCondition = transitionCondition;
        this.targetLevel = targetLevel;
        this.width = ZoneSchulhof.width;
        this.height = ZoneSchulhof.height;
    }

    draw(backgroundAnchor, canvas) {
        // Berechne die Zeichnungsposition relativ zum Hintergrund-Anker
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const drawX = canvasCenterX - backgroundAnchor.x + this.position.x;
        const drawY = canvasCenterY - backgroundAnchor.y + this.position.y;

        // Zeichne die Zone
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
}


class ZoneFlur {
    static width = 72;
    static height = 72;

    constructor({ position, blockMovement, transitionCondition, targetLevel, anchor }) {
        
        this.anchor = anchor || {x: 0, y: 0};
        this.position = {
            x: position.x ,
            y: position.y,
        };
        this.blockMovement = blockMovement;
        this.transitionCondition = transitionCondition;
        this.targetLevel = targetLevel;
        this.width = ZoneFlur.width;
        this.height = ZoneFlur.height;
    }

    draw(backgroundAnchor, canvas) {
        // Berechne die Zeichnungsposition relativ zum Hintergrund-Anker
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const drawX = canvasCenterX - backgroundAnchor.x + this.position.x;
        const drawY = canvasCenterY - backgroundAnchor.y + this.position.y;

        // Zeichne die Zone
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
}

class ZoneRaum {
    static width = 36;
    static height = 36;

    constructor({ position, blockMovement, transitionCondition, targetLevel, anchor }) {
        
        this.anchor = anchor || {x: 0, y: 0};
        this.position = {
            x: position.x ,
            y: position.y,
        };
        this.blockMovement = blockMovement;
        this.transitionCondition = transitionCondition;
        this.targetLevel = targetLevel;
        this.width = ZoneRaum.width;
        this.height = ZoneRaum.height;
    }

    draw(backgroundAnchor, canvas) {
        // Berechne die Zeichnungsposition relativ zum Hintergrund-Anker
        //console.log(backgroundAnchor)
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const drawX = canvasCenterX - backgroundAnchor.x + this.position.x;
        const drawY = canvasCenterY - backgroundAnchor.y + this.position.y;

        // Zeichne die Zone
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(drawX, drawY, this.width, this.height);
    }
}
