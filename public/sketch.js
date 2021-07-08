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
let flying = 0;
let terrain = [];
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
function preload(){
  song = loadSound('CarlSagan.mp3');
  fft = new p5.FFT();

}

function setup() {
  stars = loadImage("StarBackdrop.jpg");
  amplitude = new p5.Amplitude();
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
  strokeWeight(0.1);
}

function draw() {
  //image(stars,0,0);
  beginShape();
  texture(stars);

  vertex(-scalar, -scalar, -2000, 0, 0);
  vertex(width+scalar, -scalar, -2000, 5000, 0);
  vertex(width+scalar, height+scalar, -2000, 5000, 3000);
  vertex(0-scalar, height+scalar, -2000, 0, 3000);
  endShape();
  var wave = fft.waveform();
  var amp = amplitude.getLevel();
  delay = delay + 1;
  //delay = delay +1;
  //console.log(amp);
  flying -= (.1);

  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;

    for (let x = 0; x < cols; x++) {
      //var index = floor(map(x,0,cols,0,wave.length));
    //  var temp = noise(xoff, yoff);
    //  var index = floor(map(temp,0,1,0,wave.length));
      //var temp = map(wave[index],0,1,0,100);
      //terrain[x][y] = wave[index]*50;


    ///  fixer[x] = terrain[x][y];
      //terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, 55)*(1+amp);
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, 0, floor(abs(x-cols/2)*15));

     // }
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  noStroke();
  //stroke(255);

  /*if(delay%5 == 0){
    topValue = 1;
  }
  else if(delay % 6 == 0){
    topValue = 3;
  }
  else{
    topValue = 5;
  }*/
  translate(0, -height/5);
  if(chamber >= topValue){
    chamber = 0;
  }

  stroke(255, 255);
  stroke(telemetry[chamber]);
  noFill();
  let radius = 100+amp*100;
  //frequency = 5+delay/10000;
  frequency = 11+delay/50000;
  beginShape(POINTS);
  	for (let i = 0; i < 360; i = i + 1) {
      var j = floor(map(i,0,360,0,wave.length));
      strokeWeight(3+cos(delay*PI));
  	  theta = i * (360 / 360);
  	  phase = ((PI) / 360);
  	  meh = (radius * 1.5) * sin((frequency+wave[j]*.001) * theta + phase) * cos(phase);
  	  osx = (10 + meh) * cos(theta);
  	  osy = (10 + meh) * sin(theta);
	    vertex(osx , osy ,0);
    }
  endShape();
  chamber = chamber+1;

  strokeWeight(0.1);
  translate(0, height/5);

  translate(0, 310);
  stroke(255);
  noFill();
  rotateX(PI/2.2);
  translate(-w/2, -h/2);
//colorMode(HSB, 100);
 for (let y = 0; y < rows-1; y++) {
    //rotateX(y*PI/cols);

    noStroke();
  //  fill(255,0,0,255);
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {

      //fill(100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,255);
    //  stroke(100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,100-100*terrain[x][y]/200,255);

     // if(delay>100){
     // stroke(240, 110, 150, 255*y/410);
    //  }
     //var loc = abs(rows/2-y) + abs(cols/2-x);
     //var loc = y*cols+x
     //var i = floor(map(loc,0,(rows/2+cols/2),0,wave.length));
    // var i = floor(map(loc,0,(rows*cols+cols),0,wave.length));

    // fill((215*cos(delay*PI/300)+20*wave[i]),sin(delay*PI/1000)*175+15*wave[i],175+10*wave[i]-terrain[x][y]*5,255);
     fill((215*cos(delay*PI/300)),sin(delay*PI/1000)*175,175+tan(delay*PI/4000)-terrain[x][y]*5,255);

     //noStroke();
    stroke(0,255);



      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);

    }

    endShape();

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
