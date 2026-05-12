
const mainTimer=document.getElementById('mainTimer');
const screenTimer=document.getElementById('screenTimer');
const statusEl=document.getElementById('status');
const audio=document.getElementById('audio');
const musicNote=document.getElementById('musicNote');
const infoSound=document.getElementById('infoSound');
const infoSound2=document.getElementById('infoSound2');
const playerTitle=document.getElementById('playerTitle');
const totalFocus=document.getElementById('totalFocus');
const sessionCount=document.getElementById('sessionCount');
const bestFocus=document.getElementById('bestFocus');
const avgFocus=document.getElementById('avgFocus');

let selectedMinutes=25;
let totalSeconds=25*60;
let remaining=totalSeconds;
let running=false;
let interval=null;
let selectedAudio='focus-piano.mp3';
let selectedName='Piyano';
let sessions=Number(localStorage.getItem('sezrSessions')||0);
let totalMin=Number(localStorage.getItem('sezrTotalMin')||0);
let bestMin=Number(localStorage.getItem('sezrBestMin')||0);

function fmt(s){
  const m=Math.floor(s/60).toString().padStart(2,'0');
  const sec=(s%60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}
function render(){
  mainTimer.textContent=fmt(remaining);
  screenTimer.textContent=fmt(remaining);
}
function renderStats(){
  totalFocus.textContent=totalMin+' dk';
  sessionCount.textContent=sessions;
  bestFocus.textContent=bestMin+' dk';
  avgFocus.textContent=sessions?Math.round(totalMin/sessions)+' dk':'0 dk';
}
function setDuration(min){
  selectedMinutes=min;
  totalSeconds=min*60;
  remaining=totalSeconds;
  running=false;
  clearInterval(interval);
  statusEl.textContent='Odak modu hazır';
  stopAudio(false);
  render();
}
function start(){
  if(running) return;
  running=true;
  statusEl.textContent='Odak modu aktif';
  if(selectedAudio){
    audio.src=selectedAudio;
    audio.loop=true;
    audio.play().catch(()=>{ musicNote.textContent='Ses için tekrar Başlat’a dokun.'; });
  }
  interval=setInterval(()=>{
    if(!running) return;
    remaining--;
    render();
    if(remaining<=0){
      running=false;
      clearInterval(interval);
      stopAudio(true);
      statusEl.textContent='Mola zamanı 🎉';
      sessions++;
      totalMin+=selectedMinutes;
      bestMin=Math.max(bestMin,selectedMinutes);
      localStorage.setItem('sezrSessions',sessions);
      localStorage.setItem('sezrTotalMin',totalMin);
      localStorage.setItem('sezrBestMin',bestMin);
      renderStats();
    }
  },1000);
}
function pause(){
  running=false;
  clearInterval(interval);
  stopAudio(false);
  statusEl.textContent='Duraklatıldı';
}
function reset(){
  running=false;
  clearInterval(interval);
  stopAudio(true);
  remaining=totalSeconds;
  statusEl.textContent='Odak modu hazır';
  render();
}
function stopAudio(reset){
  audio.pause();
  if(reset) audio.currentTime=0;
}

document.querySelectorAll('#durationPills button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('#durationPills button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    setDuration(Number(btn.dataset.min));
  };
});
document.querySelectorAll('#musicPills button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('#musicPills button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    selectedAudio=btn.dataset.audio;
    selectedName=btn.dataset.name;
    infoSound.textContent=selectedName;
    infoSound2.textContent=selectedName;
    playerTitle.textContent=selectedName==='Sessiz'?'Sessiz Mod':selectedName+' Melodileri';
    musicNote.textContent=selectedName+' seçili. Başlatınca çalmaya başlar.';
    stopAudio(true);
  };
});
document.querySelectorAll('.viewBtns button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.viewBtns button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  };
});

document.getElementById('startBtn').onclick=start;
document.getElementById('screenStart').onclick=start;
document.getElementById('bottomPlay').onclick=start;
document.getElementById('pauseBtn').onclick=pause;
document.getElementById('resetBtn').onclick=reset;

document.getElementById('goalInput').addEventListener('input', e=>{
  if(e.target.value.trim()){
    document.getElementById('motivationText').textContent='"'+e.target.value.trim()+'"';
  }
});

render();
renderStats();
