console.log("WELCOME TO SPOTIFY");
//initializing variable
let songIndex = 0;

let audioelem = new Audio(`song/${songIndex + 1}.mp3`);
let masterPlay = document.getElementById("masterPlay");
let prebtn = document.getElementById("prebtn");
let nextbtn = document.getElementById("nextbtn");
let progressBar = document.getElementById("progressBar");
let masterSongName = document.getElementById("masterSongName");
let songTimer = document.getElementById("songTimer");

let songitems = Array.from(document.getElementsByClassName("songItem"));
let song = [
  {
    songName: "Asal Mein Darshan Raval ",
    filePath: "song/1.mp3",
    coverPath: "cover/Asal-Mein- Darshan-Raval.png",
  },
  {
    songName: "august dairies-by dehra",
    filePath: "song/2.mp3",
    coverPath: "cover/august-dairies.jpeg",
  },
  {
    songName: "Lost Sky  Fearless ptII",
    filePath: "song/3.mp3",
    coverPath:
      "cover/Lost-Sky-Fearless-ptII-feat-Chris-Linton-Trap-NCS-Copyright-Free-Music.jpg",
  },
  {
    songName: "Deep_Chills_-_Run_Free",
    filePath: "song/4.mp3",
    coverPath: "cover/Deep_Chills_-_Run_Free_(feat._IVIE).jpg",
  },

  {
    songName: "Swan Aya Hei |Arjith Sing",
    filePath: "song/5.mp3",
    coverPath: "cover/swan aya he.jpg",
  },
  {
    songName: "thuj men rab dikthahe",
    filePath: "song/6.mp3",
    coverPath: "cover/thuj men rab.jpg",
  },
  {
    songName: "saware |phantom",
    filePath: "song/7.mp3",
    coverPath: "cover/saware-phanotm.jpeg",
  },
];

//looping songs
///givig img and name for sog list
songitems.forEach((e, i) => {
  // console.log(e,i)
  e.getElementsByTagName("img")[0].src = song[i].coverPath;
  e.getElementsByClassName("songName")[0].innerHTML = song[i].songName;
});

//handele play puse

masterPlay.addEventListener("click", () => {
  if (audioelem.paused || audioelem.currentTime <= 0) {
    // console.log("song started");
    audioelem.play();

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    // console.log("song stoped");
    audioelem.pause();

    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});
// for key add event
// let key =["k","K"," "];
let key = " ";
document.addEventListener("keyup", (event) => {
  // if (key.includes(event.key)) {
  if (event.key === key) {
    if (audioelem.paused || audioelem.currentTime <= 0) {
      audioelem.play();
      masterSongName.innerHTML = song[songIndex].songName;

      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    } else {
      audioelem.pause();
      masterSongName.innerHTML = song[songIndex].songName;

      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
    }
  } else if (event.key === "ArrowRight") {
    // Handle right arrow key (Fast-forward)
    fastForward();
  } else if (event.key === "ArrowLeft") {
    // Handle left arrow key (Rewind)
    rewind();
  } else if (event.key.toLowerCase() === "m") {
    // Handle 'm' key for next song
    nextSong();
  } else if (event.key.toLowerCase() === "n") {
    // Handle 'n' key for previous song
    prevSong();
  }
});
function fastForward() {
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
  audioelem.currentTime = 0;
  audioelem.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
}
// key over
//event listening

audioelem.addEventListener("timeupdate", () => {
  progress = parseInt((audioelem.currentTime / audioelem.duration) * 100);
  progressBar.value = progress;
  function updateSongTimer() {
    //for updating the timer when only music playing depending on progress bar change
    setInterval(() => {
      let currentTime = audioelem.currentTime;
      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime % 60);
      let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; //updating the seconds
      songTimer.innerHTML = formattedTime;
    }, 1000);
  }
  updateSongTimer();
  //  console.log(progress);
});

progressBar.addEventListener("input", () => {
  audioelem.currentTime = (progressBar.value * audioelem.duration) / 100;
});

// list ite palay

const makeAllPlay = () => {
  const songItemPlay = Array.from(
    document.getElementsByClassName("songItemPlay")
  );
  songItemPlay.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};
const songItemPlay = Array.from(
  document.getElementsByClassName("songItemPlay")
);
songItemPlay.forEach((element) => {
  element.addEventListener("click", (event) => {
    makeAllPlay();
    if(audioelem.paused){
        songIndex = parseInt(event.target.id);
        event.target.classList.remove("fa-circle-play");
        event.target.classList.add("fa-circle-pause");
        audioelem.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = song[songIndex].songName;
        audioelem.currentTime = 0;
        audioelem.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.querySelector("input").style.accentColor="springgreen";
    }
    else{
    songIndex = parseInt(event.target.id);
    event.target.classList.add("fa-circle-play");
    event.target.classList.remove("fa-circle-pause");
    audioelem.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerHTML = song[songIndex].songName;
    audioelem.currentTime =0;
    audioelem.pause();
    document.querySelector("input").style.accentColor="#0ef";
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    }
  });
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

  audioelem.currentTime = 0;
  audioelem.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  // console.log(songIndex);
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
  audioelem.currentTime = 0;
  audioelem.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  // console.log(songIndex);
});

audioelem.addEventListener("ended", () => {
    // Automatically play the next song when the current one completes
    nextSong();
  });


  /////////////////////////////////////////////////////////////////////////////////////

  //    sound 

  let soundButton=document.getElementById("soundicon");
  let soundBar=document.getElementById("soundbar");
  audioelem.volume = soundBar.value;
  soundButton.addEventListener("click",()=>{
    soundBar.classList.toggle("active");
    console.log("ok");
  });
  soundBar.addEventListener("input", () => {
      audioelem.volume = soundBar.value;
      if(soundBar.value<=0){
        soundicon.classList.replace("fa-volume-low","fa-volume-xmark");
      }
      else if((soundBar.value>=0)&& (soundBar.value<=0.6)){
        soundicon.classList.replace("fa-volume-xmark","fa-volume-low");
      }
      else{
      soundicon.classList.replace("fa-volume-low","fa-volume-high");
        
      }

  });

  // ... Your existing code ...

const loopControl = document.getElementById("loopControl");

// Event listener for loop control
loopControl.addEventListener("click", () => {
    // Update the loop property of the audio element
    audioelem.loop = loopControl.checked;
});


///shuffle btn

// ... Your existing code ...

const shuffleButton = document.getElementById("shuffleButton");
let isShuffleActive = false;

// Function to shuffle the songs array
const shuffleSongs = () => {
    for (let i = song.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [song[i], song[j]] = [song[j], song[i]];
    }

    // Update the songItemPlay elements based on the shuffled order
    songItemPlay.forEach((element, index) => {
        element.getElementsByTagName("img")[0].src = song[index].coverPath;
    });
};

// Event listener for shuffle button
shuffleButton.addEventListener("click", () => {
    // Toggle shuffle functionality
    isShuffleActive = !isShuffleActive;

    if (isShuffleActive) {
        // If shuffle is active, shuffle the songs
        shuffleSongs();
        console.log("Shuffle is enabled");
    } else {
        // If shuffle is not active, you can add any logic needed when shuffling is disabled
        console.log("Shuffle is disabled");
    }
});


// ... Your existing code ...


