console.log("welcome to spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName :"Anuvanuvu",filePath:"songs/1.mp3",coverPath:"covers/1.jpg" },
    {songName :"Vellake",filePath:"songs/2.mp3",coverPath: "covers/2.jpg" },
    {songName :"Idhe-Idhe",filePath:"songs/3.mp3",coverPath:"covers/3.jpg" },
    {songName :"Nijamene-Chebuthuna",filePath:"songs/4.mp3",coverPath:"covers/4.jpg" },
    {songName :"Let-Me-Love-You",filePath:"songs/5.mp3",coverPath:"covers/5.jpg" }
]

songItems.forEach((element,i)=>{
   
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
})


//audioElement.play();


//Handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener("timeupdate",()=>{
   
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');

    })
}



//for play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

//for next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//for previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})