let events = [];
let isRecording = false;
let startTime;

function startRecording() {
  events = []; // Limpa qualquer gravação anterior
  isRecording = true;
  startTime = Date.now();
}

function stopRecording() {
  isRecording = false;
}

document.querySelector('#code-editor').addEventListener('input', (e) => {
  if (isRecording) {
    const event = {
      type: 'input',
      timestamp: Date.now() - startTime,
      value: e.target.value,
    };
    events.push(event);
  }
});

let currentIndex = 0;
function replay() {
  if (currentIndex < events.length) {
    const event = events[currentIndex];
    document.querySelector('#code-editor').value = event.value;
    currentIndex++;
    setTimeout(replay, events[currentIndex]?.timestamp - event.timestamp);
  } else {
    currentIndex = 0; // Reset index for next replay
  }
}
