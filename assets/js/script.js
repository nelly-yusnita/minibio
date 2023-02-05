// ===== DARK LIGHT THEME ===== //
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
	themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
	document.body.classList.toggle(darkTheme)
	themeButton.classList.toggle(iconTheme)

	localStorage.setItem('selected-theme', getCurrentTheme())
	localStorage.setItem('selected-icon', getCurrentIcon())
})
// ===== end dark light theme ===== //

// ===== GALLERY ===== //
const swiperGallery = new Swiper(".gallery__container", {
	spaceBetween: 10,
	grabCursor: true,
	slidesPerView: 'auto',
	loop: 'true',

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});
// ===== end gallery ===== //

// ===== PLAYLIST ===== //
// Date & time
function updateClock(){
	var now = new Date();
	var dname = now.getDay(),
		 mo = now.getMonth(),
		 dnum = now.getDate(),
		 yr = now.getFullYear(),
		 hou = now.getHours(),
		 min = now.getMinutes(),
		 sec = now.getSeconds(),
		 pe = "AM";

	if(hou == 0){
		hou = 12;
	} if(hou > 12){
		hou = hou - 12;
		pe = "PM";
	}

	Number.prototype.pad = function(digits){
		for(var n = this.toString(); n.length < digits; n = 0 + n);
		return n;
	}

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	var ids = ["day-name", "month", "day-num", "year", "hour", "minutes", "seconds", "period"];

	var values = [weeks[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];

	for(var i = 0; i < ids.length; i++)
	document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock(){
	updateClock();
	window.setInterval("updateClock()", 1);
}
// end date & time

// playlist music
let allMusic = [
	// 1. Taylor Swift - Style
	{
		name:"Style",
		artist: "Taylor Swift",
		img: "music1",
		src: "Taylor Swift - Style"
	},

	// 2. Taylor Swift - You re On Your Own Kid
	{
		name:"You're On Your Own Kid",
		artist: "Taylor Swift",
		img: "music2",
		src: "Taylor Swift - You re On Your Own Kid"
	},

	// 3. Taylor Swift - Cardigan
	{
		name:"Cardigan",
		artist: "Taylor Swift",
		img: "music3",
		src: "Taylor Swift - Cardigan"
	},

	// 4. Dido - White Flag
	{
		name:"White Flag",
		artist: "Dido",
		img: "music4",
		src: "Dido - White Flag"
	},

	// 5. TULUS - Remedi
	{
		name:"Remedi",
		artist: "TULUS",
		img: "music5",
		src: "TULUS - Remedi"
	},

	// 6. Blackpink - Tally
	{
		name:"Tally",
		artist: "BLACKPINK",
		img: "music6",
		src: "BLACKPINK - Tally"
	},

	// 7. IU - Dear Name
	{
		name:"Dear Name",
		artist: "IU",
		img: "music7",
		src: "IU - Dear Name"
	},

	// 8. Hindia - Evaluasi
	{
		name:"Evaluasi",
		artist: "Hindia",
		img: "music8",
		src: "Hindia - Evaluasi"
	},

	// 9. The Rose - Definition of ugly
	{
		name:"Definition of ugly is",
		artist: "The Rose",
		img: "music9",
		src: "The Rose - Definition of ugly"
	},

	// 10. Jehwi - Looks Like a Real Thing
	{
		name:"Looks Like a Real Thing",
		artist: "Jehwi",
		img: "music10",
		src: "Jehwi - Looks Like a Real Thing"
	}
]

const playlist = document.querySelector("#playlist"),
		musicImg = playlist.querySelector(".playlist__img"),
		musicName = playlist.querySelector(".song__title"),
		musicArtist = playlist.querySelector(".song__artist"),
		playPauseBtn = playlist.querySelector(".song__play-pause"),
		prevBtn = playlist.querySelector("#prev-song"),
		nextBtn = playlist.querySelector("#next-song"),
		mainAudio = playlist.querySelector("#main-audio"),
		progressArea = playlist.querySelector(".playlist__progress-area"),
		progressBar = progressArea.querySelector(".playlist__progress-bar");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
	loadMusic(musicIndex);
});

