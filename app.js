//import songs from song.js
import { songs } from "./song.js";


// loading function
window.onload = () => {
  document.querySelector('.controls').style.display = 'none';
  document.querySelector('.controls').style.visibility = 'none';
  setTimeout(() => {
    document.querySelector('.load').style.display = 'none';
    document.querySelector('.controls').style.display = 'flex';
    document.querySelector('.controls').style.visibility = 'visible';
  }, 99);
}
// when document loads
document.addEventListener("DOMContentLoaded", () => {
  console.warn(' WELCOME TO SMALL SPOTIFY');

  //  Select DOM Elements
  //  DECLARE VARIABLES 
  let songIndex = 0; //this var will update when  click events triggered
  let songList = document.querySelector(".song-list");
  let audioElem = new Audio(`songs/${songIndex + 1}.mp3`);
  const nextBtn = document.getElementById('nextBtn');// next button
  let masterPlay = document.getElementById("masterPlay");// main play button
  const prevBtn = document.getElementById('prevBtn'); //previous button 
  let progressBar = document.getElementById('seekBar'); // audio progress bar
  let masterSongName = document.getElementById('master-song-name'); //master song name for big screens
  let masterSongImg = document.getElementById('master-song-img'); //master image 
  let timer = document.getElementById('timer');// for show current time of the song
  let fullTimer = document.getElementById('fullTimer');// for show total length  of the song
  let soundBar = document.getElementById('sound-bar'); //select the sound bar
  //for progress function
  let progress = 0;
  let isSongPlays;

  //MAKING DEFAULT INITIALIZATION
  masterSongName.innerHTML = songs[0].songName; //show the  default song name
  masterSongImg.src = songs[0].coverPath;//show the  default song image

  //creating song by importing each song from an array of objects 
  songs.forEach((item, index) => {
    let songItem = `
    <div class="song-item">
        <div class="song">
            <img src="${item.coverPath}" alt="${item.songName}">
          <div class="song-info">
            <h3 class="song-name">${item.songName}</h3>
            <p class="artist">${item.artist}</p>
          </div>
          <span class="song-controls">
            <img id="${index}" src="./assets/svg/circle-play-regular.svg" alt="PlayBtn" class="btn songPlay">
          </span>
        </div>
    </div>
    `;
    songList.insertAdjacentHTML("beforeend", songItem)
  })


  //function to update song timer
  const updateSongTime = () => {
    let currentTime = audioElem.currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    timer.textContent = formattedTime;
  }
  //function to get the fullTime of  song 
  const getFullTime = () => {
    let totalDurationInSeconds = audioElem.duration;
    if (!isNaN(totalDurationInSeconds) && isFinite(totalDurationInSeconds)) {
      let totalMinutes = Math.floor(totalDurationInSeconds / 60)
      let totalSeconds = Math.floor(totalDurationInSeconds % 60);
      let totalDurationFormatted = `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
      fullTimer.textContent = totalDurationFormatted;
    }
    else {
      fullTimer.textContent = "00:00";
    }
  }

  // master play btn configurations
  masterPlay.addEventListener('click', () => {
    if (audioElem.paused || audioElem.currentTime <= 0) { //checking the audio is playing or not
      //if not play the audio
      audioElem.play();

      masterPlay.src = './assets/svg/circle-pause-regular.svg'; //change the play icon to pause icon
      masterSongName.innerHTML = songs[songIndex].songName;
      masterSongImg.src = songs[songIndex].coverPath;

      if (!isSongPlays) {
        isSongPlays = setInterval(updateSongTime, 1000)
      }
    } else { //if the song is playing
      audioElem.pause();
      masterPlay.src = './assets/svg/circle-play-regular.svg'; //change the pause icon to play icon
      masterSongName.innerHTML = songs[songIndex].songName;
      masterSongImg.src = songs[songIndex].coverPath;
      // for  progress function 
      clearInterval(isSongPlays) // clear the interval;
      isSongPlays = null; // remove the initialized interval
    }
  });
  // for the progress and prevent continues interval calling
  audioElem.addEventListener("timeupdate", () => {
    getFullTime(); //update the timer when a song plays
    progress = parseInt((audioElem.currentTime / audioElem.duration) * 100)
    progressBar.value = progress;
    updateSongTime(); //call the function to update the timer when song plays 
  })


  // for progress bar changing event (seeking of the audio )
  progressBar.addEventListener('input', () => {
    audioElem.currentTime = (progressBar.value * audioElem.duration) / 100;
  })

  //for making play icon when the song is played  from the list  
  const songPlay = Array.from(document.getElementsByClassName('songPlay'));
  const makeAllPlay = () => {
    songPlay.forEach((e) => {
      //updated after the video
      if (audioElem.played) {
        e.src = './assets/svg/circle-play-regular.svg'
      } else {

        e.src = './assets/svg/circle-pause-regular.svg'
      }

    })
  }
  //for making play the song from the list 
  songPlay.forEach((song) => {
    song.addEventListener('click', () => {
      makeAllPlay();
      if (audioElem.paused) {
        songIndex = parseInt(song.id);
        song.src = './assets/svg/circle-pause-regular.svg';
        masterPlay.src = './assets/svg/circle-pause-regular.svg';
        audioElem.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongImg.src = songs[songIndex].coverPath;
        audioElem.currentTime = 0;
        audioElem.play();
      } else {
        songIndex = parseInt(song.id);
        song.src = './assets/svg/circle-play-regular.svg';
        masterPlay.src = './assets/svg/circle-play-regular.svg';
        audioElem.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongImg.src = songs[songIndex].coverPath;
        audioElem.pause();
        progressBar.value = progress;
      }
    })
  })

  // control the prev btn
  prevBtn.addEventListener("click", () => {
    if (songIndex > 0) {
      songIndex--;
    }
    else if (songIndex === 0) {
      songIndex = songs.length - 1;
    }
    // based on index play current song
    audioElem.src = `songs/${songIndex + 1}.mp3`;
    audioElem.play();
    audioElem.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    masterPlay.src = './assets/svg/circle-pause-regular.svg';
  })
  // control the next btn
  nextBtn.addEventListener("click", () => {
    if (songIndex < songs.length - 1) { //if current song position less than last song position go to next song 
      songIndex++;
    }
    else { //current song position > || >=   last song position go to first song 
      songIndex = 0;
    }
    // based on index play current song
    audioElem.src = `songs/${songIndex + 1}.mp3`;
    audioElem.play();
    audioElem.currentTime = 0;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    masterPlay.src = './assets/svg/circle-pause-regular.svg';
  })


  // key functionalities
  let key = " "; //space key
  document.addEventListener("keyup", (e) => {
    if (e.key === key) {
      if (audioElem.paused || audioElem.currentTime <= 0) {
        audioElem.play();
        masterSongName.innerHTML = songs[songIndex].songName;
        masterPlay.src = './assets/svg/circle-pause-regular.svg';
      } else {
        audioElem.pause();
        masterSongName.innerHTML = songs[songIndex].songName;
        masterPlay.src = './assets/svg/circle-play-regular.svg';
      }
    }
    else if (e.key === 'ArrowRight') {
      fastForward(); //skip song  some sec
    } else if (e.key === 'ArrowLeft') {
      rewind(); //backward song sem sec
    } else if (e.key.toLowerCase() === 'm') {
      nextSong(); //go next song
    } else if (e.key.toLowerCase() === 'n') {
      prevSong();//go previous song
    } else if (e.key === 'ArrowUp') {
      volumeUp(); //increase volume
    } else if (e.key === 'ArrowDown') {
      volumeDown(); //decrease volume
    }
  })

  // volume control for chang the image
  const volumeEvent = () => {
    let soundImg = document.getElementById('soundImg');
    if (soundBar.value > 0.5) {
      soundImg.src = './assets/svg/volume-high-solid.svg';
    } else if (soundBar.value >= 0.1 && soundBar.value <= 0.4) {
      soundImg.src = './assets/svg/volume-low-solid.svg';
    } else if (soundBar.value == 0) {
      soundImg.src = './assets/svg/volume-xmark-solid.svg'
    }
  }
  soundBar.addEventListener('input', () => { //watch changes in audio bar

    audioElem.volume = soundBar.value;
    volumeEvent();
  })
  // Volume Up Function
  const volumeUp = () => {
    audioElem.volume = soundBar.value;
    if (audioElem.volume < 1) {  // Check if the volume is less than 1
      audioElem.volume = Math.min(audioElem.volume + 0.1, 1);  // Increase the volume by 0.1 but not exceeding 1
      soundBar.value = audioElem.volume;  // Update the volume bar
      volumeEvent();  // call volume change
    }
  }

  // Volume Down Function
  const volumeDown = () => {
    audioElem.volume = soundBar.value;
    if (audioElem.volume > 0) {  // Check if the volume is greater than 0
      audioElem.volume = Math.max(audioElem.volume - 0.1, 0);  // Decrease the volume by 0.1 but not going below 0
      soundBar.value = audioElem.volume;  // Update the volume bar
      volumeEvent();  // Call volume change
    }
  }


  //forward and backward 
  const fastForward = () => {
    audioElem.currentTime += 5; //increase by 5 seconds
  }
  const rewind = () => {
    audioElem.currentTime -= 5; //decrease by 5 seconds
  }
  // PLAY CURRENT SONG FUNCTION
  const playCurrentSong = () => {
    audioElem.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    masterSongImg.src = songs[songIndex].coverPath;
    audioElem.play();
    audioElem.currentTime = 0;
    masterPlay.src = './assets/svg/circle-pause-regular.svg';
  }
  //prev song and next song by key
  const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    playCurrentSong();
  }
  const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playCurrentSong();
  }

  //if a songs end will go to next song
  audioElem.addEventListener('ended', () => {
    nextSong();
  })





})