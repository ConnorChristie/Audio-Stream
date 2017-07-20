# Audio-Stream

Allows getting an input or output audio stream to a specific device.

## Pre-Requirements

### Windows
Python and [PyAudio](https://people.csail.mit.edu/hubert/pyaudio/) to be installed

### Linux
Aplay and arecord to be installed, should come with linux by default

## Installation
```
npm i audio-stream -S
```

## API

### `AudioStream.Input`
```js
// @device - The device id for PyAudio or the device string for arecord
let inputStream = new AudioStream.Input(device);
```

### `AudioStream.Output`
```js
// @device - The device id for PyAudio or the device string for aplay
let outputStream = new AudioStream.Output(device);
```

## Code Example
```js
var AudioStream = require('audio-stream');

// Create a new input stream for the specified device
let inputStream = new AudioStream.Input(device);

// Create a new output stream for the specified device
let outputStream = new AudioStream.Output(device);

// Pipe the input stream straight to the output stream
inputStream.pipe(outputStream);
```