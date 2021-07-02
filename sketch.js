var LINE_C=25;
var delay=0
let full = true;
let miniScreen = 0;
let backgroundCount = 0;
let wave = 5;
var song;

function preload(){
  song = loadSound('CarlSagan.mp3');
}

function setup() {
  createCanvas(640, 360);
}

function draw() {
  translate(width/2, height/2);
  noStroke();
  backgroundCount = backgroundCount + 1;
  let temporary = radians(backgroundCount);
 fill((200 * abs(x(temporary))),(20 * abs(sin(temporary))),200 * abs(cos(temporary)),25);
  //fill(0,20);
  rect(-width/2, -height/2, width, height);
    //background(255,0,0);
  /*if(keyIsPressed){
    console.log(keyCode);
	if(keyCode == 114){
      rotate(radians(delay));
      //fullscreen(full);
      //resizeCanvas(displayWidth, displayHeight);
      //width=displayWidth;
      //height=displayHeight;
      if(full === true){
        full = false;
      }
      else{
        full = true;
      }

      keyIsPressed = false;
      miniScreen = 1;
    }
  }
  */

  if (keyIsDown(LEFT_ARROW)) {
    rotate(radians(-delay));
  }

  if (keyIsDown(RIGHT_ARROW)) {
    rotate(radians(delay));
  }


 // fullscreen();
 // background(0);

  delay=delay+1;


	let refx = 0;
	let refy = 0;
	let theta = 0;
    let phase = 0;
	let meh = 0;
	let osx = 0;
	let osy = 0;
    if(delay % 360 == 0){
      wave = int(random(3,25));
    }

	let rad = 360;
	let radius = .8*height*sin(radians(delay))/(PI);
	for (let i = 0; i < rad; i = i + 1) {

	  theta = i * (360 / rad);
	  phase = ((PI) / rad);
	  meh = (radius * 1.5 + 11.5) * sin(wave * theta + phase) * cos(phase);
	  osx = (width / 25 + meh) * cos(theta);
	  osy = (width / 25 + meh) * sin(theta);
      stroke(255, 4);
	  strokeWeight(5);
	  point(osx + refx, osy + refy);
      stroke(255, 7);
	  strokeWeight(4);
	  point(osx + refx, osy + refy);
      stroke(255, 100);
	  strokeWeight(2);
	  point(osx + refx, osy + refy);
	  stroke(255, 255);
	  strokeWeight(1);
	  point(osx + refx, osy + refy);
						}

   translate(-width/2, -height/2);
}

function mouseClicked(){
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}
function x(t) {
  let temp = exp(t)/(exp(t)+1);
 return temp;
}
function y(t) {
 let temp = 1 - (exp(t)/(exp(t*2)+1));
 return temp;
}
function z(t) {
 return sin(t*5) / 30;
}
function v(t) {
 return sqrt((50*50)-(t*t));
}
function vv(t) {
 return cos((t*t))*220;
}
function xx(t) {
 return sin((t*t))*220;
}
function w(u) {
 return tan(u/10)*150;
}
function w1(u) {
 return sin(u/10)*20;
}
function z1(u) {
 return cos(u/20) * 100;
}
