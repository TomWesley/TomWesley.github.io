var LINE_C=25;
let full = true;
let miniScreen = 0;
let backgroundCount = 0;
//Music related variables
var song;
var fft;

let cols= 0
let rows= 0;
let scl = 20;
let telemetry =[];
//int w =5000;
let w = 1800;
//int h = 8200;
let h = 800;
let delay = 0 ;
let opac = 255;
let chamber =0;
var fixer=[];
var tempVariable = 0;
let stars;
let scalar = 3000;
let theta = 0;
let phase = 0;
let meh = 0;
let osx = 0;
let osy = 0;
let frequency = 7;
let topValue=5;
var amplitude;

let xValue = 0;
let yValue = 0;
let unitStepX = 5;
let unitStepY = 5;

function preload(){
  song = loadSound('CarlSagan.mp3');
  fft = new p5.FFT();

}

function setup() {
  angleMode(DEGREES);
  stars = loadImage("StarBackdrop.jpg");
  amplitude = new p5.Amplitude();
  telemetry[0]=color(255, 110, 150, opac);
  telemetry[1] =color(255, 200, 10, opac);
  telemetry[2] =color(43, 88, 222,opac);
  telemetry[3] =color(53, 200, 154,opac);
  //telemetry[4] =color(0,0,0,opac);
  telemetry[4] =color(255,255,255,opac);

  //fullScreen(P3D);
  createCanvas(1280,720);
  //size(1080, 1350, P3D);
  cols = (w / scl);
  rows = (h/ scl);
  //terrain = new float[cols][rows];
  strokeWeight(0.1);
}

function draw() {
  image(stars,0,0);
/*  beginShape();
  texture(stars);

  vertex(-scalar, -scalar, -2000, 0, 0);
  vertex(width+scalar, -scalar, -2000, 5000, 0);
  vertex(width+scalar, height+scalar, -2000, 5000, 3000);
  vertex(0-scalar, height+scalar, -2000, 0, 3000);
  endShape();*/
  var wave = fft.waveform();
  var amp = amplitude.getLevel();
  delay = delay + 1;
  //delay = delay +1;
  //console.log(amp);

  /*if(delay%5 == 0){
    topValue = 1;
  }
  else if(delay % 6 == 0){
    topValue = 3;
  }
  else{
    topValue = 5;
  }*/

  if(chamber >= topValue){
    chamber = 0;
  }
  let circleSize = 300;
  stroke(telemetry[chamber]);
  noFill();
  stroke(255);
  strokeWeight(2);
  xValue = xValue + unitStepX;
  yValue = yValue + unitStepY;

  if(xValue <= -width/2 + circleSize/2 || xValue >= width/2 - circleSize/2){
    unitStepX = unitStepX*-1;
  }
  if(yValue <= -height/2 + circleSize/2 || yValue >= height/2 - circleSize/2){
    unitStepY = unitStepY*-1;
  }
  translate(width/2, height/2);
  let volume = amp*circleSize;

  beginShape();
  for(let angle = 0; angle <= 180; angle = angle+1){
    let index = floor(map(angle, 0, 180, 0, wave.length));
    let r = map(wave[index], -1, 1, circleSize/3, circleSize);

    let x = r * sin(angle) + xValue;
    let y = r * cos(angle) + yValue;
  //  x=(circleSize+(volume)*wave[index])*cos(radians(angle))-0;
  //  y=(circleSize+(volume)*wave[index])*sin(radians(angle))+0;
    vertex(x,y);
  }
  endShape();
  translate(-width/2, -height/2);
  //frequency = 5+delay/10000;
  frequency = 11+delay/50000;

  chamber = chamber+1;

  strokeWeight(0.1);

  translate(0, 310);
  stroke(255);
  noFill();
  translate(-w/2, -h/2);
//colorMode(HSB, 100);


}


function mouseClicked() {
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}
