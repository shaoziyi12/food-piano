/*
 * Foodpiano - play sounds corresponding to food color
 * @author Ziyi Shao
*/
let serial; // variable to hold an instance of the serialport library
let portName = 'COM7'; // arduino's serial port
let inData = [0, 0, 0]; // incoming serial data [R, G, B]
let polySynth; // an instance of PolySynth
let last_button = 1;
// 88 notes of piano keys
let note = ['A0', 'A0#', 'B0', 'C1', 'C1#', 'D1', 'D1#', 'E1', 'F1', 'F1#', 'G1', 'G1#', 'A1', 'A1#', 'B1', 'C2',
                     'C2#', 'D2', 'D2#', 'E2', 'F2', 'F2#', 'G2', 'G2#', 'A2', 'A2#', 'B2', 'C3', 'C3#', 'D3', 'D3#', 'E3',
                     'F3', 'F3#', 'G3', 'G3#', 'A3', 'A3#', 'B3', 'C4', 'C4#', 'D4', 'D4#', 'E4', 'F4', 'F4#', 'G4', 'G4#',
                     'A4', 'A4#', 'B4', 'C5', 'C5#', 'D5', 'D5#', 'E5', 'F5', 'F5#', 'G5', 'G5#', 'A5', 'A5#', 'B5', 'C6',
                     'C6#', 'D6', 'D6#', 'E6', 'F6', 'F6#', 'G6', 'G6#', 'A6', 'A6#', 'B6', 'C7', 'C7#', 'D7', 'D7#', 'E7',
                     'F7', 'F7#', 'G7', 'G7#', 'A7', 'A7#', 'B7', 'C8']
let speed_count = 30; // speed of playing with 30 frames interval, approximated 0.5s
let note_red; // red color convert to note
let note_green; // green color convert to note
let note_blue; // blue color conver to note
let mySound;

function preload(){
  soundFormats('mp3', 'ogg');
  for(let i=0; i<10; i++){
    eval('sound'+i) = loadSound('assets/sound'+i);
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  serial = new p5.SerialPort(); // make an instance of the serialport library
  serial.open(portName); // assuming arduino is connected, open the connection to it
  serial.on('data', gotData); // call for when new data arrives
  serial.on('error', gotError); // call for when got an error
  serial.clear(); //empty the buffer, removes all the data stored there.
  polySynth = new p5.PolySynth(); //// make a instance of the PolySynth
  userStartAudio(); //starts the Audio on a user click
}

function playnotes() {
  if(speed_count <= 1){
    speed_count = 30; // resume to 30 frames, approximately 0.5s interval
    let index_r = Math.floor(inData[0]/(255/88));  // allocate red color index in 88 piano keys
    let index_g = Math.floor(inData[1]/(255/88));  // allocate green color index in 88 piano keys
    let index_b = Math.floor(inData[2]/(255/88));  // allocate blue color index in 88 piano keys
    note_red = note[index_r]; // red color convert to note
    note_green = note[index_g]; // green color convert to note
    note_blue = note[index_b]; // blue color conver to note
    let vel = 0.5; // velocity (volume, from 0 to 1)
    let dur = 1; // note duration (in seconds)
    // play notes overlap with each other, the rhythms approximated by ratios of 1:1:2
    polySynth.play(note_red, vel, 0, dur); 
    polySynth.play(note_green, vel/2, dur/4, dur/4);
    polySynth.play(note_blue, vel/2, dur/2, dur/2);
  }else{
    speed_count = speed_count -1;
  }
}

function playSound(){
  let c = color(inData[0], inData[1], inData[2]);
  index =  Math.floor(hue(c)/36);  // 10 notes, 0-9
  eval('sound'+index).play(); // play preload sound file
}

function draw() {
  colorMode(HSB);
  // 0 - 9 color bar
  for(i=0; i<10; i++){
    fill(i*36, 100, 100);
    rect(100+i*50, 100, 40, 300);
  }
  // color sensoring
  colorMode(RGB);
  let c =  color(inData[0], inData[1], inData[2]);
  fill(c)
  square(200, 50, 60, 10);

  // get a color from touch
  

  textSize(30);
  text('Sensor(R,G,B): ' + inData[0] + ", " + inData[1] + ", " + inData[2], 100, 20);
  text("Playing notes: " + note_red + ", " + note_green + ", "+ note_blue , 100, 60);
  // playnotes();
}

function gotData() {
  let inLine = serial.readLine(); // get the RGB data string from incoming string line
  if (inLine.length > 0) {
    inData = split(inLine, ','); // get the R,G,B values
  }
  if((inData[3] == 0)&&(last_button == 1)){
    playSound();
  }
  last_button = inData[3];
}

function gotError(err) {
  print('Something went wrong with the serial port. ' + err);
}