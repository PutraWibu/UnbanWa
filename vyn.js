/*
   Source Code By : PutraaMods Official ✨
*/


  // ===== PASSWORD LOGIN =====
const TRUE_PASSWORD = 'PUTRAXCRAK';
const splash = document.getElementById('splash');
const navbar = document.getElementById('navbar');
const homePage = document.getElementById('homePage');
const tipsPage = document.getElementById('tipsPage');
const thnksPage = document.getElementById('ThnksTo');
const pwInput = document.getElementById('passwordInput');
const pwBtn = document.getElementById('pwBtn');
const pwMsg = document.getElementById('pwMsg');

// ===== NAVBAR & MENU =====
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const homeLink = document.getElementById('homeLink');
const tipsLink = document.getElementById('tipsLink');
const thnksLink = document.getElementById('ThnksToLink');

// ===== MUSIC PLAYER =====
const playPauseBtn = document.getElementById('playPauseBtn');
const bgMusic = document.getElementById('bgMusic');
const musicStatus = document.getElementById('musicStatus');
let isPlaying = false;

// ===== FORM UNBAN =====
const nameEl = document.getElementById('name');
const phoneEl = document.getElementById('phone');
const bandEl = document.getElementById('bandOption');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const feedback = document.getElementById('feedback');


   
// ----------------------- FUNCTIONS -----------------------

// Show different pages
function showHome() {
    homePage.style.display = 'block';
    tipsPage.style.display = 'none';
    thnksPage.style.display = 'none';
    menu.classList.remove('show');
    menuBtn.classList.remove('active');
}

function showTips() {
    homePage.style.display = 'none';
    tipsPage.style.display = 'block';
    thnksPage.style.display = 'none';
    menu.classList.remove('show');
    menuBtn.classList.remove('active');
}

function showThnks() {
    homePage.style.display = 'none';
    tipsPage.style.display = 'none';
    thnksPage.style.display = 'block';
    menu.classList.remove('show');
    menuBtn.classList.remove('active');
}

// Password login
pwBtn.addEventListener('click', () => {
    const val = pwInput.value.trim();
    if (val === TRUE_PASSWORD) {
        splash.style.display = 'none';
        navbar.style.display = 'flex';
        showHome();
    } else {
        pwMsg.textContent = 'Password salah — coba lagi.';
    }
});

pwInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') pwBtn.click();
});

// Hamburger toggle
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuBtn.classList.toggle('active');
});

// Menu navigation
// ----------------------- LOCAL STORAGE HALAMAN TERAKHIR -----------------------

// Fungsi sembunyikan semua halaman
function hideAllPages() {
    homePage.style.display = 'none';
    tipsPage.style.display = 'none';
    thnksPage.style.display = 'none';
}

// Tampilkan halaman tertentu dan simpan di localStorage
function showPage(pageId) {
    hideAllPages();
    const page = document.getElementById(pageId);
    if(page) page.style.display = 'block';
    menu.classList.remove('show');
    menuBtn.classList.remove('active');
    localStorage.setItem('lastPage', pageId);
}


// ===== LOAD HALAMAN TERAKHIR SAAT REFRESH =====
window.addEventListener('load', () => {
    const lastPage = localStorage.getItem('lastPage');
    if(lastPage) {
        splash.style.display = 'none'; // sembunyikan splash jika sudah login
        navbar.style.display = 'flex';
        showPage(lastPage); // tampilkan halaman terakhir
    }
});

homeLink.addEventListener('click', showHome);
tipsLink.addEventListener('click', showTips);
thnksLink.addEventListener('click', showThnks);
// Music player toggle
playPauseBtn.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play();
        playPauseBtn.textContent = '⏸️';
        musicStatus.textContent = 'Memutar lagu...';
    } else {
        bgMusic.pause();
        playPauseBtn.textContent = '▶️';
        musicStatus.textContent = 'PutraMods Music';
    }
    isPlaying = !isPlaying;
});

// Normalize phone number (remove spaces, add + if missing)
function normalizePhone(raw) {
    if (!raw) return null;
    let s = raw.replace(/\s+/g, '');
    if (!s.startsWith('+')) s = '+' + s;
    return s;
}

// Form Unban
const nameEl=document.getElementById('name');
const phoneEl=document.getElementById('phone');
const bandEl=document.getElementById('bandOption');
const sendBtn=document.getElementById('sendBtn');
const feedback=document.getElementById('feedback');
const clearBtn=document.getElementById('clearBtn');

function normalizePhone(raw){
  if(!raw)return null;
  let s=raw.replace(/[\s()-]/g,'');
  if(/^0[0-9]+$/.test(s))s='+62'+s.slice(1);
  if(/^62[0-9]+$/.test(s))s='+'+s;
  if(/^\+[0-9]+$/.test(s))return s;
  return null;
}

sendBtn.addEventListener('click',()=>{
  const nama=nameEl.value.trim();
  const num=normalizePhone(phoneEl.value.trim());
  if(!nama){
    feedback.style.display='block';
    feedback.style.color='#f87171';
    feedback.textContent='Nama tidak boleh kosong.';
    return;
  }
  if(!num){
    feedback.style.display='block';
    feedback.style.color='#f87171';
    feedback.textContent='Nomor WhatsApp tidak valid.';
    return;
  }
  feedback.style.display='block';
  feedback.style.color='#0ef';
  feedback.textContent='Menyiapkan email banding...';
  const band=bandEl.value;
  const subject=`Permohonan Banding Pemblokiran Akun WhatsApp (${num})`;
  let bodyText='';
  if(band==='permanen'){
    bodyText=`Halo Tim WhatsApp,

Saya ingin mengajukan banding atas pemblokiran permanen terhadap akun WhatsApp saya dengan nomor ${num}. Saya yakin pemblokiran ini terjadi karena kesalahpahaman atau sistem yang salah mendeteksi aktivitas akun saya.

Saya menggunakan akun ini hanya untuk berkomunikasi dengan keluarga, teman, dan keperluan pribadi/bisnis kecil. Mohon untuk meninjau kembali kasus saya dan mempertimbangkan untuk mengaktifkan kembali akun tersebut.

Terima kasih atas perhatian dan kerja samanya.

Hormat saya,
${nama}
Nomor WhatsApp: ${num}`;
  }else{
    bodyText=`Halo Tim WhatsApp,

Saya ingin mengajukan permohonan peninjauan atas pemblokiran sementara pada akun WhatsApp saya dengan nomor ${num}. Saya mohon maaf jika ada aktivitas yang dianggap melanggar kebijakan WhatsApp.

Saya berkomitmen untuk mematuhi seluruh Ketentuan Layanan dan tidak akan menggunakan aplikasi modifikasi atau fitur yang tidak resmi di masa mendatang.

Terima kasih atas perhatian dan pengertiannya.

Hormat saya,
${nama}
Nomor WhatsApp: ${num}`;
  }

  const mailto=`mailto:support@support.whatsapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  setTimeout(()=>{
    window.location.href=mailto;
    setTimeout(()=>{
      nameEl.value='';
      phoneEl.value='';
      bandEl.value='permanen';
      feedback.style.display='none';
    },2000);
  },1000);
});

clearBtn.addEventListener('click',()=>{
  nameEl.value='';
  phoneEl.value='';
  bandEl.value='permanen';
  feedback.style.display='none';
});
