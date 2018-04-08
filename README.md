# homebridge-vizio
A Homebridge plugin for controlling your Vizio Smartcast display using HomeKit or Siri.

## Getting Started
You'll need to install [Homebridge](https://github.com/nfarina/homebridge) first:

````
sudo npm install -g homebridge
````

Then, install `homebridge-vizio`:

````
npm install homebridge-vizio --save
````

## Setting Up
To configure `homebridge-vizio`, you'll need to know the LAN IP address of your display. You can find this in the Smartcast app, or on the display's menu.

You'll need to pair your display with Homebridge so your display will accept commands to control it. `homebridge-vizio` comes with a helpful setup script that walks you through the process. To use it, use:

````
node setup.js
````

You'll be asked for the IP address of your display, then for the PIN code that the display shows onscreen. Then, you'll be shown an "access token"; copy the token, you'll need it in a moment.

## Configuring Homebridge
Homebridge uses a [JSON file](https://github.com/nfarina/homebridge#quick-overview) to determine what accessories are exposed to HomeKit. Add the following entry to yours:

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
`homebridge-vizio` is based on [`vizio-smart-cast`](https://github.com/heathbar/vizio-smart-cast/blob/master/README.md) by [Heath Paddock](https://github.com/heathbar). Many thanks to his excellent work.
