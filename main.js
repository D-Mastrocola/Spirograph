import Pendulumn from './objects/pendulumn.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let GRAVITY;
let pendulumn;
let init = () => {
    GRAVITY = 1;
    canvas.width = window.innerWidth;
    canvas.height =  window.innerHeight - 80;

    pendulumn = new Pendulumn(canvas.width/2 , canvas.height/2);
    window.requestAnimationFrame(gameLoop);
}
document.getElementById('first-arm-length-slider').addEventListener('change', () => {
    pendulumn.changeValues();
})
document.getElementById('second-arm-length-slider').addEventListener('change', () => {
    pendulumn.changeValues();
})
document.getElementById('first-arm-rotation-slider').addEventListener('change', () => {
    pendulumn.changeValues();
})
document.getElementById('second-arm-rotation-slider').addEventListener('change', () => {
    pendulumn.changeValues();
})
    



//---------------------------------
let secondsPassed;
let oldTimeStamp;
let fps;


let draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    pendulumn.draw(ctx);
}

let update = () => {
    pendulumn.update(GRAVITY);
    draw();
}
function gameLoop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    // Draw number to the screen

    // Perform the drawing operation
    update(timeStamp);

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}
init();