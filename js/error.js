'use strict'
//class for stars
class Star {
    constructor(x,y,radius,color){
        this.x =x;
        this.y =y;
        this.radius =radius;
        this.color =color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle=this.color;
        ctx.fill();
    }
}

//variables to handle fps
var fps, fpsInterval, startTime, now, then, elapsed;
let animationId;

// canvas and context
const canvas=document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

//stars array
let stars=[];
document.addEventListener('DOMContentLoaded', function() {
    beginplay();
}, false);

window.addEventListener('resize',function(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    stars.splice(0,stars.length)
    beginplay();
},false)

//Start Spawning Stars function
function beginplay(){
    startAnimating(60);
    spawnStars();
}

// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
};



//animation fn that will animate the entire canvas
function animate(){
    //loop though animation fn- recursive callling
    animationId = requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    //allow smooth 60fps irrespective of the players device performance
    if (elapsed > fpsInterval) 
    {
        then = now - (elapsed % fpsInterval);
        ctx.fillStyle="rgba(0,0,0,0.1)";
        ctx.fillRect(0,0, canvas.width, canvas.height);
        stars.forEach((star)=>
        {
            star.draw();    
        })
    }  
}



//enemy spawnner fucntion
function spawnStars(){

    var interval=setInterval(()=>{
        //const radius=Math.random() * (30 - 10) + 10;
        const radius= 2.5;
        //spawn location of enemies
        let x;
        let y;
        //spawning enemies from both horizontal and vertical axis
        x=  Math.random() * canvas.width; 
        y= Math.random() * canvas.height;       
        
        //random color generation for enemy     
        const color= `hsl(  ${ Math.random() * 360 }, 50%, 50%)`;     
       
        if(stars.length < 70){
            stars.push(new Star(x,y,radius,color));   
        }   
        else{
            clearInterval(interval);
        }
    },10);
}
