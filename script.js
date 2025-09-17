console.log("welcome to Spotify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let myAudio = document.getElementById('myAudio');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "let me love you", filePath: "1.mp3", coverPath: "cover1.JPG"},
    {songName: "Attention", filePath: "Attention.mp3", coverPath: "cover2.png"},
    {songName: "Gasolina", filePath: "Gasolina.mp3", coverPath: "cover1.JPG"},
    {songName: "Mockingbird", filePath: "Mockingbird.mp3", coverPath: "cover2.png"},
    {songName: "See_You_Again", filePath: "See_You_Again.mp3", coverPath: "cover1.JPG"},
    {songName: "Tokyo_Drift", filePath: "Tokyo_Drift.mp3", coverPath: "cover2.png"},
    {songName: "Side_To_Side", filePath: "Side_To_Side.mp3", coverPath: "cover1.JPG"},
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].textContent = songs[i].songName;
});

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
         masterPlay.classList.remove('fa-play');
         masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
         masterPlay.classList.remove('fa-pause');
         masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// listen to Events
audioElement.addEventListener('timeupdate',()=> {
    // Update Seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
         element.classList.remove('fa-pause');
         element.classList.add('fa-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index)=>{
    element.addEventListener('click', (e)=>{
        debugger
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        //audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play'); 
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play'); 
        masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play'); 
        masterPlay.classList.add('fa-pause');
})

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
        masterPlay.click(); 
    }
});


//function formatTime(seconds) {
 //     const min = Math.floor(seconds / 60);
 //     const sec = Math.floor(seconds % 60);
   //   return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  //  }
///document.querySelectorAll('.timestamp').forEach(songDiv => {
   //   const audio = new Audio(songDiv.dataset.src);
  //    const durationSpan = songDiv.querySelector('.duration');

//audio.addEventListener('loadedmetadata', () => {
  //      durationSpan.textContent = formatTime(audio.duration);
    //  });
   // });


//let progress = 0;
   // let bar = document.getElementById("myProgressbar");

   // let interval = setInterval(() => {
     // if (progress >= 100) {
    //    clearInterval(interval);
    //  } else {
     //   progress++;
     //   bar.style.width = progress + "%";
      //  bar.textContent = progress + "%";
     // }
   // }, 100); 