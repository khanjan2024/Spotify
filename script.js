// Initialize the variables
let songIndex = 0;

let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Legion", filePath: "1.mp3", coverPath: "1.jpg" },
    { songName: "TRAP", filePath: "2.mp3", coverPath: "2.jpg" },
    { songName: "THEY MADE", filePath: "3.mp3", coverPath: "3.jpg" },
    { songName: "Rich the kid", filePath: "4.mp3", coverPath: "4.jpg" },
    { songName: "SONG TITLE", filePath: "5.mp3", coverPath: "5.jpg" },
    { songName: "SAFETY DANCE", filePath: "6.mp3", coverPath: "6.jpg" },
    { songName: "Salam-e-Ishq", filePath: "7.mp3", coverPath: "7.jpg" },
    { songName: "Salam-e-Ishq", filePath: "8.mp3", coverPath: "8.jpg" },
    { songName: "Salam-e-Ishq", filePath: "9.mp3", coverPath: "9.jpg" },
    { songName: "Salam-e-Ishq", filePath: "10.mp3", coverPath: "10.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener("timeupdate", () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemplay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
};

Array.from(document.getElementsByClassName("songItemplay")).forEach((element, index) => {
    element.addEventListener("click", (e) => {
        if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
            // If the same song is clicked again, toggle pause/play
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = index;
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    });
});

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
});
