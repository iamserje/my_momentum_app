import playList from './playList.js';

const bodyOfPage = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const nameOfUser = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const quoteContainer = document.querySelector('.quote-container');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const slidePrevButon = document.querySelector('.slide-prev');
const slidenextButon = document.querySelector('.slide-next');
const playListOnPage = document.querySelector('.play-list');
const playerPlay = document.querySelector('.play');
const player = document.querySelector('.player');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.currentTime');
const durationTime = document.querySelector('.durationTime');
const playerNext = document.querySelector('.play-next');
const playerPrev = document.querySelector('.play-prev');
const radio = document.getElementsByName('language');
const settings = document.querySelector('.settings');
const blockHide = document.querySelector('.hide-blocks');


//settings
settings.addEventListener('click', (ev) => {
   settings.classList.add('hide-show');
   if (ev.target.classList.contains('settings-save')) {
      settings.classList.remove('hide-show');
   }
})

//  object for settings
const state = {
   language: `${localStorage.getItem('settingsLang')}`,
   photoSource: 'github',
   blocks: ['player', 'time', 'date','greetingContainer', 'quoteContainer', 'weather', 'todolist']
}
let settingsLang = localStorage.getItem('settingsLang');
radio.forEach(knop => knop.onchange = () => {
   state.language = knop.value;
   settingsLang = knop.value;
   localStorage.setItem('settingsLang', knop.value);
   getWeather(city.value);
   getQuotes();
})

function hideBlocks(event) {
   let block = event.target;
   if (block.checked) {
      document.querySelector(`.${block.value}`).classList.remove('hide-block');
   } else {
      document.querySelector(`.${block.value}`).classList.add('hide-block');
   }
}
blockHide.addEventListener('click', hideBlocks)

// do background
let randonNUmForImage = 1;
function getRandNum() {
   let ranNum = Math.floor(Math.random()*19+1);
   randonNUmForImage = String(ranNum).length === 1 ? '0'+ranNum : ranNum;
}

function doBackground() {
   let periodOfDay = getPeriodOfDay();
   getRandNum();
   const bgImage = new Image();
   bgImage.src = `https://raw.githubusercontent.com/iamserje/stage1-tasks/assets/images/${periodOfDay}/${randonNUmForImage}.jpg`;

   bgImage.onload = () => {
      bodyOfPage.style.backgroundImage = `url(${bgImage.attributes.src.textContent})`;
   }
}
doBackground();

function slideNext() {
   if (randonNUmForImage < 20) {
      randonNUmForImage += 1;
   } else randonNUmForImage = 1;
   doBackground()
}
function slidePrev() {
   if (randonNUmForImage > 1) {
      randonNUmForImage -= 1;
   } else randonNUmForImage = 20;
   doBackground()
}
slidenextButon.addEventListener('click', slideNext);
slidePrevButon.addEventListener('click', slidePrev);

// do musik
let isPlay = false;
let numPlay = 0;

function doPlayList() {
   playListOnPage.innerHTML = '';
   for (let i=0; i<playList.length; i++) {
      const playListItem = document.createElement('li');
      playListItem.classList.add('play-list__item');
      playListItem.textContent = playList[i].title;
      playListOnPage.append(playListItem);
   }
}
doPlayList();

function stylePlayItems(num) {
   let listOfPlay = document.querySelector('.play-list');
   let arrayFromPlayList = [...listOfPlay['children']];
   arrayFromPlayList.forEach((item, index) => {
      item.classList.remove('play-list__item-active');
      if (index === num) item.classList.add('play-list__item-active');
   })
}

const audioPlayer = new Audio();
function playStopAudio() {
   if (!isPlay) {
      audioPlayer.src = playList[numPlay].src;
      audioPlayer.currentTime = 0;
      audioPlayer.play();
      playerPlay.classList.remove('pause');
      isPlay = true;
      stylePlayItems(numPlay);
      setInterval(showProgress, 300);
   } else {
      audioPlayer.pause();
      playerPlay.classList.add('pause');
      isPlay = false;
   }
}

function showProgress() {
   progressBar.max = audioPlayer.duration;
   progressBar.value = audioPlayer.currentTime;
   currentTime.innerHTML = formatTime(Math.floor(audioPlayer.currentTime));
   durationTime.innerHTML = formatTime(Math.floor(audioPlayer.duration));
}

function formatTime(sec) {
   let minuts = Math.floor(sec/60);
   let secunds = sec%60;
   if (secunds<10) {
      secunds = `0${secunds}`
   }
   return `${minuts}:${secunds}`;
}
function changeProgresByHand() {
   audioPlayer.currentTime = progressBar.value;
}
progressBar.addEventListener('change', changeProgresByHand)
playerPlay.addEventListener('click', playStopAudio);
audioPlayer.addEventListener('ended', playNextSong);

function playNextSong() {
   if (numPlay < playList.length-1) {
      numPlay += 1;
   } else numPlay = 0;
   isPlay = false;
   playStopAudio();
}
playerPrev.addEventListener('click', playPrevSong);

function playPrevSong() {
   if (numPlay >= 1) {
      numPlay -= 1;
   } else numPlay = playList.length-1;
   isPlay = false;
   playStopAudio();
}
playerNext.addEventListener('click', playNextSong);

