# Hacking a GameCube Controller to Taunt in Online Matches

##### July 5th, 2020

**TL;DR** - I made a [small C library](https://github.com/bschwind/ir-slinger) for sending infrared packets easily on the Raspberry Pi, wrote about how to reverse engineer an infrared remote for use in a [home automation server](https://github.com/bschwind/automation-server/), and made a simple infrared LED circuit controlled by the Pi. There's also a bonus [control panel](https://github.com/bschwind/automation-server/blob/master/web/src/automation/core.cljs) written in ClojureScript! If you're frustrated with LIRC, want to send dynamic infrared signals, or want to learn more about how devices communicate with infrared light, read on!
