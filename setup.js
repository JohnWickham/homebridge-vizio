var smartcast = require('vizio-smart-cast');
var readline = require('readline');
var display = new smartcast('192.168.1.4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

display.pairing.initiate().then((response) => {

    // prompt the user for the pin that is displayed on the smartcast device
    rl.question('Enter PIN:', (answer) => {

        // send the pin to the smartcast device to complete the pairing process
        display.pairing.pair(answer).then((response) => {

            // log the token to be used for future, authenticated requests
            console.log(response.ITEM.AUTH_TOKEN);
        });

        rl.close();
    });
});
