#!/usr/local/bin/node

const fs = require('fs');
const Five = require('johnny-five');
const ChipIO = require('chip-io');

const brightfile = '/sys/class/backlight/backlight/brightness';

function adaptiveBrightness() {

	var ignore = false;
	var brightness = parseInt(fs.readFileSync(brightfile, 'utf8'));

	fs.watchFile(
		brightfile, (c, p) => {
			if (ignore) {
				ignore = false;
			} else {
				brightness = parseInt(fs.readFileSync(brightfile, 'utf8'));
			}
		}
	);

	var adc = new Five.Pin({ pin : 'LRADC', type : 'analog' });
	adc.read(
		(err, val) => {
			if (brightness !== 0) {
				val = Math.ceil(val * .1);
				if (val !== brightness) {
					ignore = true;
					brightness = val;
					fs.writeFileSync(brightfile, brightness.toString(), 'utf8');
				}
			}
		}
	);

}

function initCHIP(callback) {
	var board = new Five.Board(
		{	io : new ChipIO(),
			repl : false,
			debug : false
		}
	);
	board.on('ready', callback);
}

initCHIP(adaptiveBrightness);