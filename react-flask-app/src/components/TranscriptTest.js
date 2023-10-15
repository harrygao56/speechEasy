const TranscriptTest = () => {
    async function run() {
        let socket;
        let recorder;
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
        document.getElementById("message").innerText = msg;
        };

        socket.onerror = (event) => {
            console.error(event);
            socket.close();
        };

        socket.onclose = (event) => {
            console.log(event);
            socket = null;
        };

        socket.onopen = () => {
        // console.log("listening");
        // once socket is open, begin recording
        document.getElementById("message").innerText = "";
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
            recorder = new RecordRTC(stream, {
                type: "audio",
                mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
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

    

    async function startRecord(isRecording) {
        if (isRecording){
            let speech = document.getElementById("message").innerText;
            
            const formData = new FormData();
            formData.append('talking_point', "The reason I am here today is to talk about cybersecurity awareness and to motivate you to become involved in the National Cybersecurity Awareness Campaign. In May 2009, President Obama issued the Cyberspace Policy Review, which recommends the Federal government “initiate a national public awareness and education campaign informed by previous successful campaigns.” The Department of Homeland Security launched the Stop. Think. Connect.™ (STC) Campaign in October 2010 in conjunction with National Cybersecurity Awareness Month. Stop. Think. Connect. is part of an unprecedented effort among Federal and State governments, industry, and non-profit organizations to promote safe online behavior and practices. Together we are working to combat threats and raise awareness across this country. Now, we want to get you to become an active member of the campaign to help us raise cybersecurity awareness with your family and friends and in your community.");
            formData.append('speech', speech);
            const response = await fetch("http://127.0.0.1:5000/compare", {
                method: "POST",
                body: formData,
            });
            const output = await response.json();
            console.log(speech);
            console.log(output);
            run();
        }
        run();
    }

    return (
        <div className="totalTimeBox">
            <h1>Transcription Test</h1>
            <p id="real-time-title">Click start to begin recording!</p>
            <button id="button" onClick={function() { startRecord(false); setInterval(startRecord, 15000, true); }}>Start</button>
            <p id="message"></p>
        </div>
    );
};

export default TranscriptTest;