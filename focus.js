const modes=[
{key:'desk',title:'Loş Masa',desc:'Sakin ve loş bir çalışma ortamı. Dikkatini topla, zamanı yönet ve hedeflerine odaklan.',img:'focus-desk.png',icon:'Ϟ',sound:'Piyano',audio:'focus-piano.mp3',light:'Loş',level:'Orta',sub:'Sakin çalışma'},
{key:'rain',title:'Yağmurlu Gece',desc:'Pencerede yağmur, fonda sakin ses. Dikkatini dış dünyadan ayır.',img:'focus-rain.png',icon:'☔',sound:'Yağmur',audio:'focus-rain.mp3',light:'Mavi loş',level:'Kolay',sub:'Yağmur sesi'},
{key:'library',title:'Kütüphane',desc:'Sessiz kütüphane havası ile uzun süreli çalışma modu.',img:'focus-library.png',icon:'📚',sound:'Lo-fi',audio:'focus-lofi.mp3',light:'Sıcak',level:'Orta',sub:'Sessiz ortam'},
{key:'nature',title:'Doğa',desc:'Orman atmosferi ve doğa sesleriyle rahat bir odak alanı.',img:'focus-nature.png',icon:'🌿',sound:'Doğa',audio:'focus-nature.mp3',light:'Doğal',level:'Kolay',sub:'Orman sesi'},
{key:'space',title:'Uzay',desc:'Derin odak için karanlık, yıldızlı ve sakin bir çalışma modu.',img:'focus-space.png',icon:'🪐',sound:'Piyano',audio:'focus-piano.mp3',light:'Mor',level:'Zor',sub:'Derin odak'},
{key:'cafe',title:'Kafe',desc:'Kafe ambiyansı ve jazz havası ile sıcak çalışma ortamı.',img:'focus-cafe.png',icon:'☕',sound:'Jazz',audio:'focus-jazz.mp3',light:'Sıcak',level:'Orta',sub:'Jazz ortamı'},
{key:'minimal',title:'Minimal',desc:'Dikkat dağıtmayan sade ve temiz çalışma ekranı.',img:'focus-minimal.png',icon:'◌',sound:'Sessiz',audio:'',light:'Aydınlık',level:'Kolay',sub:'Sade'},
{key:'fire',title:'Kamp Ateşi',desc:'Ateş çıtırtısı ve loş sıcaklıkla akşam odak modu.',img:'focus-fire.png',icon:'🔥',sound:'Kamp Ateşi',audio:'focus-fire.mp3',light:'Ateş',level:'Orta',sub:'Ateş sesi'},
{key:'winter',title:'Kış',desc:'Kar manzarası, sessiz gece ve sakin çalışma atmosferi.',img:'focus-winter.png',icon:'❄️',sound:'Lo-fi',audio:'focus-lofi.mp3',light:'Soğuk',level:'Orta',sub:'Kış modu'},
{key:'sunset',title:'Sahil',desc:'Gün batımı ve dalga hissiyle rahat problem çözme modu.',img:'focus-sunset.png',icon:'🌅',sound:'Doğa',audio:'focus-nature.mp3',light:'Gün batımı',level:'Kolay',sub:'Sahil'}
];

const hero=document.getElementById('hero');
const modeScroller=document.getElementById('modeScroller');
const modeTitle=document.getElementById('modeTitle');
const modeDesc=document.getElementById('modeDesc');
const modeIcon=document.getElementById('modeIcon');
const infoIcon=document.getElementById('infoIcon');
const infoIcon2=document.getElementById('infoIcon2');
const infoMode=document.getElementById('infoMode');
const infoMode2=document.getElementById('infoMode2');
const infoSound=document.getElementById('infoSound');
const infoSound2=document.getElementById('infoSound2');
const infoLight=document.getElementById('infoLight');
const infoLight2=document.getElementById('infoLight2');
const infoLevel=document.getElementById('infoLevel');
const infoLevel2=document.getElementById('infoLevel2');
const playerCover=document.getElementById('playerCover');
const playerTitle=document.getElementById('playerTitle');
const mainTimer=document.getElementById('mainTimer');
const screenTimer=document.getElementById('screenTimer');
const statusEl=document.getElementById('status');
const audio=document.getElementById('audio');
const musicNote=document.getElementById('musicNote');
const totalFocus=document.getElementById('totalFocus');
const sessionCount=document.getElementById('sessionCount');
const bestFocus=document.getElementById('bestFocus');
const avgFocus=document.getElementById('avgFocus');

