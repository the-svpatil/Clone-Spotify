console.log("Welcome to Spotify");

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

//// I have made three function into one.... By me(Shubham Patil)

// Handle play/pause click
// masterPlay.addEventListener('click',()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//          masterPlay.classList.remove('fa-play');
//          masterPlay.classList.add('fa-pause');
//         gif.style.opacity = 1;
//     }
//     else{
//         audioElement.pause();
//          masterPlay.classList.remove('fa-pause');
//          masterPlay.classList.add('fa-play');
//         gif.style.opacity = 0;
//     }
// })

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
// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index)=>{
//     element.addEventListener('click', (e)=>{
//         debugger
//         makeAllPlays();
//         songIndex = index;
//         e.target.classList.remove('fa-play');
//         e.target.classList.add('fa-pause');
//         //audioElement.src = `${songIndex + 1}.mp3`;
//         audioElement.src = songs[songIndex].filePath;
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove('fa-play'); 
//         masterPlay.classList.add('fa-pause');
//     })
// })

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update icons
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause');

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
});


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update icons
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause');

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
});



function formatTime(seconds) {
    //debugger
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

songs.forEach((song, i) => {
    //debugger
    const audio = new Audio(song.filePath); // load each song
    audio.addEventListener('loadedmetadata', () => {
        let duration = formatTime(audio.duration); 
        // Now put it inside the UI, assuming you have an element with class 'timestamp'
        //var playIcon = `<i id="${i}" class="songItemPlay fa-solid fa-play"></i> `
        document.getElementsByClassName('timestamp')[i].textContent = duration;
    });
});


/////////
audioElement.addEventListener('loadedmetadata', () => {
    document.getElementById('totalTime').textContent = formatTime(audioElement.duration);
});

audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;

    // Update current time display
    document.getElementById('currentTime').textContent = formatTime(audioElement.currentTime);
});


function toggleSong(index) {
    // If the same song is clicked and is playing → pause it
    if (songIndex === index && !audioElement.paused) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        document.getElementsByClassName('songItemPlay')[index].classList.remove('fa-pause');
        document.getElementsByClassName('songItemPlay')[index].classList.add('fa-play');
        return;
    }

    // Play song or resume
    makeAllPlays();
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update icons and visuals
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause');
    gif.style.opacity = 1;
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', () => toggleSong(index));
});


masterPlay.addEventListener('click', () => toggleSong(songIndex));


//masterPlay.addEventListener('click',()=>{
//     if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//          masterPlay.classList.remove('fa-play');
//          masterPlay.classList.add('fa-pause');
//         gif.style.opacity = 1;
//     }
//     else{
//         audioElement.pause();
//          masterPlay.classList.remove('fa-pause');
//          masterPlay.classList.add('fa-play');
//         gif.style.opacity = 0;
//     }
// })