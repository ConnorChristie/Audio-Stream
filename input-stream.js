const os = require('os');
const Transform = require('stream').Transform;
const Platforms = require('./constants').Platforms;

const path = require('path');
const util = require('util');
const spawn = require('child_process').spawn;

function AudioInputStream(device, args) {
    Transform.call(this);

    this.process = spawnCommand(device, args || []);

    this.process.stdout.pipe(this);
}

util.inherits(AudioInputStream, Transform);

AudioInputStream.prototype._transform = function (chunk, enc, cb) {
    this.push(chunk);
    cb();
};

AudioInputStream.prototype.kill = function () {
    this.process.kill();
};

function spawnCommand(device, additionalArgs) {
    let command;
    let args = [];

    switch (os.platform()) {
        case Platforms.WINDOWS:
            command = 'python';
            args.push(path.join(__dirname, 'reader.py'), device, ...additionalArgs);

            break;
        case Platforms.LINUX:
            command = 'arecord';
            args.push('-D', device, ...additionalArgs);

            break;
    }

    if (command !== undefined) {
        return spawn(command, args);
    }

    return null;
}

module.exports = AudioInputStream;
