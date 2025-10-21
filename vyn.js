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

// Contoh pemanggilan
function showHome() { showPage('homePage'); }
function showTips() { showPage('tipsPage'); }
function showThnks() { showPage('thnksPage'); }

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

// Form unban send
sendBtn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const phone = normalizePhone(phoneEl.value.trim());
    const bandType = bandEl.value;

    if (!name || !phone) {
        feedback.style.display = 'block';
        feedback.textContent = 'Isi semua field terlebih dahulu.';
        return;
    }

    const subject = encodeURIComponent('Permohonan Unban WhatsApp');
    const body = encodeURIComponent(
        `Halo Tim WhatsApp,\n\nNama: ${name}\nNomor: ${phone}\nJenis Banding: ${bandType}\n\nMohon bantuannya untuk meng-unban akun saya.\n\nTerima kasih.`
    );

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=support@whatsapp.com&su=${subject}&body=${body}`;

    feedback.style.display = 'block';
    feedback.textContent = 'Mengarahkan ke Gmail...';

    window.open(mailtoLink, '_blank');
});

// Clear form
clearBtn.addEventListener('click', () => {
    nameEl.value = '';
    phoneEl.value = '';
    bandEl.selectedIndex = 0;
    feedback.style.display = 'none';
});