function loadMusic(indexNumb){
	musicName.innerText = allMusic[indexNumb - 1].name;
	musicArtist.innerText = allMusic[indexNumb - 1].artist;
	musicImg.src = `assets/img/${allMusic[indexNumb - 1].img}.jpg`;
	mainAudio.src = `assets/audio/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
	playlist.classList.add("paused");
	playPauseBtn.querySelector("i").innerText = "pause";
	mainAudio.play();
}

//pause music function
function pauseMusic(){
	playlist.classList.remove("paused");
	playPauseBtn.querySelector("i").innerText = "play_arrow";
	mainAudio.pause();
}

//prev music function
function prevMusic(){
	musicIndex--; //decrement of musicIndex by 1
	//if musicIndex is less than 1 then musicIndex will be the array length so the last music play
	musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
	loadMusic(musicIndex);
	playMusic();
}

//next music function
function nextMusic(){
	musicIndex++; //increment of musicIndex by 1
	//if musicIndex is greater than array length then musicIndex will be 1 so the first music play
	musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
	loadMusic(musicIndex);
	playMusic(); 
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
	const isMusicPlay = playlist.classList.contains("paused");
	//if isPlayMusic is true then call pauseMusic else call playMusic
	isMusicPlay ? pauseMusic() : playMusic();
});

//prev music button event
prevBtn.addEventListener("click", ()=>{
	prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
	nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
	const currentTime = e.target.currentTime; //getting playing song currentTime
	const duration = e.target.duration; //getting playing song total duration
	let progressWidth = (currentTime / duration) * 100;
	progressBar.style.width = `${progressWidth}%`;

	let musicCurrentTime = playlist.querySelector(".song__current"),
	musicDuartion = playlist.querySelector(".song__duration");
	mainAudio.addEventListener("loadeddata", ()=>{
		// update song total duration
		let mainAdDuration = mainAudio.duration;
		let totalMin = Math.floor(mainAdDuration / 60);
		let totalSec = Math.floor(mainAdDuration % 60);
		if(totalSec < 10){ //if sec is less than 10 then add 0 before it
			totalSec = `0${totalSec}`;
		}
		musicDuartion.innerText = `${totalMin}:${totalSec}`;
	});
	// update playing song current time
	let currentMin = Math.floor(currentTime / 60);
	let currentSec = Math.floor(currentTime % 60);
	if(currentSec < 10){ //if sec is less than 10 then add 0 before it
		currentSec = `0${currentSec}`;
	}
	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
	let progressWidth = progressArea.clientWidth; //getting width of progress bar
	let clickedOffsetX = e.offsetX; //getting offset x value
	let songDuration = mainAudio.duration; //getting song total duration
	
	mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
	playMusic(); //calling playMusic function
});

//change loop, shuffle, repeat icon onclick
const repeatBtn = playlist.querySelector("#repeat-playlist");
repeatBtn.addEventListener("click", ()=>{
	let getText = repeatBtn.innerText; //getting this tag innerText
	switch(getText){
		case "repeat":
			repeatBtn.innerText = "repeat_one";
			repeatBtn.setAttribute("title", "Song looped");
			break;
		case "repeat_one":
			repeatBtn.innerText = "shuffle";
			repeatBtn.setAttribute("title", "Playback shuffled");
			break;
		case "shuffle":
			repeatBtn.innerText = "repeat";
			repeatBtn.setAttribute("title", "Playlist looped");
			break;
	}
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
	// we'll do according to the icon means if user has set icon to
	// loop song then we'll repeat the current song and will do accordingly
	let getText = repeatBtn.innerText; //getting this tag innerText
	switch(getText){
		case "repeat":
			nextMusic(); //calling nextMusic function
			break;
		case "repeat_one":
			mainAudio.currentTime = 0; //setting audio current time to 0
			loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
			playMusic(); //calling playMusic function
			break;
		case "shuffle":
			let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
			do{
				randIndex = Math.floor((Math.random() * allMusic.length) + 1);
			}while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
			musicIndex = randIndex; //passing randomIndex to musicIndex
			loadMusic(musicIndex);
			playMusic();
			break;
	}
});
// ===== end playlist ===== //

// ===== MOVIES ===== //
const moviesSwiper = new Swiper('.movie__slides', {
	spaceBetween: 24,
	loop: true,
	grabCursor: true,

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		467: {
			slidesPerView: 2,
		},

		768: {
			slidesPerView: 1,
		},

		992: {
			slidesPerView: 2,
		},
	}
});
// ===== end movies ===== //

// ===== BOOKS ===== //
const booksSwiper = new Swiper('.books__slides', {
	spaceBetween: 24,
	loop: true,
	grabCursor: true,

	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},

	breakpoints: {
		467: {
			slidesPerView: 2,
		},

		768: {
			slidesPerView: 1,
		},

		992: {
			slidesPerView: 2,
		},
	}
});
// ===== end books ===== //

// ===== BLOG ===== //
const blogSwiper = new Swiper('.blog__container', {
	spaceBetween: 24,
	loop: true,
	grabCursor: true,

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		476: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
	}
});
// ===== end blog ===== //

// ===== SCROLL UP ===== //
function scrollUp(){
	const scrollUp = document.getElementById('scroll-up');
	
	if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);
// ===== end scroll up ===== //

// ===== SCROLL REVEAL ANIMATION ===== //
const sr = ScrollReveal({
	origin: 'top',
	distance: '60px',
	duration: 2500,
	delay: 400,
	// reset: true// animation repeat //
})

sr.reveal(`.section__title, .playlist__music-title, .blog__title, .bio__container, .gallery__container, .blog__container`)
sr.reveal(`.content__container .content__box:first-child, .playlist__container .playlist__content:first-child, .movies__container .movie__content:first-child, .books__slides`, {origin: 'left'})
sr.reveal(`.content__container .content__box:nth-child(2), .playlist__music, .movie__slides, .books__container .books__content:nth-child(2)`, {origin: 'right'})