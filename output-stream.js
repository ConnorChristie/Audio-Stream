const os = require('os');
const Transform = require('stream').Transform;
const Platforms = require('./constants').Platforms;

const path = require('path');
const util = require('util');
const spawn = require('child_process').spawn;

function AudioOutputStream(device, args) {
    Transform.call(this);

    this.process = spawnCommand(device, args || []);

    this.pipe(this.process.stdin);
}

util.inherits(AudioOutputStream, Transform);

AudioOutputStream.prototype._transform = function (chunk, enc, cb) {
    this.push(chunk);
    cb();
};

AudioOutputStream.prototype.kill = function () {
    this.process.kill();
};

function spawnCommand(device, additionalArgs) {
    let command;
    let args = [];

    switch (os.platform()) {
        case Platforms.WINDOWS:
            command = 'python';
            args.push(path.join(__dirname, 'writer.py'), device, ...additionalArgs);

            break;
        case Platforms.LINUX:
            command = 'aplay';
            args.push('-D', device, ...additionalArgs);

            break;
    }

    if (command !== undefined) {
        return spawn(command, args);
    }

    return null;
}

module.exports = AudioOutputStream;