let selectedMinutes=25,totalSeconds=1500,remaining=1500,running=false,interval=null;
let selectedAudio='focus-piano.mp3',selectedName='Piyano';
let sessions=Number(localStorage.getItem('sezrSessions')||0);
let totalMin=Number(localStorage.getItem('sezrTotalMin')||0);
let bestMin=Number(localStorage.getItem('sezrBestMin')||0);

function buildModes(){
 modeScroller.innerHTML='';
 modes.forEach((m,i)=>{
  const btn=document.createElement('button');
  btn.className='modeCard'+(i===0?' active':'');
  btn.innerHTML=`<span class="modeThumb" style="background-image:url('${m.img}')"></span><strong>${m.icon} ${m.title}</strong><small>${m.sub}</small>`;
  btn.onclick=()=>selectMode(m,btn);
  modeScroller.appendChild(btn);
 });
}
function selectMode(m,btn){
 document.querySelectorAll('.modeCard').forEach(b=>b.classList.remove('active'));
 if(btn) btn.classList.add('active');
 hero.style.setProperty('--hero-bg',`url('${m.img}')`);
 modeTitle.textContent=m.title; modeDesc.textContent=m.desc; modeIcon.textContent=m.icon;
 infoIcon.textContent=m.icon; infoIcon2.textContent=m.icon;
 infoMode.textContent=m.title; infoMode2.textContent=m.title;
 infoSound.textContent=m.sound; infoSound2.textContent=m.sound;
 infoLight.textContent=m.light; infoLight2.textContent=m.light;
 infoLevel.textContent=m.level; infoLevel2.textContent=m.level;
 selectedAudio=m.audio; selectedName=m.sound;
 playerTitle.textContent=(m.sound==='Sessiz'?'Sessiz Mod':m.sound+' Melodileri');
 playerCover.style.backgroundImage=`url('${m.img}')`;
 musicNote.textContent=m.sound+' seçili. Başlatınca çalmaya başlar.';
 stopAudio(true);
}
function fmt(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
function render(){mainTimer.textContent=fmt(remaining);screenTimer.textContent=fmt(remaining)}
function renderStats(){totalFocus.textContent=totalMin+' dk';sessionCount.textContent=sessions;bestFocus.textContent=bestMin+' dk';avgFocus.textContent=sessions?Math.round(totalMin/sessions)+' dk':'0 dk'}
function setDuration(min){selectedMinutes=min;totalSeconds=min*60;remaining=totalSeconds;running=false;clearInterval(interval);statusEl.textContent='Odak modu hazır';stopAudio(false);render()}
function start(){if(running)return;running=true;statusEl.textContent='Odak modu aktif';if(selectedAudio){audio.src=selectedAudio;audio.loop=true;audio.play().catch(()=>musicNote.textContent='Ses için tekrar Başlat’a dokun.')}interval=setInterval(()=>{if(!running)return;remaining--;render();if(remaining<=0){running=false;clearInterval(interval);stopAudio(true);statusEl.textContent='Mola zamanı 🎉';sessions++;totalMin+=selectedMinutes;bestMin=Math.max(bestMin,selectedMinutes);localStorage.setItem('sezrSessions',sessions);localStorage.setItem('sezrTotalMin',totalMin);localStorage.setItem('sezrBestMin',bestMin);renderStats()}},1000)}
function pause(){running=false;clearInterval(interval);stopAudio(false);statusEl.textContent='Duraklatıldı'}
function reset(){running=false;clearInterval(interval);stopAudio(true);remaining=totalSeconds;statusEl.textContent='Odak modu hazır';render()}
function stopAudio(reset){audio.pause();if(reset)audio.currentTime=0}

document.querySelectorAll('#durationPills button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('#durationPills button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');setDuration(Number(btn.dataset.min))});
document.querySelectorAll('#musicPills button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('#musicPills button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectedAudio=btn.dataset.audio;selectedName=btn.dataset.name;infoSound.textContent=selectedName;infoSound2.textContent=selectedName;playerTitle.textContent=selectedName==='Sessiz'?'Sessiz Mod':selectedName+' Melodileri';musicNote.textContent=selectedName+' seçili. Başlatınca çalmaya başlar.';stopAudio(true)});
document.querySelectorAll('.viewBtns button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.viewBtns button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')});
document.getElementById('startBtn').onclick=start;
document.getElementById('laptopStart').onclick=start;
document.getElementById('bottomPlay').onclick=start;
document.getElementById('pauseBtn').onclick=pause;
document.getElementById('resetBtn').onclick=reset;
document.getElementById('goalInput').addEventListener('input',e=>{if(e.target.value.trim())document.getElementById('motivationText').textContent='"'+e.target.value.trim()+'"'});

buildModes();render();renderStats();
