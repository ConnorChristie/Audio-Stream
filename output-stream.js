const os = require('os');
const Transform = require('stream').Transform;
const Platforms = require('./constants').Platforms;

const path = require('path');
const util = require('util');
const spawn = require('child_process').spawn;

function AudioOutputStream(device) {
    Transform.call(this);

    this.process = spawnCommand(device);

    this.pipe(this.process.stdin);
}

util.inherits(AudioOutputStream, Transform);

AudioOutputStream.prototype._transform = function (chunk, enc, cb) {
    this.push(chunk);
    cb();
};

function spawnCommand(device) {
    let command;
    let args = [];

    switch (os.platform()) {
        case Platforms.WINDOWS:
            command = 'python';
            args.push(path.join(__dirname, 'writer.py'), device);

            break;
        case Platforms.LINUX:
            command = 'arecord';
            args.push('-D', device);

            break;
    }

    if (command !== undefined) {
        return spawn(command, args);
    }

    return null;
}

module.exports = AudioOutputStream;
