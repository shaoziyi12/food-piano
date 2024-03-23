// Food Piano - play sounds corresponding to food's color, @author Ziyi Shao

let serial; // variable to hold an instance of the serialport library
let last_button = 1;
let color_hue;
let color_index;
let sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9;

function preload(){
  soundFormats('mp3','ogg');
  assets = "asset/";
  sound0 = loadSound(assets+'sound0');
  sound1 = loadSound(assets+'sound1');
  sound2 = loadSound(assets+'sound2');
  sound3 = loadSound(assets+'sound3');
  sound4 = loadSound(assets+'sound4');
  sound5 = loadSound(assets+'sound5');
  sound6 = loadSound(assets+'sound6');
  sound7 = loadSound(assets+'sound7');
  sound8 = loadSound(assets+'sound8');
  sound9 = loadSound(assets+'sound9');
}

function setup() {
  cnv = createCanvas(390, 665);
  cnv.mousePressed(playSound);
  background(200);
  serial = new p5.SerialPort('192.168.50.187'); // make an instance of the serialport library
  serial.open('/dev/tty.usbserial-1410'); // assuming arduino is connected, open the connection to it
  serial.on('data', gotData); // call for when new data arrives
  serial.on('error', gotError); // call for when got an error
  serial.clear(); //empty the buffer, removes all the data stored there.
}

function playSound(){
  color_index =  Math.floor(color_hue/36);  // 10 notes, 0-9
  //if(color_index>9) color_index=9;
  print(color_hue, color_index);
  eval('sound'+color_index).play(); // play preload sound file
}

function gotData() {
  let inLine = serial.readLine(); // get the RGB data string from incoming string line

  if (inLine.length > 0) {
    let inData = split(inLine, ','); // get the R,G,B values
    colorMode(RGB);
  	let c =  color(inData[0], inData[1], inData[2]);
  	color_hue = hue(c);
    if((inData[3] == 0)&&(last_button == 1)){
      playSound();
    }
    last_button = inData[3];
  }
}

function gotError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function draw() {
  colorMode(HSB);
  stroke(0, 0, 100);

  // show the sensoring color
  fill(color_hue, 80, 100);
  rect(150, 625, 90, 30, 20);

  // show a piano color pad
  // 9, A, hue > 342
	if(color_index == 9) {fill(330, 80, 95)} else {fill(330, 80,100)};
	beginShape(TESS);
	vertex(145, 25);
	vertex(305, 25);
	bezierVertex(305, 25, 335, 25, 335, 55);
	vertex(335, 120);
	vertex(240, 120);
	vertex(240, 95);
	vertex(145, 95);
	endShape(CLOSE);

	// 8, G#, hue > 306
	if(color_index == 8) {fill(290, 80, 95)} else {fill(290, 80,100)};
	beginShape(TESS);
	vertex(50, 55);
	bezierVertex(50, 55, 50, 25, 80, 25);
	vertex(145, 25);
	vertex(145, 95);
	vertex(240, 95);
	vertex(240, 145);
	vertex(145, 145);
	vertex(145, 172);
	vertex(50, 172);
	endShape(CLOSE);

  // 7, G, hue > 270
	if(color_index == 7) {fill(275, 80, 95)} else {fill(275, 80,100)};
	beginShape(TESS);
	vertex(335, 120);
	vertex(240, 120);
	vertex(240, 145);
	vertex(145, 145);
	vertex(145, 195);
	vertex(240, 195);
	vertex(240, 220);
	vertex(335, 220);
	endShape(CLOSE);

  // 6, F#, hue > 234
	if(color_index == 6) {fill(250, 80, 95)} else {fill(250, 80,100)};
    beginShape(TESS);
	vertex(50, 172);
	vertex(145, 172);
	vertex(145, 195);
	vertex(240, 195);
	vertex(240, 250);
	vertex(145, 250);
	vertex(145, 320);
	vertex(50, 320);
	endShape(CLOSE);

	// 5, F, hue > 198
	if(color_index == 5) {fill(205, 80, 95)} else {fill(205, 80,100)};
	beginShape(TESS);
	vertex(335, 220);
	vertex(240, 220);
	vertex(240, 250);
	vertex(145, 250);
	vertex(145, 320);
	vertex(335, 320);
	endShape(CLOSE);

	// 4, E, hue > 162
	if(color_index == 4) {fill(185, 80, 95)} else {fill(185, 80,100)};
	beginShape(TESS);
	vertex(335, 320);
	vertex(145, 320);
	vertex(145, 395);
	vertex(240, 395);
	vertex(240, 420);
	vertex(335, 420);
	endShape(CLOSE);

	// 3, D#, hue > 126
	if(color_index == 3) {fill(160, 80, 95)} else {fill(160, 80,100)};
	beginShape(TESS);
	vertex(50, 320);
	vertex(145, 320);
	vertex(145, 395);
	vertex(240, 395);
	vertex(240, 445);
	vertex(145, 445);
	vertex(145, 470);
	vertex(50, 470);
	endShape(CLOSE);

	// 2, D, hue > 90
	if(color_index == 2) {fill(100, 80, 95)} else {fill(100, 80,100)};
	beginShape(TESS);
	vertex(335, 420);
	vertex(240, 420);
	vertex(240, 445);
	vertex(145, 445);
	vertex(145, 495);
	vertex(240, 495);
	vertex(240, 520);
	vertex(335, 520);
	endShape(CLOSE);

	// 1, C#, hue > 54
	if(color_index == 1) {fill(70, 80, 95)} else {fill(70, 80,100)};
	beginShape(TESS);
	vertex(50, 470);
	vertex(145, 470);
	vertex(145, 495);
	vertex(240, 495);
	vertex(240, 545);
	vertex(145, 545);
	vertex(145, 615);
	vertex(80, 615);
	bezierVertex(80, 615, 50, 615, 50, 585);
	endShape(CLOSE);

	// 0, C, hue > 18
	if(color_index == 0) {fill(28, 80, 95)} else {fill(28, 80, 100)};
	beginShape(TESS);
	vertex(335, 520);
	vertex(240, 520);
	vertex(240, 545);
	vertex(145, 545);
	vertex(145, 615);
	vertex(305, 615);
	bezierVertex(305, 615, 335, 615, 335, 585);
	endShape(CLOSE);

}