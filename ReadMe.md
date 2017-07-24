# Audio-CMD-Stream

Allows getting an input or output audio stream to a specific device.

## Pre-Requirements

### Windows
Python and [PyAudio](https://people.csail.mit.edu/hubert/pyaudio/) to be installed

### Linux
Aplay and arecord to be installed, should come with linux by default

## Installation
```
npm i audio-cmd-stream -S
```

## API

### `AudioStream.Input`
```js
// @device - The device id for PyAudio or the device string for arecord
// @args - Additional arguments passed to the spawn command
let inputStream = new AudioStream.Input(device, args);
```

### `AudioStream.Output`
```js
// @device - The device id for PyAudio or the device string for aplay
// @args - Additional arguments passed to the spawn command
let outputStream = new AudioStream.Output(device, args);
```

## Code Example
```js
var AudioStream = require('audio-cmd-stream');

// Create a new input stream for the specified device using the specified additional arguments that are passed to arecord
let inputStream = new AudioStream.Input(device, ['-f', 'cd', '-t', 'raw']);

// Create a new output stream for the specified device
let outputStream = new AudioStream.Output(device);

// Pipe the input stream straight to the output stream
inputStream.pipe(outputStream);
```