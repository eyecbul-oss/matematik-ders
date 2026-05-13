
const info=document.getElementById('focusInfo');
setTimeout(()=>{
info.style.opacity='0';
},5000);

const quotes=[
'Başarı küçük tekrarlarla gelir.',
'Telefonu bırak, hedefe bak.',
'Bugünün emeği yarının gücü.'
];
setInterval(()=>{
document.getElementById('quoteBox').innerText=quotes[Math.floor(Math.random()*quotes.length)];
},5000);

function setTime(min){
document.getElementById('selectedTime').innerText=min;
document.getElementById('timerBox').innerText=min+':00';
}
