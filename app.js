
function toEmbed(url){try{const u=new URL(url);let id="";if(u.hostname.includes("youtu.be")) id=u.pathname.replace("/","");else if(u.searchParams.get("v")) id=u.searchParams.get("v");id=(id||"").split("?")[0].split("&")[0];return id?"https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1":"";}catch(e){return "";}}
document.querySelectorAll(".watch-video").forEach(btn=>{btn.addEventListener("click",()=>{const id=btn.dataset.video;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
document.querySelectorAll(".watch-playlist").forEach(btn=>{btn.addEventListener("click",()=>{const list=btn.dataset.list;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/videoseries?list="+list+"&rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
(function(){let total=25*60,running=false;const timer=document.getElementById("focusTimer");function render(){if(timer){timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");}}setInterval(()=>{if(running&&total>0){total--;render();}},1000);const start=document.getElementById("focusStart"),pause=document.getElementById("focusPause"),reset=document.getElementById("focusReset"),save=document.getElementById("focusSave"),input=document.getElementById("focusVideoUrl"),frame=document.getElementById("focusVideoFrame"),box=document.getElementById("focusVideoBox");if(input){input.value=localStorage.getItem("sezrFocusVideo")||"";}if(save){save.onclick=()=>{const e=toEmbed(input.value.trim());if(!e){alert("Geçerli YouTube linki yapıştır.");return;}localStorage.setItem("sezrFocusVideo",input.value.trim());frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});};}if(start){start.onclick=()=>{running=true;const url=(input&&input.value.trim())||localStorage.getItem("sezrFocusVideo");const e=toEmbed(url);if(e&&frame&&box){frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});}};}if(pause){pause.onclick=()=>running=false;}if(reset){reset.onclick=()=>{running=false;total=25*60;render();};}render();})();
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}




/* FOCUS ROOM - EN İYİ MOBİL TASARIM JS */
(function(){
  const timer=document.getElementById("focusTimer");
  const status=document.getElementById("focusStatus");
  const input=document.getElementById("focusVideoUrl");
  const frame=document.getElementById("focusVideoFrame");
  const screen=document.getElementById("focusMainScreen");
  const now=document.getElementById("focusNowPlaying");
  if(!timer || !input || !frame || !screen) return;
  let total=25*60, running=false;
  function toEmbed(url){
    try{
      const u=new URL(url); let id="";
      if(u.hostname.includes("youtu.be")) id=u.pathname.replace("/","");
      else if(u.searchParams.get("v")) id=u.searchParams.get("v");
      else if(u.pathname.includes("/embed/")) id=u.pathname.split("/embed/")[1];
      id=(id||"").split("?")[0].split("&")[0];
      return id ? "https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1&playsinline=1" : "";
    }catch(e){return "";}
  }
  function render(){timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");}
  function loadVideo(url,title){
    const embed=toEmbed(url);
    if(!embed){alert("Geçerli YouTube linki yapıştır.");return false;}
    frame.src=embed; screen.classList.add("video-on");
    localStorage.setItem("sezrFocusVideo",url);
    if(now) now.textContent=title || "Focus videosu açıldı";
    return true;
  }
  setInterval(function(){if(running&&total>0){total--;render();if(total===0){running=false;if(status)status.textContent="Pomodoro tamamlandı 🎉";}}},1000);
  input.value=localStorage.getItem("sezrFocusVideo") || "https://youtu.be/lDw1f7Ymb8I";
  document.getElementById("focusSave").onclick=function(){if(loadVideo(input.value.trim(),"Kaydedilen video")){if(status)status.textContent="Video kaydedildi";}};
  document.getElementById("focusStart").onclick=function(){const url=input.value.trim()||localStorage.getItem("sezrFocusVideo")||"https://youtu.be/lDw1f7Ymb8I";if(loadVideo(url,"Focus modu aktif")){running=true;if(status)status.textContent="Focus modu aktif";}};
  document.getElementById("focusPause").onclick=function(){running=false;if(status)status.textContent="Duraklatıldı";};
  document.getElementById("focusReset").onclick=function(){running=false;total=25*60;render();if(status)status.textContent="Odak modu hazır";};
  document.querySelectorAll(".focus-list-item").forEach(function(item){item.addEventListener("click",function(){document.querySelectorAll(".focus-list-item").forEach(function(i){i.classList.remove("active");});item.classList.add("active");const url=item.dataset.focusLink;const title=item.dataset.title||"Hazır video";input.value=url;loadVideo(url,title);});});
  render();
})();


/* AÇIK/KARANLIK TEMA BUTONU */
(function(){
  if(document.getElementById("themeToggle")) return;
  const btn=document.createElement("button");
  btn.id="themeToggle";
  btn.className="theme-toggle";
  btn.type="button";
  btn.setAttribute("aria-label","Tema değiştir");
  document.body.appendChild(btn);
  function applyTheme(theme){
    if(theme==="light"){
      document.body.classList.add("light-theme");
      btn.textContent="🌙";
    }else{
      document.body.classList.remove("light-theme");
      btn.textContent="☀️";
    }
  }
  const saved=localStorage.getItem("sezrTheme")||"dark";
  applyTheme(saved);
  btn.addEventListener("click",function(){
    const next=document.body.classList.contains("light-theme")?"dark":"light";
    localStorage.setItem("sezrTheme",next);
    applyTheme(next);
  });
})();
