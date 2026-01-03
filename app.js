//hook all the tags
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

//songs array of objects
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

const savedIndex = localStorage.getItem('lastSongIndex')

let currentsongIndex = savedIndex !== null ? Number(savedIndex) : 0;

updateSong();

//toggle button for background change
toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("fa-toggle-on");
  toggleButton.classList.toggle("fa-toggle-off");
  musicPlayer.classList.toggle("dark");
});

//previous button logic
prevsongButton.addEventListener("click", () => {
  if (currentsongIndex === 0) {
    return;
  }
  currentsongIndex--;
  updateSong();
  audio.play();
});

function nextMusic(){
  if (currentsongIndex === songs.length - 1) {
    return;
  }
  currentsongIndex++;
  updateSong();
  audio.play();
}
//next button logic
nextsongButton.addEventListener("click", nextMusic);

//play-pause button logic
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

//shuffle button logic
shuffleButton.addEventListener("click", () => {
  currentsongIndex = Math.floor(Math.random() * ((songs.length-1) + 1));
  updateSong()
  audio.play()
});

//repeat button logic
repeatButton.addEventListener("click", () => {
  const isRepeatOn = repeatButton.classList.toggle('repeat');
  audio.loop = isRepeatOn;
});

//update song logic
function updateSong() {
  const song = songs[currentsongIndex];
  songImage.src = song.image;
  songName.innerText = song.name;
  songArtist.innerText = song.artist;

  audio.src = song.audio;

  localStorage.setItem("lastSongIndex", currentsongIndex);
  

  audio.addEventListener('loadedmetadata', () => {
    songSlider.value = 0;
    songSlider.max = audio.duration;
  }) 
}

audio.addEventListener('ended', () => {
  if(!audio.loop){
    nextMusic();
  }
});

songSlider.addEventListener("input", () => {
  audio.currentTime = songSlider.value;
});

audio.addEventListener("timeupdate", () => {
  songSlider.value = audio.currentTime;
});
