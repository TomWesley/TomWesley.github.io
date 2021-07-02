var LINE_C=25;
var delay=0
let full = true;
let miniScreen = 0;
let backgroundCount = 0;
let wave = 5;
var song;

let cols, rows;
let scl = 20;
let telemetry =[];
//int w =5000;
let w = 5000;
//int h = 8200;
let h = 7000;
let delay = 0 ;
let opac = 255;
let flying = 0;
let terrain = [][];
//let chamber =0;
function preload(){
  song = loadSound('CarlSagan.mp3');
}

function setup() {
  telemetry[0]=color(255, 110, 150, opac);
telemetry[1] =color(255, 200, 10, opac);
telemetry[2] =color(43, 88, 222,opac);
telemetry[3] =color(53, 200, 154,opac);
//telemetry[4] =color(0,0,0,opac);
telemetry[4] =color(255,255,255,opac);

  //fullScreen(P3D);
  size(1080, 1350, P3D);
  cols = (w / scl);
  rows = (h/ scl);
  //terrain = new float[cols][rows];
}

function draw() {
  delay = delay +1;
  //delay = delay +1;
  flying -= .1;

  let yoff = flying;
  for (let y = 125; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
     /* if(delay > 150 && x < cols/2+(delay-150)*.01 && x > cols/2-(delay-150)*.01){
        terrain[x][y] = 0;
      }else{*/
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, delay);
     // }
      xoff += 0.1;
    }
    yoff += 0.1;
  }



  background(0+40*(1+tan(delay*PI/50)),0,0+70*(1+sin(delay*PI/50)));
  noStroke();
  //stroke(255);
  noFill();
  let topValue;
  /*if(delay%5 == 0){
    topValue = 1;
  }
  else if(delay % 6 == 0){
    topValue = 3;
  }
  else{
    topValue = 5;
  }*/
  topValue = 1;
  translate(width/2, height/2+250);
  rotateX(PI/2.2);
  translate(-w/2, -h/2);
  for (let y = 125; y < rows-1; y++) {
    rotateX(y*PI/cols);
    if(chamber >= topValue){
      chamber = 0;
    }
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {

      //fill(255-0*terrain[x][y]/200,200-120*terrain[x][y]/200,10-10*terrain[x][y]/200,255);
     // if(delay>100){
     // stroke(240, 110, 150, 255*y/410);
    //  }

    stroke(telemetry[chamber]);
      //stroke(240, 110, 150, 155+50*(1+cos(delay*PI/10)));
      //fill(43,88,222,255*y/410);
      fill(255);
      noFill();
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);

      //rect(x*scl, y*scl, scl, scl);

    }

    endShape();
     chamber = chamber+1;
    rotateX(-y*PI/cols);
  }
}


function mouseClicked() {
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
