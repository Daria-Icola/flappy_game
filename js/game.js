const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Add image
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";


//Add audio
const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

/*// Функция перезапуска игры
function menu() {
    ctx.fillText(" Меню ", 20, cvs.height - 60);
    score_audio.play();
    // При нажатии на какую-либо кнопку
    document.addEventListener("keydown", location.reload);
} */

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}



var score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +
  pipeUp.height + gap);

  pipe[i].x--;

  if(pipe[i].x == 125) {
    pipe.push({
    x : cvs.width,
    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
    });
   }

   if(xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height +
        gap) || yPos + bird.height >= cvs.height - fg.height) {

            location.reload();

        }

   if(pipe[i].x == 5) {
    score++;
    score_audio.play();
   }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw();
