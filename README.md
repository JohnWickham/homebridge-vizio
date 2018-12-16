# homebridge-vizio
A Homebridge plugin for controlling your Vizio Smartcast display using HomeKit or Siri. [What can I do with it?](#controlling-your-display)

## Getting Started
You'll need to install [Homebridge](https://github.com/nfarina/homebridge) first:

````
sudo npm install -g homebridge
````

Then, install `homebridge-vizio`:

````
npm install homebridge-vizio
````

## Setting Up
To configure `homebridge-vizio`, you'll need to know the LAN IP address or hostname of your display. You can find this in the SmartCast app, or on the display's menu.

**Note**: it's recommended that you use the display's hostname, as it isn't likely to change like it's IP address will. The default hostname appears to be `viziocasttv.local`.

You'll need to pair your display with Homebridge so your display will accept commands to control it. `homebridge-vizio` comes with a helpful setup script that walks you through the process. To use it, use:

````
node node_modules/homebridge-vizio/setup.js
````

You'll be asked for the IP address of your display (try using `viziocasttv.local` if you don't know it), then for the PIN code that the display shows on-screen. Then, you'll be shown an "access token"; copy the token, you'll need it in a moment.

## Configuring Homebridge
Homebridge uses a [JSON file](https://github.com/nfarina/homebridge#quick-overview) to determine what accessories are exposed to HomeKit. Add the following entry to your `config.json`:

````
"accessories": [
    {
        "accessory": "VizioDisplay",
        "name": "Whatever Name You Want",
        "token": "YOUR ACCESS TOKEN",
        "address": "YOUR DISPLAY'S IP ADDRESS"
    }
]
````

## Controlling Your Display
Currently, `homebridge-vizio` only supports turning your display on and off. As Apple adds more service capabilities and accessory types to HomeKit, `homebridge-vizio` can grow to support more functionality.

## How it Works
`homebridge-vizio` is based on [`vizio-smart-cast`](https://github.com/heathbar/vizio-smart-cast/blob/master/README.md) by [Heath Paddock](https://github.com/heathbar). Many thanks to him for his excellent work.
