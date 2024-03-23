// color test
#include <Wire.h>
#include "MH_TCS34725.h"
#include <Adafruit_NeoPixel.h>
#define PIN 6 // Arduino pin connected to the RGB Led

// a color sensor using MH_TCS34725 library
MH_TCS34725 sensor = MH_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);
// an RGB Led using NeoPixel library. 1 Led
Adafruit_NeoPixel led = Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(9600);
  sensor.begin();
  led.begin();
}

void loop() {
  // get r,g,b value from color sensor
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

  // Write r,g,b value to serial port
  Serial.print((int)r); 
  Serial.print(","); 
  Serial.print((int)g); 
  Serial.print(",");
  Serial.println((int)b);
  
 // light color led with r,g,b
  led.setPixelColor(0, led.Color((int)r, (int)g, (int)b));
  led.show(); // update color to hardware.
}
