
function toEmbed(url){try{const u=new URL(url);let id="";if(u.hostname.includes("youtu.be")) id=u.pathname.replace("/","");else if(u.searchParams.get("v")) id=u.searchParams.get("v");id=(id||"").split("?")[0].split("&")[0];return id?"https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1":"";}catch(e){return "";}}
document.querySelectorAll(".watch-video").forEach(btn=>{btn.addEventListener("click",()=>{const id=btn.dataset.video;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
document.querySelectorAll(".watch-playlist").forEach(btn=>{btn.addEventListener("click",()=>{const list=btn.dataset.list;const frame=document.getElementById("videoFrame");const player=document.getElementById("videoPlayer");frame.src="https://www.youtube.com/embed/videoseries?list="+list+"&rel=0&modestbranding=1";player.classList.add("show");player.scrollIntoView({behavior:"smooth",block:"center"});});});
(function(){let total=25*60,running=false;const timer=document.getElementById("focusTimer");function render(){if(timer){timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");}}setInterval(()=>{if(running&&total>0){total--;render();}},1000);const start=document.getElementById("focusStart"),pause=document.getElementById("focusPause"),reset=document.getElementById("focusReset"),save=document.getElementById("focusSave"),input=document.getElementById("focusVideoUrl"),frame=document.getElementById("focusVideoFrame"),box=document.getElementById("focusVideoBox");if(input){input.value=localStorage.getItem("sezrFocusVideo")||"";}if(save){save.onclick=()=>{const e=toEmbed(input.value.trim());if(!e){alert("Geçerli YouTube linki yapıştır.");return;}localStorage.setItem("sezrFocusVideo",input.value.trim());frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});};}if(start){start.onclick=()=>{running=true;const url=(input&&input.value.trim())||localStorage.getItem("sezrFocusVideo");const e=toEmbed(url);if(e&&frame&&box){frame.src=e;box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"center"});}};}if(pause){pause.onclick=()=>running=false;}if(reset){reset.onclick=()=>{running=false;total=25*60;render();};}render();})();
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}


/* FOCUS SAYFASI YENİ PANEL */
(function(){
  let total=25*60;
  let running=false;
  const timer=document.getElementById("focusTimer");
  const status=document.getElementById("focusStatus");
  const input=document.getElementById("focusVideoUrl");
  const frame=document.getElementById("focusVideoFrame");
  const screen=document.getElementById("focusMainScreen");

  function toEmbedClean(url){
    try{
      const u=new URL(url);
      let id="";
      if(u.hostname.includes("youtu.be")) id=u.pathname.replace("/","");
      else if(u.searchParams.get("v")) id=u.searchParams.get("v");
      else if(u.pathname.includes("/embed/")) id=u.pathname.split("/embed/")[1];
      id=(id||"").split("?")[0].split("&")[0];
      return id ? "https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1&playsinline=1" : "";
    }catch(e){return "";}
  }

  function render(){
    if(timer){
      timer.textContent=String(Math.floor(total/60)).padStart(2,"0")+":"+String(total%60).padStart(2,"0");
    }
  }

  function loadFocusVideo(url){
    const embed=toEmbedClean(url);
    if(!embed){
      alert("Geçerli YouTube linki yapıştır.");
      return false;
    }
    if(frame) frame.src=embed;
    if(screen) screen.classList.add("video-on");
    localStorage.setItem("sezrFocusVideo",url);
    return true;
  }

  setInterval(function(){
    if(running && total>0){
      total--;
      render();
      if(total===0){
        running=false;
        if(status) status.textContent="Pomodoro tamamlandı 🎉";
      }
    }
  },1000);

  if(input){
    input.value=localStorage.getItem("sezrFocusVideo") || "https://youtu.be/lDw1f7Ymb8I";
  }

  const save=document.getElementById("focusSave");
  const start=document.getElementById("focusStart");
  const pause=document.getElementById("focusPause");
  const reset=document.getElementById("focusReset");

  if(save){
    save.onclick=function(){
      if(loadFocusVideo(input.value.trim())){
        if(status) status.textContent="Video kaydedildi";
      }
    };
  }

  if(start){
    start.onclick=function(){
      const url=(input&&input.value.trim()) || localStorage.getItem("sezrFocusVideo") || "https://youtu.be/lDw1f7Ymb8I";
      if(loadFocusVideo(url)){
        running=true;
        if(status) status.textContent="Focus modu aktif";
      }
    };
  }

  if(pause){
    pause.onclick=function(){
      running=false;
      if(status) status.textContent="Duraklatıldı";
    };
  }

  if(reset){
    reset.onclick=function(){
      running=false;
      total=25*60;
      render();
      if(status) status.textContent="Odak modu hazır";
    };
  }

  document.querySelectorAll(".focus-mini-card").forEach(function(card){
    card.addEventListener("click",function(){
      document.querySelectorAll(".focus-mini-card").forEach(function(c){c.classList.remove("active");});
      card.classList.add("active");
      const url=card.dataset.focusLink;
      if(input) input.value=url;
      loadFocusVideo(url);
    });
  });

  render();
})();
