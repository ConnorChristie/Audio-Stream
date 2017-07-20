const AudioStream = require('./index');

var haha = new AudioStream.Input(1);
var haha2 = new AudioStream.Output(4);

haha.pipe(haha2);
