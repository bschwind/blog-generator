# Hacking a GameCube Controller to Taunt in Online Matches

##### July 5th, 2020

When playing Super Smash Bros. Utlimate online, the game disables the taunt function - normally activated with the D-pad. The taunt is an important tool in your arsenal though, it allows you to wage psychological warfare on your opponent. With it missing in online mode, players have to resort to other means of taunting, most commonly dash-dancing

[image of dash dancing](dash-dancing.png)

squatting (AKA tea-bagging)

[image of squatting](squatting.png)

or rarest of all, pivot walking

[image of pivot walking](pivot-walking.png)

Dash dancing is particularly fun and looks hilarious, but it puts a lot of wear on the controller and you need to change your grip to do it well. I got tired of this, so I decided to make a microcontroller dash dance for me.

## Enter the ESP8266

Here were my requirements for the controller:

* Works in a GameCube controller. I mean literally inside one, no extra wires hanging out.
* Connects directly to the controller's PCB, no man-in-the-middle protocol reverse-engineering or generation. That adds too much latency.
* Mimics the electrical signals of the buttons and analog sticks.
* Is updateable Over-The-Air.
* Can listen to button presses.
* Can mimic button presses.
* Can mimic analog control sticks.

and most importantly

* Can make my character do a goofy dash dance for as long as I want.

I'm quite familiar with Espressif's ESP8266 and the ESP32 line of microcontrollers so I opted to implement this project with an ESP8266. I didn't need the bluetooth functionality or the extra CPU core of the ESP32. 

## Inspecting the Controller

* Images of the controller
* What voltage is it?
* Are the buttons active high or active low?
* How does analog stick voltage work?
* Where are the points on the board where I can connect a wire?

## First Attempt

* Used a NodeMCU devkit
* Wrote a simple program which outputs high and low values around 60 times a second, stabbed two jumper wires on pins of the controller CPU to get a result.
* Wow that actually works really well.

## Issues with Floaty Pins

* Needed to set pins into "high impedance" mode to stop them setting an incorrect "zero" value for the sticks on console startup.

## Over-The-Air Updates

* Holding D-pad Up hosts a TCP server
* Wrote a Rust firmware updater to connect and send new firmware.

## Hardware Design

* ESP12E for its size
* Draw power directly from the controller
* Pain in the ass to solder

## Schematic

## PCB Design

## End Result
