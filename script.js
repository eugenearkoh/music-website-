const chartTracks = [
  {rank:1,title:"Bra",artist:"Kweku Smoke",initials:"KS"},
  {rank:2,title:"Faith",artist:"Kweku Smoke & Lasmid",initials:"FL"},
  {rank:3,title:"Bombele",artist:"Kweku Smoke",initials:"KS"},
  {rank:4,title:"BALOTELLI (SUPA)",artist:"Kofi Mole",initials:"KM"},
  {rank:5,title:"Survival",artist:"Kweku Smoke",initials:"KS"},
  {rank:6,title:"Forgiveness",artist:"Asake",initials:"AS"},
  {rank:7,title:"Soul Healer",artist:"Kweku Smoke",initials:"KS"},
  {rank:8,title:"Ikebe (feat. Asake)",artist:"Blaqbonez & Asake",initials:"BA"},
  {rank:9,title:"B4 B4",artist:"Davido, FOLA & Mayorkun",initials:"DF"},
  {rank:10,title:"Hallelujah",artist:"Kweku Smoke",initials:"KS"}
];
const demoAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const audio = document.getElementById("audio");
const $ = id => document.getElementById(id);
let currentIndex = -1, isShuffle = false, isRepeat = false, toastTimer;
const tracks = chartTracks.map((t,i)=>({...t, audio:demoAudio, id:i}));
const liked = new Set();

