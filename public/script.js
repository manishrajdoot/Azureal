const connectButton = document.getElementById('connectButton');
const remoteAudio = document.getElementById('remoteAudio');
const statusBar = document.getElementById('statusBar');
const errorMessage = document.getElementById('errorMessage');

let pc;
let localStream;
let socket;

if (!navigator.mediaDevices || !window.RTCPeerConnection) {
    errorMessage.textContent = 'WebRTC is not supported in this browser.';
    connectButton.disabled = true;
}

function updateStatus(message) {
    statusBar.textContent = `Status: ${message}`;
}

function showError(message) {
    errorMessage.textContent = message;
    setTimeout(() => (errorMessage.textContent = ''), 5000);
}

function initializeSocket() {
    // डायनामिक URL - लोकल या प्रोडक्शन वातावरण के अनुसार कनेक्ट करेगा
    const socketURL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : window.location.origin;
    socket = io(socketURL);

    socket.on('connect', () => {
        updateStatus('Connected to signaling server');
    });

    socket.on('connect_error', (error) => {
        showError('Failed to connect to signaling server: ' + error.message);
        updateStatus('Disconnected');
    });

    socket.on('offer', async (offer) => {
        console.log('Received offer:', offer);
        await handleOffer(offer);
    });

    socket.on('answer', async (answer) => {
        console.log('Received answer:', answer);
        await pc.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', async (candidate) => {
        try {
            await pc.addIceCandidate(candidate);
        } catch (e) {
            console.error('Error adding ICE candidate:', e);
        }
    });
}

function createPeerConnection() {
    pc = new RTCPeerConnection();

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
        }
    };

    pc.ontrack = (event) => {
        remoteAudio.srcObject = event.streams[0];
        updateStatus('Streaming audio');
    };

    pc.oniceconnectionstatechange = () => {
        updateStatus(pc.iceConnectionState);
        if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
            showError('Connection lost. Please reconnect.');
        }
    };
}

async function connect() {
    updateStatus('Connecting...');
    connectButton.disabled = true;

    initializeSocket();
    createPeerConnection();

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        updateStatus('Microphone enabled');
    } catch (error) {
        showError('Error accessing microphone: ' + error.message);
        updateStatus('Disconnected');
        connectButton.disabled = false;
        return;
    }

    try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', offer);
    } catch (error) {
        showError('Error creating offer: ' + error.message);
        updateStatus('Disconnected');
        connectButton.disabled = false;
    }
}

async function handleOffer(offer) {
    createPeerConnection();
    await pc.setRemoteDescription(offer);

    try {
        if (!localStream) {
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        }
    } catch (error) {
        showError('Error accessing microphone: ' + error.message);
        return;
    }

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('answer', answer);
}

connectButton.addEventListener('click', connect);