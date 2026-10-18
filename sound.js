/* ============================================================
   DANCE DIVISION
   SOUND PAGE
============================================================ */

const audio = document.getElementById("audio");

const playButton =
  document.getElementById("playButton");

const playIcon =
  playButton.querySelector(".play-icon");

const audioTime =
  document.getElementById("audioTime");

const audioDuration =
  document.getElementById("audioDuration");

const audioProgress =
  document.getElementById("audioProgress");

const audioProgressFill =
  document.getElementById("audioProgressFill");

const trackNumber =
  document.getElementById("trackNumber");

const trackTitle =
  document.getElementById("trackTitle");

const trackButtons =
  document.querySelectorAll(".sound-track");


/* ============================================================
   TRACKS
============================================================ */

const tracks = [

  {
    number: "01",
    title: "DNS DVSN",
    file: "audio/dns dvsn.mp3"
  },

  {
    number: "02",
    title: "EF YOU EN",
    file: "audio/ef you en.mp3"
  },

  {
    number: "03",
    title: "STAR STAR STAR",
    file: "audio/star star star.mp3"
  }

];


let currentTrack = 0;


/* ============================================================
   LOAD TRACK
============================================================ */

function loadTrack(index, autoplay = false) {

  currentTrack = index;

  const track = tracks[index];

  audio.src = track.file;

  trackNumber.textContent = track.number;

  trackTitle.textContent = track.title;

  audioProgressFill.style.width = "0%";

  audioTime.textContent = "00:00";

  audioDuration.textContent = "00:00";


  trackButtons.forEach((button, i) => {

    button.classList.toggle(
      "active",
      i === index
    );

  });


  audio.load();


  if (autoplay) {

    audio.play()
      .then(() => {

        playIcon.textContent = "Ⅱ";

      })
      .catch(() => {});

  }

}


/* ============================================================
   PLAY / PAUSE
============================================================ */

playButton.addEventListener("click", () => {

  if (audio.paused) {

    audio.play()
      .then(() => {

        playIcon.textContent = "Ⅱ";

      })
      .catch(() => {});

  } else {

    audio.pause();

    playIcon.textContent = "▶";

  }

});


/* ============================================================
   TRACK SELECTION
============================================================ */

trackButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    const wasPlaying = !audio.paused;

    loadTrack(index, wasPlaying);

  });

});


/* ============================================================
   TIME
============================================================ */

audio.addEventListener("loadedmetadata", () => {

  if (!audio.duration) return;

  audioDuration.textContent =
    formatTime(audio.duration);

});


audio.addEventListener("timeupdate", () => {

  if (!audio.duration) return;

  const percentage =
    (audio.currentTime / audio.duration) * 100;

  audioProgressFill.style.width =
    `${percentage}%`;

  audioTime.textContent =
    formatTime(audio.currentTime);

});


/* ============================================================
   CLICK PROGRESS BAR
============================================================ */

audioProgress.addEventListener("click", event => {

  if (!audio.duration) return;

  const rect =
    audioProgress.getBoundingClientRect();

  const position =
    (event.clientX - rect.left) /
    rect.width;

  audio.currentTime =
    position * audio.duration;

});


/* ============================================================
   END
============================================================ */

audio.addEventListener("ended", () => {

  playIcon.textContent = "▶";

  /*
   Automatically move to the next track.
  */

  if (currentTrack < tracks.length - 1) {

    loadTrack(currentTrack + 1, true);

  } else {

    audio.currentTime = 0;

    audioProgressFill.style.width = "0%";

    audioTime.textContent = "00:00";

  }

});


/* ============================================================
   FORMAT TIME
============================================================ */

function formatTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60);

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );

}


/* ============================================================
   NAVIGATION
============================================================ */

const menuButton =
  document.getElementById("menuButton");

const navigation =
  document.getElementById("navigation");


menuButton.addEventListener("click", () => {

  menuButton.classList.toggle("open");

  navigation.classList.toggle("open");

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    navigation.classList.remove("open");

    menuButton.classList.remove("open");

  }

});


/* ============================================================
   INITIALIZE
============================================================ */

loadTrack(0);