// functions for time and date
function showTime() {
   const timeDateNow = new Date();
   const timeFormats = {
   hour: 'numeric',
   minute: 'numeric',
   second: 'numeric',
   timeZone: 'Europe/Moscow'
   };
   const timeNow = (state.language === 'ru') ? timeDateNow.toLocaleTimeString('ru-RU', timeFormats) : timeDateNow.toLocaleTimeString('en-US', timeFormats);
   time.textContent = timeNow;
   setTimeout(showTime, 1000)
   showDate();
   showGreeting(state.language);
}
showTime();
function showDate() {
   const timeDateNow = new Date();
   const dateFormats = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Moscow'
   };
   const dateNow = (state.language === 'ru') ? timeDateNow.toLocaleDateString('ru-RU' ,dateFormats) : timeDateNow.toLocaleDateString('en-US' ,dateFormats);
   date.textContent = dateNow;
}
function getHours() {
   const timeDateNow = new Date();
   const hoursFromDate = timeDateNow.getHours();
   let hours = 0;
   if (hoursFromDate === 21) {
      hours = 0;
   } else if (hoursFromDate === 22) {
      hours = 1;
   } else if (hoursFromDate === 23) {
      hours = 2;
   } else hours = hoursFromDate + 3;
   return hours;
}
function getPeriodOfDay() {
   const hour = getHours();
   const quotersOfDay = ['night', 'morning', 'afternoon', 'evening'];
   let periodOfDay;
   for (let i=0; i<quotersOfDay.length; i++) {
      let ind = Math.floor(hour/6);
      periodOfDay = quotersOfDay[ind];
   }
   return periodOfDay;
}

// greeting whith translate

function showGreeting(lang = 'en') {
   const greetingTranslation = {
      ru: {night: 'ночь', morning: 'утро', afternoon: 'день', evening: 'вечер'},
      en: {night: 'night', morning: 'morning', afternoon: 'afternoon', evening: 'evening'}
   }
   let periodOfDay = getPeriodOfDay();
   if (lang === 'en') {
      greeting.textContent = `Goog ${greetingTranslation[lang][periodOfDay]}`;
   } else if (lang === 'ru') {
      if (periodOfDay === 'night') {
         greeting.textContent = `Доброй ${greetingTranslation[lang][periodOfDay]}`;
      } else if (periodOfDay === 'morning') {
         greeting.textContent = `Доброе ${greetingTranslation[lang][periodOfDay]}`;
      } else {
         greeting.textContent = `Добрый ${greetingTranslation[lang][periodOfDay]}`;
      }
   }
}

// functions for name and city from localStorage
function writeNameLocalStorage() {
   localStorage.setItem('nameOfUser', nameOfUser.value);
   localStorage.setItem('city', city.value);
   localStorage.setItem('settingsLang', settingsLang);
}
window.addEventListener('beforeunload', writeNameLocalStorage);
function readNameFromLocalStorage() {
   if (localStorage.getItem('nameOfUser')) {
      nameOfUser.value = localStorage.getItem('nameOfUser');
   }
   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
   } else {
      if (settingsLang === 'ru') {
         city.value = 'Минск';
      } else city.value = 'Minsk';
   }
   if (localStorage.getItem('settingsLang')) {

      settingsLang = localStorage.getItem('settingsLang');
   }
}
window.addEventListener('load', readNameFromLocalStorage);
// function getting weather
async function getWeather(city) {
   if (typeof city !== 'string') {
      city = localStorage.getItem('city');
   }

   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${state.language}&appid=31479f8235bd7d492c8a2dc9a65cd549&units=metric`;
   const responce = await fetch(URL);
   const givenDta = await responce.json();
   const weatherData = {
      id: givenDta.weather[0].id,
      description: givenDta.weather[0].description,
      tempMin: givenDta.main.temp,
      humidity: givenDta.main.humidity,
      wind: givenDta.wind.speed
   };
   weatherIcon.className = 'weather-icon owf';
   weatherIcon.classList.add(`owf-${weatherData.id}`);
   temperature.textContent = `${weatherData.tempMin}°C`;
   weatherDescription.textContent = `${weatherData.description}`;
   state.language === 'ru' ? wind.textContent = `Ветер: ${Math.ceil(weatherData.wind)} м/с` : wind.textContent = `Wind: ${Math.ceil(weatherData.wind)} m/s`;
   state.language === 'ru' ? humidity.textContent = `Влажность: ${weatherData.humidity} %` : humidity.textContent = `Humidity: ${weatherData.humidity} %`;
}
getWeather(city.value);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', () => {
   getWeather(city.value);
});

//       quote
async function getQuotes() {
   let quotes = '';
   if (state.language === 'ru') {
      quotes = './js/quoteRu.json';
   } else quotes = './js/quoteEn.json';
   const resourceQuotes = await fetch(quotes);
   const dataQuotes = await resourceQuotes.json();
   let randomNum = Math.floor(Math.random()*dataQuotes.length-1);
   quote.textContent = dataQuotes[randomNum]['text'];
   author.textContent = dataQuotes[randomNum]['author'];
}
changeQuote.addEventListener('click', getQuotes);
document.addEventListener('DOMContentLoaded', getQuotes);
