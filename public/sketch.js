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
let w = 1300;
//int h = 8200;
let h = 1200;
let delay = 0 ;
let opac = 255;
let flying = 0;
let terrain = [];
let chamber =0;
var fixer=[];
var tempVariable = 0;
function preload(){
  song = loadSound('CarlSagan.mp3');
  fft = new p5.FFT();
}

function setup() {
  telemetry[0]=color(255, 110, 150, opac);
  telemetry[1] =color(255, 200, 10, opac);
  telemetry[2] =color(43, 88, 222,opac);
  telemetry[3] =color(53, 200, 154,opac);
  //telemetry[4] =color(0,0,0,opac);
  telemetry[4] =color(255,255,255,opac);

  //fullScreen(P3D);
  createCanvas(1280,720, WEBGL);
  //size(1080, 1350, P3D);
  cols = (w / scl);
  rows = (h/ scl);
  for (let x = 0; x < cols; x++) {
    terrain[x] = []; // create nested array
  }
  //terrain = new float[cols][rows];
}

function draw() {
  var wave = fft.waveform();
  delay = delay + 1;
  //delay = delay +1;
  flying -= .2;

  let yoff = flying;
  if(delay < 2){
  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
     /* if(delay > 150 && x < cols/2+(delay-150)*.01 && x > cols/2-(delay-150)*.01){
        terrain[x][y] = 0;
      }else{*/
      //var index = floor(map(x,0,cols,0,wave.length));
      var temp = noise(xoff, yoff);
      var index = floor(map(temp,0,1,0,wave.length));
      //var temp = map(wave[index],0,1,0,100);
      //terrain[x][y] = wave[index]*50;

      terrain[x][y] = map(temp, 0, 1, 0, 30 + (100+wave[index]*100));

     // }
      xoff += 0.1;
    }
    yoff += 0.1;
  }
}
else{
  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
     /* if(delay > 150 && x < cols/2+(delay-150)*.01 && x > cols/2-(delay-150)*.01){
        terrain[x][y] = 0;
      }else{*/
      //var index = floor(map(x,0,cols,0,wave.length));
      var temp = noise(xoff, yoff);
      var index = floor(map(temp,0,1,0,wave.length));
      //var temp = map(wave[index],0,1,0,100);
      //terrain[x][y] = wave[index]*50;

    if(yoff == flying){
      fixer[x] = terrain[x][y];
      terrain[x][y] = map(temp, 0, 1, 0, 30 + (100+wave[index]*100));
    }
    else{

        tempVariable = terrain[x][y];
        terrain[x][y] = fixer[x];
        fixer[x] = tempVariable;

    }
     // }
      xoff += 0.1;
    }
    yoff += 0.1;
  }


}





  //background(0+40*(1+tan(delay*PI/50)),0,0+70*(1+sin(delay*PI/50)));
  background(0);
  noStroke();
  //stroke(255);
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
  translate(0, 100);
  stroke(255);
  noFill();
//  box(20);
  rotateX(PI/2.2);
  //console.log(-w/2);
  translate(-w/2, -h/2);
colorMode(HSB, 100);
  for (let y = 0; y < rows-1; y++) {
    //rotateX(y*PI/cols);
    if(chamber >= topValue){
      chamber = 0;
    }
    //stroke(240, 110, 150, 155+50*(1+cos(delay*PI/4)));
    //stroke(255);
    //stroke(43,88,222,255);

    noStroke();
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {

      //fill(100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,255);
    //  stroke(100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,255);

     // if(delay>100){
     // stroke(240, 110, 150, 255*y/410);
    //  }

     stroke(255,255*y/60);


      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);

    }

    endShape();
    chamber = chamber+1;
    //rotateX(-y*PI/cols);
  }

}


function mouseClicked() {
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}
