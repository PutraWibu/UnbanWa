/*
   Source Code By : PutraaMods Official ✨
*/

// --- PASSWORD LOGIN ---
const TRUE_PASSWORD = 'PUTRAXCRAK';
const splash = document.getElementById('splash');
const navbar = document.getElementById('navbar');
const homePage = document.getElementById('homePage');
const tipsPage = document.getElementById('tipsPage');
const thnksPage = document.getElementById('ThnksTo');
const pwInput = document.getElementById('passwordInput');
const pwBtn = document.getElementById('pwBtn');
const pwMsg = document.getElementById('pwMsg');

// --- NAVBAR & MENU ---
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const homeLink = document.getElementById('homeLink');
const tipsLink = document.getElementById('tipsLink');
const thnksLink = document.getElementById('ThnksToLink');
const brandTop = document.getElementById('brandTop');

// Brand click ke website
brandTop.style.cursor = 'pointer';
brandTop.addEventListener('click', ()=> window.open('https://putramods.vercel.app', '_blank') );

// --- MUSIC PLAYER ---
const playPauseBtn = document.getElementById('playPauseBtn');
const bgMusic = document.getElementById('bgMusic');
const musicStatus = document.getElementById('musicStatus');
let isPlaying = false;

playPauseBtn.addEventListener('click', ()=>{
  if(!isPlaying){ bgMusic.play(); playPauseBtn.textContent='⏸️'; musicStatus.textContent='Memutar lagu...'; }
  else{ bgMusic.pause(); playPauseBtn.textContent='▶️'; musicStatus.textContent='PutraMods Music'; }
  isPlaying = !isPlaying;
});

// --- PAGE FUNCTIONS ---
function showHome(){ homePage.style.display='block'; tipsPage.style.display='none'; thnksPage.style.display='none'; menu.classList.remove('show'); menuBtn.classList.remove('active'); }
function showTips(){ homePage.style.display='none'; tipsPage.style.display='block'; thnksPage.style.display='none'; menu.classList.remove('show'); menuBtn.classList.remove('active'); }
function showThnks(){ homePage.style.display='none'; tipsPage.style.display='none'; thnksPage.style.display='block'; menu.classList.remove('show'); menuBtn.classList.remove('active'); }

// --- PASSWORD ---
pwBtn.addEventListener('click', ()=>{
  if(pwInput.value.trim() === TRUE_PASSWORD){
    splash.style.display='none';
    navbar.style.display='flex';
    showHome();
  }else{
    pwMsg.textContent='Password salah — coba lagi.';
  }
});
pwInput.addEventListener('keydown', e => { if(e.key==='Enter') pwBtn.click(); });

// --- MENU TOGGLE ---
menuBtn.addEventListener('click', ()=> { menu.classList.toggle('show'); menuBtn.classList.toggle('active'); });
homeLink.addEventListener('click', showHome);
tipsLink.addEventListener('click', showTips);
thnksLink.addEventListener('click', showThnks);

// --- FORM UNBAN ---
const nameEl = document.getElementById('name');
const phoneEl = document.getElementById('phone');
const bandEl = document.getElementById('bandOption');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const feedback = document.getElementById('feedback');

function normalizePhone(raw){
  if(!raw) return null;
  let s = raw.replace(/[\s()-]/g,'');
  if(/^0[0-9]+$/.test(s)) s = '+62'+s.slice(1);
  if(/^62[0-9]+$/.test(s)) s = '+'+s;
  if(/^\+[0-9]+$/.test(s)) return s;
  return null;
}

sendBtn.addEventListener('click', ()=>{
  const nama = nameEl.value.trim();
  const num = normalizePhone(phoneEl.value.trim());
  if(!nama){ feedback.style.display='block'; feedback.style.color='#f87171'; feedback.textContent='Nama tidak boleh kosong.'; return; }
  if(!num){ feedback.style.display='block'; feedback.style.color='#f87171'; feedback.textContent='Nomor WhatsApp tidak valid.'; return; }

  feedback.style.display='block';
  feedback.style.color='#0ef';
  feedback.textContent='Menyiapkan email banding...';

  const band = bandEl.value;
  const subject = `Permohonan Banding Pemblokiran Akun WhatsApp (${num})`;
  let bodyText = '';

  if(band==='permanen'){
    bodyText=`Halo Tim WhatsApp,

Saya ingin mengajukan banding atas pemblokiran permanen terhadap akun WhatsApp saya dengan nomor ${num}. Saya yakin pemblokiran ini terjadi karena kesalahpahaman atau sistem yang salah mendeteksi aktivitas akun saya.

Saya menggunakan akun ini hanya untuk berkomunikasi dengan keluarga, teman, dan keperluan pribadi/bisnis kecil. Mohon untuk meninj
