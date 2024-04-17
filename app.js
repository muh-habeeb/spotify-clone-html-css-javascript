
// this is for clear the cosole when new warnig will came
window.addEventListener('message', event => { 
  if (event.data && event.data.source === 'console-api' && event.data.level === 'warning') {
      console.clear();
  }
});
window.onload=function(){
  let controls=document.querySelector(".contorls").style.display="none";
  controls=document.querySelector(".contorls").style.visibility="hidden";
  setTimeout(()=>{
    //  document.querySelector(".load");
    //  document.getElementById("loadImg");
    document.querySelector(".load").style.display="none";
    document.getElementById("loadImg").style.display="none";
    controls=document.querySelector(".contorls").style.display="flex";
    controls=document.querySelector(".contorls").style.visibility="visible";
    },2000)
};

  document.addEventListener("DOMContentLoaded", function () {
  console.log("WELCOME TO SPOTIFY");
  console.log(
    "THIS IS AN HTML CSS JAVASCRIPT SIMPLE MUSIC WEB APP \n         (LIKE SPOTIFY) \n      take 3 days to fill up"
  );
  console.clear();
  //initializing variable
  let songIndex = 0;
  
  let audioelem = new Audio(`song/${songIndex + 100}.mp3`);
  let masterPlay = document.getElementById("masterPlay");
  let prebtn = document.getElementById("prebtn");
  let nextbtn = document.getElementById("nextbtn");
  let progressBar = document.getElementById("seekbar");
  let masterSongName = document.getElementById("masterSongName");
  let masterSongImg = document.getElementById("masterSongImg");
  let timer = document.getElementById("timer");
  let fullTimer = document.getElementById("full-timer");
  let curruntSong = document.querySelector(".song-item");
  function ab() {
    alert(
      ` THIS IS AN HTML CSS JAVASCRIPT SIMPLE MUSIC WEB APP \n         (LIKE SPOTIFY) `
    );
  }

  let songitems = Array.from(document.getElementsByClassName("song"));
  let song = [
    {
      songName: "thuj men rab dikthahe",
      filePath: "song/1.mp3",
      coverPath: "cover/thuj men rab.jpg",
      artist: " salim sulaiman ,roop kumar ,etc..",
    },
    {
      songName: "august dairies-by dehra",
      filePath: "song/2.mp3",
      coverPath: "cover/august-dairies.jpeg",
      artist: " ",
    },
    {
      songName: "Lost Sky  Fearless ptII",
      filePath: "song/3.mp3",
      coverPath:
        "cover/Lost-Sky-Fearless-ptII-feat-Chris-Linton-Trap-NCS-Copyright-Free-Music.jpg",
      artist: " ",
    },
    {
      songName: "Deep_Chills_-_Run_Free",
      filePath: "song/4.mp3",
      coverPath: "cover/Deep_Chills_-_Run_Free_(feat._IVIE).jpg",
      artist: " ",
    },

    {
      songName: "Swan Aya Hei |Arjith Sing",
      filePath: "song/5.mp3",
      coverPath: "cover/swan aya he.jpg",
      artist: " arijit singh",
    },
    {
      songName: "Asal Mein Darshan Raval ",
      filePath: "song/6.mp3",
      coverPath: "cover/Asal-Mein- Darshan-Raval.png",
      artist: " ",
    },
    {
      songName: "saware |  phantom",
      filePath: "song/7.mp3",
      coverPath: "cover/saware-phanotm.jpeg",
      artist: "pritam ,arijit singh ",
    },
    {
      songName: "Kolussu Thenni Thenni  | cousins ",
      filePath: "song/8.mp3",
      coverPath: "cover/NA.png",
      artist: "cousins | malayalam movie",
    },
    {
      songName: "MALABARI BANGER",
      filePath: "song/9.mp3",
      coverPath: "cover/NA.png",
      artist: "JOKER , MHR , SA & Dabzee ",
    },
    {
      songName: "NENJIN EZHUTH",
      filePath: "song/10.mp3",
      coverPath: "cover/NA.png",
      artist: "Adarsh Krishnan,ft Vidya Lakshmi G ",
    },
    {
      songName: "Sambar",
      filePath: "song/11.mp3",
      coverPath: "cover/NA.png",
      artist: "",
      title:"ThirumaLi ,Thudwiser,Fejo , Dabzee , Mrz Thoppi ,Def Jam India",
    },
  ];

  //default
  masterSongName.innerHTML = song[0].songName;
  masterSongImg.src = song[0].coverPath;

  ///giving img and name for song list
  songitems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = song[i].coverPath;
    e.getElementsByClassName("songName")[0].innerHTML = song[i].songName;
    e.getElementsByClassName("artist")[0].innerHTML = song[i].artist;
  });

  masterPlay.addEventListener("click", () => {
    if (audioelem.paused || audioelem.currentTime <= 0) {
      // console.log("song started");
      audioelem.play();
      masterPlay.src = "./svg/circle-pause-regular.svg";
      masterSongName.innerHTML = song[songIndex].songName;
      masterSongImg.src = song[songIndex].coverPath;
      // curruntSong.style.backgound="#00ff7f";
    } else {
      // console.log("song stoped");
      audioelem.pause();
      masterPlay.src = "./svg/circle-play-regular.svg";
      masterSongImg.src = song[songIndex].coverPath;

      masterSongName.innerHTML = song[songIndex].songName;
    }
  });
  // this function will used for find the full time of the song
  const fulltime = () => {
    let totalDurationInSeconds = audioelem.duration;
    if (!isNaN(totalDurationInSeconds) && isFinite(totalDurationInSeconds)) {
      let totalMinutes = Math.floor(totalDurationInSeconds / 60);
      let totalSeconds = Math.floor(totalDurationInSeconds % 60);
      let totalDurationFormatted = `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
      fullTimer.innerHTML = totalDurationFormatted;
    } else {
      fullTimer.innerHTML = "00:00";
    }
  };
  
  audioelem.addEventListener("timeupdate", () => {
    fulltime(); //called hear for when the progres enabled the full time will shows
    progress = parseInt((audioelem.currentTime / audioelem.duration) * 100);
    progressBar.value = progress;
    // fullTimer.innerHTML=`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    function updateSongTimer() {
      //for updating the timer when only music playing depending on progress bar change
      setInterval(() => {
        let currentTime = audioelem.currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; //updating the seconds
        timer.innerHTML = formattedTime;
      }, 1000);
    }
    updateSongTimer();
  });
  //progress ar click event song seeking
  progressBar.addEventListener("input", () => {
    audioelem.currentTime = (progressBar.value * audioelem.duration) / 100;
  });

  //previus btn
  prebtn.addEventListener("click", () => {
    if (songIndex > 0) {
      songIndex--;
    } else if (songIndex === 0) {
      songIndex = song.length - 1; // Set it to the last index
    }
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = song[songIndex].songName;
    masterSongImg.src = song[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  });
  //next btn
  nextbtn.addEventListener("click", () => {
    if (songIndex < song.length - 1) {
      songIndex++;
    } else {
      songIndex = 0;
    }
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = song[songIndex].songName;
    masterSongImg.src = song[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  });

  audioelem.addEventListener("ended", () => {
    // Automatically play the next song when the current one completes
    nextSong();
  });
  /// list element oclick play each one
  const makeAllPlay = () => {
    const songplay = Array.from(document.getElementsByClassName("song-play"));
    songplay.forEach((element) => {
      //   element.classList.remove("fa-circle-pause");
      element.src = "./svg/circle-play-regular.svg";
    });
  };
  const songplay = Array.from(document.getElementsByClassName("song-play"));
  songplay.forEach((element) => {
    element.addEventListener("click", (event) => {
      makeAllPlay();
      if (audioelem.paused) {
        songIndex = parseInt(event.target.id);
        event.target.src = "./svg/circle-pause-regular.svg";
        masterPlay.src = "./svg/circle-pause-regular.svg";
        audioelem.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = song[songIndex].songName;
        masterSongImg.src = song[songIndex].coverPath;
        audioelem.currentTime = 0;
        audioelem.play();
      } else {
        songIndex = parseInt(event.target.id);
        audioelem.src = `song/${songIndex + 1}.mp3`;
        event.target.src = "./svg/circle-play-regular.svg";
        masterPlay.src = "./svg/circle-play-regular.svg";
        masterSongName.innerHTML = song[songIndex].songName;
        masterSongImg.src = song[songIndex].coverPath;

        //   audioelem.currentTime =0;
        audioelem.pause();
        progressBar.value = progress;
      }
    });
  });
  //  key functions
  let key = " ";
  document.addEventListener("keyup", (event) => {
    // if (key.includes(event.key)) {
    if (event.key === key) {
      if (audioelem.paused || audioelem.currentTime <= 0) {
        audioelem.play();
        masterSongName.innerHTML = song[songIndex].songName;
        masterPlay.src = "./svg/circle-pause-regular.svg";
      } else {
        audioelem.pause();
        masterSongName.innerHTML = song[songIndex].songName;
        masterPlay.src = "./svg/circle-play-regular.svg";
      }
    } else if (event.key === "ArrowRight") {
      // Handle right arrow key (Fast-forward)
      fastForward();
    } else if (event.key === "ArrowLeft") {
      // Handle left arrow key (Rewind)
    } else if (event.key.toLowerCase() === "m") {
      rewind();
      // Handle 'm' key for next song
      nextSong();
    } else if (event.key.toLowerCase() === "n") {
      // Handle 'n' key for previous song
      prevSong();
    } else if (event.key === "ArrowUp") {
      // Handle 'm' key for next song
      volumeUp();
    } else if (event.key === "ArrowDown") {
      // Handle 'n' key for previous song
      volumeDown();
    }
  });

  // this function  will listen audio going 0 or >0 and chage the icon of the volume
  const volumeEvent = () => {
    let soundImg = document.getElementById("soundimg"); // for only sound up/down
    if (soundBar.value > 0) {
      // the soundbar declred at the last
      soundImg.src = "./svg/volume-high-solid.svg";
    } else {
      soundImg.src = "./svg/volume-xmark-solid.svg";
    }
  };

  function volumeUp() {
    ////  sound by key
    audioelem.volume += 0.1; // You can adjust the time (in seconds) to volume up
    soundBar.value = audioelem.volume;
    volumeEvent(); //listning audio bar event
  }
  function volumeDown() {
    audioelem.volume -= 0.1; // You can adjust the time (in seconds) tovolume down
    soundBar.value = audioelem.volume;
    volumeEvent(); //listning audio bar event
  }

  function fastForward() { //for fast forward 5sec
    audioelem.currentTime += 5; // You can adjust the time (in seconds) to fast-forward
  }

  function rewind() {
    audioelem.currentTime -= 5; // You can adjust the time (in seconds) to rewind
  }
  function nextSong() {
    songIndex = (songIndex + 1) % song.length;
    playCurrentSong();
  }

  function prevSong() {
    songIndex = (songIndex - 1 + song.length) % song.length;
    playCurrentSong();
  }
  function playCurrentSong() {
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = song[songIndex].songName;
    masterSongImg.src = song[songIndex].coverPath;
    audioelem.currentTime = 0;
    audioelem.play();
    masterPlay.src = "./svg/circle-pause-regular.svg";
  }

  let soundBar = document.getElementById("soundbar");
  audioelem.volume = soundBar.value;
  soundBar.addEventListener("input", () => {
    audioelem.volume = soundBar.value;
  });
});
