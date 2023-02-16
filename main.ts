let PERIOD = 10;
let LIGHT_THRESHOLD = 50;
let WEIGHT = 3;



radio.setGroup(45)
radio.setTransmitPower(7)
radio.setFrequencyBand(55)
radio.setTransmitSerialNumber(true)
let mySerial = control.deviceSerialNumber()


let startTime = 0;
let average = 0;

function calculateAverage(x: number) {
    average -= average / WEIGHT;
    average += x;

    return (average / WEIGHT);
}

function main() {
    while (true) {
        basic.pause(PERIOD);
        let lightLevel = calculateAverage(input.lightLevel());

        if (lightLevel > LIGHT_THRESHOLD) {
            continue;
        }

        if (startTime == 0) {
            continue;
        }

        let stopTime = control.millis();
        let vysledek = stopTime - startTime / 1000
        startTime = 0;
    basic.showNumber(vysledek)
    radio.sendValue("cas", vysledek)
    basic.pause(2000)
    }
}

basic.forever(function () {
    main();
});

radio.onReceivedValue(function (name: string, value: number) {
    if (value == 11) {
        startTime = control.millis();
    }
});

input.onButtonPressed(Button.A, function () {
    basic.clearScreen();
});

