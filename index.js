var vizio = require('vizio-smart-cast');
var Accessory, Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-vizio', 'VizioDisplay', VizioDisplay);
}

function VizioDisplay(log, config, api) {

	var platform = this;
	this.log = log;
	this.config = config;
	this.accessories = [];
	
	this.log("Connecting to Vizio display…");

	this.deviceAddress = config.address;
	this.accessToken = config.token;
	this.displayDevice = new vizio(this.deviceAddress);
	this.displayDevice.pairing.useAuthToken(this.accessToken);
	
	this.log("Connected to Vizio display at " + this.deviceAddress);

	var powerService = new Service.Switch(this.name);
	powerService.getCharacteristic(Characteristic.On).on('get', this.getPowerState.bind(this)).on('set', this.setPowerState.bind(this));	

	this.services = [powerService];
	
}

/* Power Service */

// Get the power state of the display
VizioDisplay.prototype.getPowerState = function(callback) {

	this.log("Fetching Vizio display power state…");

	if (!this.displayDevice) {
		this.log("Couldn't fetch Vizio display power state because no display is connected.");
		callback(null, false);
		return;
	}
	
	this.displayDevice.power.currentMode().then((result) => {
		
		var powerState = result.ITEMS[0].VALUE;
		var isPowerOn = powerState == 1;

		this.log("Vizio display is", (isPowerOn ? "on" : "off"));
	
		callback(null, isPowerOn);

	});

}

// Set the power state of the display
VizioDisplay.prototype.setPowerState = function(state, callback) {
	
	var powerPromise;

	if (state == 1) {
		powerPromise = this.displayDevice.control.power.on();
	}
	else {
		powerPromise = this.displayDevice.control.power.off();
	}

	this.log("Turning Vizio display", (state == 1 ? "on" : "off"));

	powerPromise.then((result) => {
		
		var status = result.STATUS.RESULT;
		var success = status == "SUCCESS" ? 1 : 0;
		callback(null, success);
	
	});

}

VizioDisplay.prototype.getServices = function() {
	return this.services;
}