function notify(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2400);
}
function renderChart(list=chartTracks){
  $("chartRows").innerHTML=list.map(t=>`
    <div class="chart-row">
      <span class="rank">${String(t.rank).padStart(2,"0")}</span>
      <div class="song-cell"><div class="cover">${t.initials}</div><div><strong>${escapeHTML(t.title)}</strong><small>Ghana chart selection</small></div></div>
      <span class="artist-cell">${escapeHTML(t.artist)}</span>
      <span class="source-pill">APPLE MUSIC</span>
      <button class="row-play" data-track="${t.rank-1}" aria-label="Play ${escapeHTML(t.title)}">▶</button>
    </div>`).join("");
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function playTrack(index){
  if(index<0||index>=tracks.length)return;
  currentIndex=index; const track=tracks[index];
  audio.src=track.audio; audio.load();
  $("nowTitle").textContent=track.title; $("nowArtist").textContent=`DEMO AUDIO · ${track.artist}`;
  $("miniCover").textContent=track.initials;
  $("likeButton").textContent=liked.has(track.id)?"♥":"♡";
  $("playButton").textContent="Ⅱ";
  audio.play().then(()=>notify(`Playing demo audio for: ${track.title}`)).catch(()=>{
    $("playButton").textContent="▶";
    notify("Audio preview could not load. Check your internet connection and try again.");
  });
}
function togglePlay(){
  if(currentIndex===-1){playTrack(0);return;}
  if(audio.paused){audio.play().then(()=>$("playButton").textContent="Ⅱ").catch(()=>notify("Unable to play this preview."));}
  else{audio.pause();$("playButton").textContent="▶";}
}
function nextTrack(){
  let next=isShuffle?Math.floor(Math.random()*tracks.length):(currentIndex+1)%tracks.length;
  playTrack(next);
}
function previousTrack(){
  if(audio.currentTime>3){audio.currentTime=0;return;}
  playTrack((currentIndex-1+tracks.length)%tracks.length);
}
renderChart();
$("chartRows").addEventListener("click",e=>{
  const btn=e.target.closest("[data-track]");if(btn)playTrack(Number(btn.dataset.track));
});
$("playButton").addEventListener("click",togglePlay);
$("nextButton").addEventListener("click",nextTrack);
$("prevButton").addEventListener("click",previousTrack);
$("shuffleButton").addEventListener("click",()=>{isShuffle=!isShuffle;$("shuffleButton").classList.toggle("is-active",isShuffle);notify(isShuffle?"Shuffle on":"Shuffle off");});
$("repeatButton").addEventListener("click",()=>{isRepeat=!isRepeat;audio.loop=isRepeat;$("repeatButton").classList.toggle("is-active",isRepeat);notify(isRepeat?"Repeat on":"Repeat off");});
$("likeButton").addEventListener("click",()=>{
  if(currentIndex<0){notify("Choose a track first.");return;}
  const id=tracks[currentIndex].id;
  liked.has(id)?liked.delete(id):liked.add(id);
  $("likeButton").textContent=liked.has(id)?"♥":"♡";
  notify(liked.has(id)?"Added to liked songs":"Removed from liked songs");
});
$("seekBar").addEventListener("input",e=>{if(audio.duration)audio.currentTime=(Number(e.target.value)/100)*audio.duration;});
$("volumeBar").addEventListener("input",e=>audio.volume=Number(e.target.value));
audio.volume=.75;
audio.addEventListener("loadedmetadata",()=>{$("duration").textContent=formatTime(audio.duration);});
audio.addEventListener("timeupdate",()=>{
  if(!audio.duration)return;
  $("seekBar").value=(audio.currentTime/audio.duration)*100;
  $("currentTime").textContent=formatTime(audio.currentTime);
});
audio.addEventListener("play",()=>$("playButton").textContent="Ⅱ");
audio.addEventListener("pause",()=>$("playButton").textContent="▶");
audio.addEventListener("ended",()=>{if(!isRepeat)nextTrack();});
function formatTime(seconds){if(!Number.isFinite(seconds))return"0:00";return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,"0")}`;}

const albums=[
  {name:"The Ghana Sound",artist:"Amapiano • Afrobeats • Hiplife",label:"GHANA",art:"assets/cover-ghana.svg",art:"assets/cover-ghana.svg",colors:["#7d4c31","#182d20"]},
  {name:"Street Poetry",artist:"New-school Ghana rap",label:"233",art:"assets/cover-street-poetry.svg",art:"assets/cover-street-poetry.svg",colors:["#5c342d","#b8794c"]},
  {name:"Highlife Revival",artist:"Roots meet the new wave",label:"HL",art:"assets/cover-highlife.svg",art:"assets/cover-highlife.svg",colors:["#34533a","#b2a15b"]},
  {name:"After Hours",artist:"Late-night Accra selection",label:"NIGHT",art:"assets/cover-after-hours.svg",art:"assets/cover-after-hours.svg",colors:["#34305a","#a16d91"]}
];
$("albumGrid").innerHTML=albums.map((a,i)=>`<button class="album-card" data-album="${escapeHTML(a.name)}"><div class="album-art" style="background:linear-gradient(140deg,${a.colors[0]},${a.colors[1]})"><img src="${a.art}" alt="${a.name} artwork" loading="lazy"></div><strong>${a.name}</strong><small>${a.artist}</small></button>`).join("");
$("albumGrid").addEventListener("click",e=>{const card=e.target.closest("[data-album]");if(card)notify(`${card.dataset.album} — curated collection coming soon.`);});

const artists=[
 {name:"Black Sherif",genre:"Hip-hop • Afrobeats",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Black_Sherif.jpg",alt:"Black Sherif performing"},
 {name:"Sarkodie",genre:"Hiplife • Hip-hop",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Sarkodie-1.jpg",alt:"Sarkodie performing in Accra"},
 {name:"Stonebwoy",genre:"Reggae • Dancehall",image:"",alt:""},
 {name:"Kweku Smoke",genre:"Hip-hop • Rap",image:"",alt:""},
 {name:"Lasmid",genre:"Afrobeats • Highlife",image:"https://commons.wikimedia.org/wiki/Special:FilePath/Lasmid.jpg",alt:"Lasmid"}
];
$("artistGrid").innerHTML=artists.map(a=>`<div class="artist-card"><div class="artist-photo">${a.image?`<img src="${a.image}" alt="${a.alt}" loading="lazy" onerror="this.remove();this.parentElement.textContent='${a.name.split(" ").map(x=>x[0]).join("")}'">`:a.name.split(" ").map(x=>x[0]).join("")}</div><strong>${a.name}</strong><small>${a.genre}</small></div>`).join("");

$("searchInput").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  const filtered=chartTracks.filter(t=>`${t.title} ${t.artist}`.toLowerCase().includes(q));
  renderChart(filtered);
});
$("likedNav").addEventListener("click",()=>notify(liked.size?`${liked.size} liked track(s) in this session.`:"You haven't liked any songs yet."));
document.querySelectorAll(".playlist-card").forEach(card=>card.addEventListener("click",()=>notify(`${card.dataset.playlist} — playlist concept selected.`)));
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link[href^='#']").forEach(link=>link.addEventListener("click",()=>{
  document.querySelectorAll(".nav-link").forEach(n=>n.classList.remove("active"));link.classList.add("active");
  $("sidebar").classList.remove("open");
}));
