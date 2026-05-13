const MODES = {
  "gun-isigi": {name:"Gün Işığı", icon:"☀️", img:"{gender}-gun-isigi.png", weather:""},
  "aksam": {name:"Akşam", icon:"🌇", img:"{gender}-aksam.png", weather:""},
  "gece": {name:"Gece", icon:"🌙", img:"{gender}-gece.png", weather:"stars"},
  "yagmurlu": {name:"Yağmurlu", icon:"🌧️", img:"{gender}-yagmurlu.png", weather:"rain"},
  "karli": {name:"Karlı", icon:"❄️", img:"{gender}-karli.png", weather:"snow"},
  "kamp-atesi": {name:"Kamp Ateşi", icon:"🔥", img:"{gender}-kamp-atesi.png", weather:"fire"}
};

const sceneImg = document.getElementById("sceneImg");
const weather = document.getElementById("weather");
const cinema = document.getElementById("cinema");
const topbar = document.getElementById("topbar");
const setupPanel = document.getElementById("setupPanel");
const focusHud = document.getElementById("focusHud");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const laptopHotspot = document.getElementById("laptopHotspot");
const timerText = document.getElementById("timerText");
const timerRing = document.getElementById("timerRing");
const miniStatus = document.getElementById("miniStatus");
const infoTime = document.getElementById("infoTime");
const infoMusic = document.getElementById("infoMusic");
const infoGoal = document.getElementById("infoGoal");
const modeLabel = document.getElementById("modeLabel");
const goalInput = document.getElementById("goalInput");
const audio = document.getElementById("focusAudio");
const quoteToast = document.getElementById("quoteToast");

let gender = "erkek";
let env = "gun-isigi";
let minutes = 25;
let totalSeconds = minutes * 60;
let remaining = totalSeconds;
let running = false;
let timer = null;
let uiTimer = null;
let quoteTimer = null;
let selectedAudio = "focus-piano.mp3";
let musicName = "Piyano";

const quotes = [
  "Telefonu bırak, hedefe bak.",
  "Bir soru daha çöz.",
  "Sessiz çalışma büyük fark yaratır.",
  "Bugünün emeği yarının sonucu.",
  "Disiplin, motivasyonun çalışmadığı günlerde devreye girer.",
  "Odaklan. Çöz. Güçlen."
];

function fmt(sec){
  const m = String(Math.floor(sec / 60)).padStart(2,"0");
  const s = String(sec % 60).padStart(2,"0");
  return `${m}:${s}`;
}

function render(){
  timerText.textContent = fmt(remaining);
  const done = 1 - remaining / totalSeconds;
  timerRing.style.setProperty("--progress", `${Math.max(0, Math.min(360, done * 360))}deg`);
}

function applyScene(){
  const m = MODES[env];
  const img = m.img.replace("{gender}", gender);
  sceneImg.style.opacity = "0";
  setTimeout(() => {
    sceneImg.src = img;
    sceneImg.style.opacity = "1";
  }, 140);
  weather.className = "weather " + (m.weather || "");
  modeLabel.textContent = `${m.icon} ${gender === "erkek" ? "Erkek" : "Kız"} • ${m.name}`;
}

function setActive(container, btn){
  container.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

document.querySelectorAll("#genderChips button").forEach(btn => {
  btn.onclick = () => {
    gender = btn.dataset.gender;
    setActive(document.getElementById("genderChips"), btn);
    applyScene();
  };
});

document.querySelectorAll("#envChips button").forEach(btn => {
  btn.onclick = () => {
    env = btn.dataset.env;
    setActive(document.getElementById("envChips"), btn);
    applyScene();
  };
});

document.querySelectorAll("#durationChips button").forEach(btn => {
  btn.onclick = () => {
    minutes = Number(btn.dataset.min);
    totalSeconds = minutes * 60;
    remaining = totalSeconds;
    infoTime.textContent = `${minutes} Dakika`;
    setActive(document.getElementById("durationChips"), btn);
    stop(false);
    render();
  };
});

document.querySelectorAll("#musicChips button").forEach(btn => {
  btn.onclick = () => {
    selectedAudio = btn.dataset.file || "";
    musicName = btn.dataset.name || "Sessiz";
    infoMusic.textContent = musicName;
    setActive(document.getElementById("musicChips"), btn);
    stopAudio(true);
  };
});

goalInput.addEventListener("input", () => {
  infoGoal.textContent = goalInput.value.trim() || "Bir soru daha çöz.";
});

function start(){
  if(running) return;
  running = true;
  cinema.classList.add("running");
  miniStatus.textContent = "Odak";
  if(selectedAudio){
    audio.src = selectedAudio;
    audio.loop = true;
    audio.play().catch(()=>{});
  }

  showUi();
  setTimeout(hideUi, 5000);

  timer = setInterval(() => {
    remaining--;
    render();
    if(remaining <= 0){
      stop(true);
      showQuote("Mola zamanı. Harika iş çıkardın!");
    }
  }, 1000);

  startQuotes();
}

function pause(){
  running = false;
  cinema.classList.remove("running");
  clearInterval(timer);
  miniStatus.textContent = "Durdu";
  stopAudio(false);
  showUi();
}

function reset(){
  stop(true);
  remaining = totalSeconds;
  miniStatus.textContent = "Başlat";
  render();
}

function stop(finished){
  running = false;
  cinema.classList.remove("running");
  clearInterval(timer);
  clearInterval(quoteTimer);
  stopAudio(true);
  if(finished) miniStatus.textContent = "Bitti";
}

function stopAudio(reset){
  audio.pause();
  if(reset) audio.currentTime = 0;
}

function showUi(){
  clearTimeout(uiTimer);
  topbar.classList.remove("hideUi");
  setupPanel.classList.remove("hideUi");
  focusHud.classList.remove("hideUi");
  fullscreenBtn.classList.remove("hideUi");
  if(running){
    uiTimer = setTimeout(hideUi, 5000);
  }
}

function hideUi(){
  if(!running) return;
  topbar.classList.add("hideUi");
  setupPanel.classList.add("hideUi");
  focusHud.classList.add("hideUi");
  fullscreenBtn.classList.add("hideUi");
}

function showQuote(text){
  quoteToast.textContent = text;
  quoteToast.classList.add("show");
  setTimeout(() => quoteToast.classList.remove("show"), 4200);
}

function startQuotes(){
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    if(running){
      showQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, 23000);
}

document.getElementById("startBtn").onclick = start;
document.getElementById("pauseBtn").onclick = pause;
document.getElementById("resetBtn").onclick = reset;
laptopHotspot.onclick = start;

["mousemove","touchstart","click"].forEach(evt => {
  document.addEventListener(evt, () => {
    if(running) showUi();
  }, {passive:true});
});

fullscreenBtn.onclick = () => {
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen?.();
  }else{
    document.exitFullscreen?.();
  }
};

applyScene();
render();
