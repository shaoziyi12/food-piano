# food-piano
## enjoy music!!!
![food piano](/asset/images/title.png)

Designed a "Food Piano" utilize tableware (such as chopsticks) that can detect colors when picking up food. Meanwhile, music can be played on mobile devices such as smartphones and tablets. Have a fun medium of communication and a pleasant dining experience!

![UI](/asset/images/food.gif)

## Prototype
- Color Sensor: 
A sensor to detect color and convert the food color to digital values of red, green, blue
- Microcontroller : 
Using the microcontroller Arduino to get the sensor digital value and send the data to computer.
- Color LED : 
It displays the color under controlling of Arduino. 
- Serial Communication: 
It connects Arduino to computer.

![prototype](/asset/images/prototype.png)

## Prototype circuit
1. Use a smaller size Arduino pro mini.
2. Use a wireless solution - Bluetooth (host/client) for serial communication.
3. Use a rechargeable lithium battery.
4. Design a switch that touches two stainless steel chopsticks to trigger. 
5. Add software serial and use PIN 8(RX) and 9(TX) connected to Bluetooth module for transparent serial transmission.
6. Add PIN 2 connected to chopstick as an input trigger. Once touch occurred, the Color LED turn on. Send the trigger state to p5 computer as well 
as RGB value.
![prototype](/asset/images/mini.png)

## Hardware and Structure

![hardware](/asset/images/hardware.png)

## Making
The color sensor are too large so I put optical fiber inside the chopstick to extend the sensor's range. 

![fiberinstall](/asset/images/fiberinstall.png)

### User interface

![ui](/asset/images/ui.png)