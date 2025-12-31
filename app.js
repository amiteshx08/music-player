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
const songsLen = songs.length - 1;
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

audio.addEventListener("play", () => {
  playpauseButton.classList.remove("fa-circle-play");
  playpauseButton.classList.add("fa-circle-pause");
});

audio.addEventListener("pause", () => {
  playpauseButton.classList.remove("fa-circle-pause");
  playpauseButton.classList.add("fa-circle-play");
});

playpauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});


shuffleButton.addEventListener("click", function () {
  currentsongIndex = Math.floor(Math.random() * (songsLen + 1));
  updateSong()
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

function autoPlay(){
  currentsongIndex++;
  if(currentsongIndex > songs.length - 1) return;
  updateSong()
  audio.play()
}
audio.addEventListener('ended', autoPlay)

songSlider.addEventListener("change", function () {
  audio.currentTime = songSlider.value;
});

function moveSlider() {
  songSlider.value = audio.currentTime;
}

setInterval(moveSlider, 1000);
