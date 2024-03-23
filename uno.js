// Test of food color to sound
let serial;
let color_hue = 0;
let osc;
function setup() {
  cnv = createCanvas(390, 665);
  cnv.mousePressed(playOsc);
  background(255);
  osc = new p5.TriOsc();
  serial = new p5.SerialPort('10.12.2.176'); // make an instance of the serialport library
  serial.open('/dev/tty.usbserial-1420'); // assuming arduino is connected, open the connection to it
  serial.on('data', gotData); // call for when new data arrives
  serial.on('error', gotError); // call for when got an error
  serial.clear(); //empty the buffer, removes all the data stored there.
}

function draw() {
  colorMode(HSB);
  stroke(255);
	for(i=0; i<10; i++){
	  fill(i*36, 80, 100);
	  rect(150, 50+i*60, 220, 60);
	}
	fill(color_hue, 80, 100);
  rect(10, 50, 130, 600);
  fill(0,0,0);
  textSize(32);
  text('Sensor hue: ' + int(color_hue), 50, 40);
}

function playOsc(){
	osc.amp(0.5);
	osc.freq(color_hue*2);
	osc.start();
}

function gotData() {
  let inLine = serial.readLine(); // get the RGB data string from incoming string line
  if (inLine.length > 0) {
    inData = split(inLine, ','); // get the R,G,B values
    colorMode(RGB);
  	let c =  color(inData[0], inData[1], inData[2]);
  	color_hue = hue(c);
  }
}

function gotError(err) {
  print('Something went wrong with the serial port. ' + err);
}
