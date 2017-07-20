const os = require('os');
const Transform = require('stream').Transform;
const Platforms = require('./constants').Platforms;

const path = require('path');
const util = require('util');
const spawn = require('child_process').spawn;

function AudioInputStream(device) {
    Transform.call(this);

    this.process = spawnCommand(device);

    this.process.stdout.pipe(this);
}

util.inherits(AudioInputStream, Transform);

AudioInputStream.prototype._transform = function (chunk, enc, cb) {
    this.push(chunk);
    cb();
};

function spawnCommand(device) {
    let command;
    let args = [];

    switch (os.platform()) {
        case Platforms.WINDOWS:
            command = 'python';
            args.push(path.join(__dirname, 'reader.py'), device);

            break;
        case Platforms.LINUX:
            command = 'aplay';
            args.push('-D', device);

            break;
    }

    if (command !== undefined) {
        return spawn(command, args);
    }

    return null;
}

module.exports = AudioInputStream;
