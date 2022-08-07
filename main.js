let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;
let isbeat1playing = false;
let isbeat2playing = false;

let curr_track = document.createElement('audio');
let beat1 = document.createElement('audio');
let beat2 = document.createElement('audio');

let track_list = [
    {
    name:"pirates",
    artist: "dj jagatraaj",
    image: "Image URL",
    path: "johnny.mp3"
  },
  {
    name: "let me down",
    artist: "hum aapko suna rhe aapki ki pasand ka ye gaana",
    image: "Image URL",
    path: "let me down.mp3"
  },
  {
    name: "lovely",
    artist: "billie",
    image: "Image URL",
    path: "lovely.mp3",
  },
  {
    name:"one more round",
    artist: "k",
    image: "Image URL",
    path: "one more round.mp3",
  },
  
];

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    curr_track.src=track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage="url("+track_list[track_index].image+")";
    track_name.textContent=track_list[track_index].name;
    track_artist.textContent=track_list[track_index].artist;
    now_playing.textContent="Playing "+(track_index+1)+" of "+track_list.length;
    
    updateTimer=setInterval(seekUpdate,1000);

    curr_track.addEventListener("ended",nextTrack);

    function resetValues(){
        curr_time.textContent="00:00";
        total_duration.textContent="00:00";
        seek_slider.value=0;
    }
}

beat1.src="Missing-you.mp3";
beat2.src="morning.mp3";

function playpauseTrack(){
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack(){
  curr_track.play();
  isPlaying=true;
  playpause_btn.innerHTML='<i class="fa fa-pause-circle fa-5x"></i>';
  
  
}

function pauseTrack(){
  curr_track.pause();
  isPlaying=false;
  playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
  if (track_index<track_list.length-1)
  track_index+=1;
  else track_index=0;
  loadTrack(track_index);
  playTrack();
}
function previousTrack(){
  if (track_index>0) 
  track_index-=1;
  else track_index=track_list.length-1;
  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  seekTo=curr_track.duration*(seek_slider.value/100);
  curr_track.currentTime=seekTo;
}

function setVolume(){
  curr_track.volume=volume_slider.value/100;
}

function playpausebeat1(){
  if (!isbeat1playing) playBeat1();
  else pauseBeat1();
}

function playpausebeat2(){
  if (!isbeat2playing) playBeat2();
  else pauseBeat2();
}

function playBeat1(){
  beat1.play();
  isbeat1playing=true;
}

function pauseBeat1(){
  beat1.pause();
  isbeat1playing=false;
}

function playBeat2(){
  beat2.play();
  isbeat2playing=true;
}

function pauseBeat2(){
  beat2.pause();
  isbeat2playing=false;
}

function seekUpdate(){
  let seekPosition=0;
  if (!isNaN(curr_track.duration)){
    seekPosition=curr_track.currentTime*(100/curr_track.duration);
    seek_slider.value=seekPosition;

    let currentMinutes=Math.floor(curr_track.currentTime/60);
    let currentSeconds=Math.floor(curr_track.currentTime-currentMinutes*60);
    let durationMinutes=Math.floor(curr_track.duration/60);
    let durationSeconds=Math.floor(curr_track.duration-durationMinutes*60);

    curr_time.textContent = currentMinutes+":"+currentSeconds;
    total_duration.textContent = durationMinutes+":"+durationSeconds;

      
  }
}

loadTrack(track_index);