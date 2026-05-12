
const heroTimer=document.getElementById('heroTimer');
const mainTimer=document.getElementById('mainTimer');

function syncTimers(){
heroTimer.textContent=mainTimer.textContent;
}

syncTimers();
