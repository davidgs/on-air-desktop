#
An Electron App to turn my 'OnAir' light on and off.

It's really simple. Hit the button and it changes the `Off` to `On` and sends a single UDP4 packet to the sign on port 4444 with either `OFF` or `ON`. The sign has an ESP8266 with a latching relay on it. It just executes the On/Off command by toggling a GPIO pin to control the latching relay. 
