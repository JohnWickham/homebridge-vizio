var smartcast = require('vizio-smart-cast');
var readline = require('readline');
var display;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promt the user to enter the IP address of the display
rl.question('Enter the IP address of your display: ', (answer) => {

	display = new smartcast(answer);
	
	if (!display) {
		throw new Error("Can't pair display: a Smartcast display wasn't found at that IP address.");
	}

	initiateParing();

});

// Tell the display to begin the pairing process
function initiateParing() {

	display.pairing.initiate().then((response) => {
		//Prompt the user to enter the PIN shown on the display
		askForPin();
	});
}

// Prompt the user to enter the PIN shown on the display
function askForPin() {

        rl.question('Enter the PIN shown on your display: ', (answer) => {
		
		// Attempt to pair with the display using the entered PIN
		commitPairing(answer);
		
		// Close the command-line entry
		rl.close();

	});
}

// Attempt to pair with the display using the entered PIN
function commitPairing(answer) {

	// Send the PIN to the smartcast device to complete the pairing process
        display.pairing.pair(answer).then((response) => {

                // Log the token to be used for future, authenticated requests
		console.log("Your display is paired! Here's your access token:", response.ITEM.AUTH_TOKEN, ". Copy that; you'll need it to configure Homebridge.");

	});

}
