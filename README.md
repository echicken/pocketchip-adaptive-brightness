# pocketchip-adaptive-brightness
Adjust PocketCHIP's screen brightness to suit its environment.

![Demo](https://bbs.electronicchicken.com/temp/pocketchip-adaptive-brightness.gif)

### Hardware

- Connect a light-dependent resistor (LDR) in series with a 10K resistor between +3V and Ground
- Connect the junction of the LDR and the resistor to the ADC pin

### Software

This script works thanks to the very useful [chip-io](https://github.com/sandeepmistry/node-chip-io) and [johnny-five](https://github.com/rwaldron/johnny-five).  These are a bit bloaty for such a simple app as this, but meh.

I've tested this with node.js 6.6.0.  It'll probably work on earlier versions with some changes.

#### Installation

I could automate more of this, but for now I won't.

```sh
cd /path/to/pocketchip-adaptive-brightness
npm install
chmod +x ./index.js
```

(This will take a while, because of slowness and some bloat.)

To try it out:

```sh
./index.js
```

If you want to run this as a background service, edit *pocketchip-adaptive-brightness.service* so that the *ExecPath* value points to the correct place, then:

```sh
sudo cp pocketchip-adaptive-brightness.service
sudo systemctl start pocketchip-adaptive-brightness start
```

If you want the service to start up automatically upon boot:

```sh
sudo systemctl enable pocketchip-adaptive-brightness
```

### Disclaimer

Follow the above instructions at your own risk.