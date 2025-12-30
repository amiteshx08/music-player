const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider");
const playpauseButton = document.getElementById("playpause-song");
const prevsongButton = document.getElementById("prev-song");
const nextsongButton = document.getElementById("next-song");

const toggleButton = document.getElementById("toggle-button");


const musicPlayer = document.querySelector('.music-player');
const shuffleButton = document.getElementById("shuffle-song");
const repeatButton = document.getElementById("repeat-song");
const songs = [
  {
    image: "images/musafir-hu-yaaron.jpeg",
    name: "Musafir Hu Yaaron",
    artist: "Kishore Kumar",
    audio: "audios/musafir-hu-yaaron.mp3",
  },
  {
    image: "images/chala-jata-hu.jpeg",
    name: "Chala Jata Hu",
    artist: "Kishore Kumar",
    audio: "audios/chala-jata-hu-audio.mp3",
  },
  {
    image: "images/yeh-shaam-mastani.jpeg",
    name: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    audio: "audios/yeh-shaam-mastani.mp3",
  },
];

const audio = document.createElement("audio");
let currentsongIndex = 0;
updateSong();


toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("fa-toggle-on");
  toggleButton.classList.toggle("fa-toggle-off");
  musicPlayer.classList.toggle("dark");
});

prevsongButton.addEventListener("click", function () {
  if (currentsongIndex === 0) {
    return;
  }
  currentsongIndex--;
  updateSong();
});

nextsongButton.addEventListener("click", function () {
  if (currentsongIndex === songs.length - 1) {
    return;
  }
  currentsongIndex++;
  updateSong();
});

playpauseButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playpauseButton.classList.remove("fa-circle-play");
    playpauseButton.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    playpauseButton.classList.remove("fa-circle-pause");
    playpauseButton.classList.add("fa-circle-play");
  }
});

shuffleButton.addEventListener("click", function () {
  currentsongIndex = Math.floor(Math.random() * (2 + 1));
  // console.log(currentsongIndex);
  // Math.floor(Math.random() * (max + 1)) Random Number generation formula inclusive;
  const song = songs[currentsongIndex];
  songImage.src = song.image;
  songName.innerText = song.name;
  songArtist.innerText = song.artist;

  audio.src = song.audio;
  playpauseButton.classList.remove("fa-circle-pause");
  playpauseButton.classList.add("fa-circle-play");
  audio.onloadedmetadata = function () {
    songSlider.value = 0;
    songSlider.max = audio.duration;
  };
});

repeatButton.addEventListener("click", function () {
  audio.loop = !audio.loop;
});

function updateSong() {
  const song = songs[currentsongIndex];
  songImage.src = song.image;
  songName.innerText = song.name;
  songArtist.innerText = song.artist;

  audio.src = song.audio;
  playpauseButton.classList.remove("fa-circle-pause");
  playpauseButton.classList.add("fa-circle-play");
  audio.onloadedmetadata = function () {
    songSlider.value = 0;
    songSlider.max = audio.duration;
  };
}

songSlider.addEventListener("change", function () {
  audio.currentTime = songSlider.value;
});

function moveSlider() {
  songSlider.value = audio.currentTime;
}

setInterval(moveSlider, 1000);
