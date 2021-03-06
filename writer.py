import pyaudio
import sys

CHUNK = 1024
WIDTH = 2
CHANNELS = 2
RATE = 44100

def main(device_id):
    p = pyaudio.PyAudio()

    stream = p.open(format=p.get_format_from_width(WIDTH),
                    channels=CHANNELS,
                    rate=RATE,
                    output=True,
                    frames_per_buffer=CHUNK,
                    output_device_index=device_id)

    while True:
        try:
            data = sys.stdin.buffer.read(CHUNK)
            stream.write(data)
        except KeyboardInterrupt:
            stream.stop_stream()
            stream.close()
            p.terminate()
            sys.exit()


if __name__ == '__main__':
    device_id = int(sys.argv[1])
    main(device_id)
