
#include <Wire.h>
#include "MH_TCS34725.h"
#include <Adafruit_NeoPixel.h>
#include <SoftwareSerial.h>
#define PIN 6 // Arduino pin connected to the RGB Led

// a color sensor using MH_TCS34725 library
MH_TCS34725 sensor = MH_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);
// an RGB Led using NeoPixel library. 1 Led
Adafruit_NeoPixel led = Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);
// use software serial PIN 8（RX）and 9（TX）connected to bluetooth module
SoftwareSerial mySerial(8, 9); 

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  sensor.begin();
  led.begin();
  // Initialize the pin connect to chopstick as touch input
  pinMode(2, INPUT_PULLUP); 
}

void loop() {
  // get RGB value from color sensor
  uint16_t clear_light, red, green, blue;
  sensor.getRGBC(&red, &green, &blue, &clear_light);
  float r, g, b, sum;
  r = red;
  g = green;
  b = blue;
  sum = clear_light;
  r = r/sum * 256;
  g = g/sum * 256;
  b = b/sum * 256; 
  
  // get the touch state.
  int touch = digitalRead(2);
  
  // Write to bluetooth module and transmit to p5.serialport
  mySerial.print((int)r); 
  mySerial.print(","); 
  mySerial.print((int)g); 
  mySerial.print(",");
  mySerial.print((int)b);
  mySerial.print(",");
  mySerial.println(touch);

  // if touch occur, turn on the RGB Led
  if(touch==LOW){
    led.setPixelColor(0, led.Color((int)r, (int)g, (int)b));
  } else {led.setPixelColor(0, 0, 0, 0);}
  led.show(); 
}
