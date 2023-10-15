import { useState } from 'react';

const TranscriptTest = () => {
    const [color, setColor] = useState("green"); 
    const [currInterval, setCurrInterval] = useState("");
    
    var totalChars = 0;
    var speechIntervals = [""];
    var socket;
    var recorder;

    async function run() {
        const response = await fetch("http://localhost:8000"); // get temp session token from server.js (backend)
        const data = await response.json();

        if (data.error) {
            alert(data.error);
        }

        const { token } = data;

        // establish wss with AssemblyAI (AAI) at 16000 sample rate
        socket = await new WebSocket(
            `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`,
        );

        // handle incoming messages to display transcription to the DOM
        const texts = {};
        socket.onmessage = (message) => {
            let msg = "";
            const res = JSON.parse(message.data);
            texts[res.audio_start] = res.text;
            const keys = Object.keys(texts);
            keys.sort((a, b) => a - b);
            for (const key of keys) {
                if (texts[key]) {
                    msg += ` ${texts[key]}`;
                }
            }
            let newmsg = msg.slice(totalChars);
            speechIntervals[speechIntervals.length - 1] = newmsg;
            document.getElementById("message").innerText = newmsg;
        };

        socket.onerror = (event) => {
            // console.error(event);
            socket.close();
        };

        socket.onclose = (event) => {
            // console.log(event);
            socket = null;
        };

        socket.onopen = () => {
        // console.log("listening");
        // once socket is open, begin recording
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
            // eslint-disable-next-line no-undef
            recorder = new RecordRTC(stream, {
                type: "audio",
                mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
                // eslint-disable-next-line no-undef
                recorderType: StereoAudioRecorder,
                timeSlice: 250, // set 250 ms intervals of data that sends to AAI
                desiredSampRate: 16000,
                numberOfAudioChannels: 1, // real-time requires only one channel
                bufferSize: 16384,
                audioBitsPerSecond: 128000,
                ondataavailable: (blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64data = reader.result;

                    // audio data must be sent as a base64 encoded string
                    if (socket) {
                    socket.send(
                        JSON.stringify({
                        audio_data: base64data.split("base64,")[1],
                        }),
                    );
                    }
                };
                reader.readAsDataURL(blob);
                },
            });

            recorder.startRecording();
            })
            .catch((err) => console.error(err));
        };
    }

    function stop() {
        console.log(socket);
        if (socket) {
            socket.send(JSON.stringify({ terminate_session: true }));
            socket.close();
            socket = null;
        }
        if (recorder) {
            recorder.pauseRecording();
            recorder = null;
        }
    }

    async function compare() {
        let speech = speechIntervals[speechIntervals.length - 1];
        totalChars += speech.length;
        speechIntervals.push("");

        const formData = new FormData();
        formData.append('talking_point', "cheese");
        formData.append('speech', speech);
        const response = await fetch("http://127.0.0.1:5000/compare", {
            method: "POST",
            body: formData,
        });
        const output = await response.json();
        console.log(speech);
        console.log(output);
        if (output === "True") {
            setColor("green");
        }
        else {
            setColor("red");
        }
    }

    return (
        <div className="totalTimeBox">
            <h1>Transcription Test</h1>
            <p id="real-time-title">Click start to begin recording!</p>
            <button id="button" onClick={function() {
                run();
                setCurrInterval(setInterval(compare, 10000));
            }}>Start</button>
            <button onClick={function() {
                clearInterval(currInterval);
                stop();
            }}>Stop</button>
            <div style={{width: "50px", height: "50px", backgroundColor: color}}></div>
            <p id="message"></p>
        </div>
    );
};

export default TranscriptTest;