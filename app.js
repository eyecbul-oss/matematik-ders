
function toEmbed(url){try{const u=new URL(url);let id="";if(u.hostname.includes("youtu.be")) id=u.pathname.replace("/","");else if(u.searchParams.get("v")) id=u.searchParams.get("v");id=(id||"").split("?")[0].split("&")[0];return id?"https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1":"";}catch(e){return "";}}
document.querySelectorAll(".watch-video").forEach(btn=>{btn.addEventListener("click",()=>{const id=btn.dataset.video;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
document.querySelectorAll(".watch-playlist").forEach(btn=>{btn.addEventListener("click",()=>{const list=btn.dataset.list;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/videoseries?list="+list+"&rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
(function(){let total=25*60,running=false;const timer=document.getElementById("focusTimer");function render(){if(timer){timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");}}setInterval(()=>{if(running&&total>0){total--;render();}},1000);const start=document.getElementById("focusStart"),pause=document.getElementById("focusPause"),reset=document.getElementById("focusReset"),save=document.getElementById("focusSave"),input=document.getElementById("focusVideoUrl"),frame=document.getElementById("focusVideoFrame"),box=document.getElementById("focusVideoBox");if(input){input.value=localStorage.getItem("sezrFocusVideo")||"";}if(save){save.onclick=()=>{const e=toEmbed(input.value.trim());if(!e){alert("Geçerli YouTube linki yapıştır.");return;}localStorage.setItem("sezrFocusVideo",input.value.trim());frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});};}if(start){start.onclick=()=>{running=true;const url=(input&&input.value.trim())||localStorage.getItem("sezrFocusVideo");const e=toEmbed(url);if(e&&frame&&box){frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});}};}if(pause){pause.onclick=()=>running=false;}if(reset){reset.onclick=()=>{running=false;total=25*60;render();};}render();})();
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}






/* SEZR FOCUS STUDIO PREMIUM JS */
(function(){
  const timer=document.getElementById("focusTimer"), status=document.getElementById("focusStatus"), pill=document.getElementById("focusSessionPill"), title=document.getElementById("focusModeTitle"), now=document.getElementById("focusNowPlaying"), input=document.getElementById("focusVideoUrl"), frame=document.getElementById("focusVideoFrame"), screen=document.getElementById("focusMainScreen"), visual=document.getElementById("focusVisualLayer"), ring=document.getElementById("focusTimerRing"), quote=document.getElementById("focusQuote");
  if(!timer||!input||!frame||!screen)return;
  let work=25, brk=5, total=work*60, running=false, sound="silent";
  const quotes=["Bir soru daha çöz.","Telefonu bırak, hedefe bak.","Bugünün emeği yarının gücü.","Zor soru yok, eksik tekrar var.","5 dakika daha dayan."];
  function embed(url){try{const u=new URL(url);let id="";if(u.hostname.includes("youtu.be"))id=u.pathname.replace("/","");else if(u.searchParams.get("v"))id=u.searchParams.get("v");else if(u.pathname.includes("/embed/"))id=u.pathname.split("/embed/")[1];id=(id||"").split("?")[0].split("&")[0];return id?"https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1&playsinline=1":"";}catch(e){return"";}}
  function render(){timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");if(pill)pill.textContent=work+" / "+brk;}
  function setSession(w,b){work=Number(w);brk=Number(b);total=work*60;running=false;if(status)status.textContent="Süre seçildi";render();}
  function setBg(bg){if(!visual)return;visual.classList.remove("bg-rain","bg-desk","bg-space","bg-minimal");visual.classList.add("bg-"+bg);}
  function setView(v){if(!ring)return;ring.classList.remove("view-compact","view-large","view-clean");if(v!=="circle")ring.classList.add("view-"+v);}
  function loadVideo(url,label){const e=embed(url);if(!e){alert("Geçerli bir YouTube linki yapıştır.");return false;}frame.src=e;screen.classList.add("video-on");localStorage.setItem("sezrFocusVideo",url);if(now)now.textContent=label||"YouTube çalışma videosu";return true;}
  function start(){running=true;if(status)status.textContent="Odak modu aktif";if(sound==="youtube"){const url=input.value.trim()||localStorage.getItem("sezrFocusVideo");if(url)loadVideo(url,"YouTube Focus");}if(quote)quote.textContent=quotes[Math.floor(Math.random()*quotes.length)];}
  setInterval(()=>{if(running&&total>0){total--;render();if(total===0){running=false;if(status)status.textContent="Mola zamanı 🎉";}}},1000);
  input.value=localStorage.getItem("sezrFocusVideo")||"https://youtu.be/lDw1f7Ymb8I";
  const fs=document.getElementById("focusStart"), fp=document.getElementById("focusPause"), fr=document.getElementById("focusReset"), fsave=document.getElementById("focusSave");
  if(fs)fs.onclick=start;if(fp)fp.onclick=()=>{running=false;if(status)status.textContent="Duraklatıldı";};if(fr)fr.onclick=()=>{running=false;total=work*60;if(status)status.textContent="Odak modu hazır";render();};if(fsave)fsave.onclick=()=>{if(loadVideo(input.value.trim(),"Kaydedilen video")){if(status)status.textContent="Video kaydedildi";sound="youtube";document.querySelectorAll(".focus-sound-choice").forEach(b=>b.classList.remove("active"));const y=document.querySelector('.focus-sound-choice[data-sound="youtube"]');if(y)y.classList.add("active");}};
  document.querySelectorAll(".focus-choice").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".focus-choice").forEach(b=>b.classList.remove("active"));btn.classList.add("active");setSession(btn.dataset.work,btn.dataset.break);});
  document.querySelectorAll(".focus-bg-choice").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".focus-bg-choice").forEach(b=>b.classList.remove("active"));btn.classList.add("active");setBg(btn.dataset.bg);});
  document.querySelectorAll(".focus-sound-choice").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".focus-sound-choice").forEach(b=>b.classList.remove("active"));btn.classList.add("active");sound=btn.dataset.sound;if(status)status.textContent=btn.textContent+" seçildi";});
  document.querySelectorAll(".focus-view-choice").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".focus-view-choice").forEach(b=>b.classList.remove("active"));btn.classList.add("active");setView(btn.dataset.view);});
  document.querySelectorAll(".focus-mode-card").forEach(card=>card.onclick=()=>{document.querySelectorAll(".focus-mode-card").forEach(c=>c.classList.remove("active"));card.classList.add("active");setSession(card.dataset.work||25,card.dataset.break||5);setBg(card.dataset.bg||"rain");if(title)title.textContent=card.dataset.title||"Focus Modu";if(input)input.value=card.dataset.link||"";if(card.dataset.link){sound="youtube";loadVideo(card.dataset.link,card.dataset.title);}else{screen.classList.remove("video-on");sound="silent";}if(status)status.textContent=(card.dataset.title||"Focus")+" seçildi";});
  setBg("rain");render();
})();

/* PWA GÜNCELLEME BİLDİRİMİ */
(function(){
  if(!("serviceWorker" in navigator)) return;
  function showUpdateToast(){
    if(document.getElementById("updateToast")) return;
    const t=document.createElement("div");
    t.id="updateToast";t.className="update-toast show";
    t.innerHTML='<span>Yeni sürüm hazır.</span><button type="button">Güncelle</button>';
    document.body.appendChild(t);
    t.querySelector("button").onclick=()=>location.reload();
  }
  navigator.serviceWorker.register("sw.js").then(reg=>{
    reg.addEventListener("updatefound",()=>{showUpdateToast();});
  }).catch(()=>{});
})();
