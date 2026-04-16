const presets = {
  greek_alphabet: {
    label: "Greek alphabet",
    lines: [
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Eta",
      "Theta",
      "Iota",
      "Kappa",
      "Lambda",
      "Mu",
      "Nu",
      "Xi",
      "Omicron",
      "Pi",
      "Rho",
      "Sigma",
      "Tau",
      "Upsilon",
      "Phi",
      "Chi",
      "Psi",
      "Omega",
    ],
  },
  months: {
    label: "Months of the year",
    lines: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  solar_system: {
    label: "Planets from the Sun",
    lines: [
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
    ],
  },
};

const presetSelect = document.getElementById("presetSelect");
const delayInput = document.getElementById("delayInput");
const delayOutput = document.getElementById("delayOutput");
const linesInput = document.getElementById("linesInput");
const sequenceMeta = document.getElementById("sequenceMeta");
const playButton = document.getElementById("playButton");
const controlPanel = document.getElementById("controlPanel");
const playbackScreen = document.getElementById("playbackScreen");
const sequenceLine = document.getElementById("sequenceLine");
const playbackMeta = document.getElementById("playbackMeta");
const stopButton = document.getElementById("stopButton");

let sequence = [];
let currentIndex = 0;
let playbackTimer = null;
let isPaused = false;

function populatePresets() {
  for (const [key, preset] of Object.entries(presets)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = preset.label;
    presetSelect.append(option);
  }
}

function updateDelayLabel() {
  delayOutput.value = `${delayInput.value} ms`;
  delayOutput.textContent = delayOutput.value;
}

function getSequenceFromInput() {
  return linesInput.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function updateSequenceMeta() {
  const lines = getSequenceFromInput();
  const noun = lines.length === 1 ? "line" : "lines";
  sequenceMeta.textContent = `${lines.length} ${noun} ready`;
  playButton.disabled = lines.length === 0;
}

function loadPreset(key) {
  if (key === "custom") {
    return;
  }

  const preset = presets[key];
  if (!preset) {
    return;
  }

  linesInput.value = preset.lines.join("\n");
  updateSequenceMeta();
}

function showCurrentLine() {
  sequenceLine.textContent = sequence[currentIndex];
  playbackMeta.textContent = `${currentIndex + 1} / ${sequence.length} at ${delayInput.value} ms`;
}

function clearPlaybackTimer() {
  if (playbackTimer) {
    window.clearInterval(playbackTimer);
    playbackTimer = null;
  }
}

function stepSequence() {
  currentIndex += 1;

  if (currentIndex >= sequence.length) {
    stopPlayback();
    return;
  }

  showCurrentLine();
}

function startPlaybackTimer() {
  clearPlaybackTimer();
  playbackTimer = window.setInterval(stepSequence, Number(delayInput.value));
}

function startPlayback() {
  sequence = getSequenceFromInput();
  if (sequence.length === 0) {
    return;
  }

  currentIndex = 0;
  isPaused = false;
  controlPanel.classList.add("hidden");
  playbackScreen.classList.remove("hidden");
  document.body.classList.add("is-playing");
  showCurrentLine();
  startPlaybackTimer();
}

function stopPlayback() {
  clearPlaybackTimer();
  isPaused = false;
  playbackScreen.classList.add("hidden");
  controlPanel.classList.remove("hidden");
  document.body.classList.remove("is-playing");
}

function togglePause() {
  if (playbackScreen.classList.contains("hidden")) {
    return;
  }

  if (isPaused) {
    isPaused = false;
    showCurrentLine();
    startPlaybackTimer();
    return;
  }

  isPaused = true;
  clearPlaybackTimer();
  playbackMeta.textContent = `Paused on ${currentIndex + 1} / ${sequence.length}`;
}

function handleKeydown(event) {
  if (event.code === "Escape" && !playbackScreen.classList.contains("hidden")) {
    stopPlayback();
  }

  if (event.code === "Space" && !playbackScreen.classList.contains("hidden")) {
    event.preventDefault();
    togglePause();
  }
}

presetSelect.addEventListener("change", (event) => {
  loadPreset(event.target.value);
});

delayInput.addEventListener("input", () => {
  updateDelayLabel();

  if (!playbackScreen.classList.contains("hidden") && !isPaused) {
    showCurrentLine();
    startPlaybackTimer();
  }
});
linesInput.addEventListener("input", () => {
  presetSelect.value = "custom";
  updateSequenceMeta();
});
playButton.addEventListener("click", startPlayback);
stopButton.addEventListener("click", stopPlayback);
window.addEventListener("keydown", handleKeydown);

populatePresets();
updateDelayLabel();
loadPreset("greek_alphabet");
presetSelect.value = "greek_alphabet";
