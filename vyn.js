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

// Sembunyikan semua halaman
function hideAllPages() {
    homePage.style.display = 'none';
    tipsPage.style.display = 'none';
    thnksPage.style.display = 'none';
}

// Tampilkan halaman tertentu dan simpan di localStorage
function showPage(pageId) {
    hideAllPages();
    const page = document.getElementById(pageId);
    if (page) page.style.display = 'block';
    menu.classList.remove('show');
    menuBtn.classList.remove('active');
    localStorage.setItem('lastPage', pageId);
}

// Shortcut untuk halaman tertentu
function showHome() { showPage('homePage'); }
function showTips() { showPage('tipsPage'); }
function showThnks() { showPage('ThnksTo'); }

// ===== PASSWORD LOGIN =====
pwBtn.addEventListener('click', () => {
    const val = pwInput.value.trim();
    if (val === TRUE_PASSWORD) {
        splash.style.display = 'none';
        navbar.style.display = 'flex';
        const lastPage = localStorage.getItem('lastPage') || 'homePage';
        showPage(lastPage);
    } else {
        pwMsg.textContent = 'Password salah — coba lagi.';
    }
});

pwInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') pwBtn.click();
});

// ===== NAVBAR MENU =====
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuBtn.classList.toggle('active');
});

homeLink.addEventListener('click', showHome);
tipsLink.addEventListener('click', showTips);
thnksLink.addEventListener('click', showThnks);

// ===== MUSIC PLAYER =====
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

// ===== NORMALIZE PHONE =====
function normalizePhone(raw) {
    if (!raw) return null;
    let s = raw.replace(/[\s()-]/g, '');
    if (/^0[0-9]+$/.test(s)) s = '+62' + s.slice(1);
    else if (/^62[0-9]+$/.test(s)) s = '+' + s;
    else if (!/^\+[0-9]+$/.test(s)) return null;
    return s;
}

// ===== FORM UNBAN =====
sendBtn.addEventListener('click', () => {
    const nama = nameEl.value.trim();
    const num = normalizePhone(phoneEl.value.trim());
    if (!nama) {
        feedback.style.display = 'block';
        feedback.style.color = '#f87171';
        feedback.textContent = 'Nama tidak boleh kosong.';
        return;
    }
    if (!num) {
        feedback.style.display = 'block';
        feedback.style.color = '#f87171';
        feedback.textContent = 'Nomor WhatsApp tidak valid.';
        return;
    }

    feedback.style.display = 'block';
    feedback.style.color = '#0ef';
    feedback.textContent = 'Menyiapkan email banding...';

    const band = bandEl.value;
    let subject = '';
    let bodyText = '';

    if (band === 'permanen') {
        subject = `Permohonan Banding Pemblokiran Akun WhatsApp (${num})`;
        bodyText = `Halo Tim WhatsApp,

Saya ingin mengajukan banding atas pemblokiran permanen terhadap akun WhatsApp saya dengan nomor ${num}. Saya yakin pemblokiran ini terjadi karena kesalahpahaman atau sistem yang salah mendeteksi aktivitas akun saya.

Saya menggunakan akun ini hanya untuk berkomunikasi dengan keluarga, teman, dan keperluan pribadi/bisnis kecil. Mohon untuk meninjau kembali kasus saya dan mempertimbangkan untuk mengaktifkan kembali akun tersebut.

Terima kasih atas perhatian dan kerja samanya.

Hormat saya,
${nama}
Nomor WhatsApp: ${num}`;
    } else if (band === 'sementara') {
        subject = `Permohonan Pembuka Blokiran WhatsApp Secara Tiba-tiba (${num})`;
        bodyText = `Halo Tim WhatsApp,

Saya ingin mengajukan permohonan pembukaan blokiran sementara pada akun WhatsApp saya dengan nomor ${num}. Akun saya tiba-tiba diblokir, padahal banyak tugas dan komunikasi penting yang harus saya lakukan.

Saya berharap pihak WhatsApp dapat meninjau kembali pemblokiran ini dan membantu saya agar akun dapat digunakan kembali secepatnya.

Terima kasih atas perhatian dan bantuan Tim WhatsApp.

Hormat saya,
${nama}
Nomor WhatsApp: ${num}`;
    } else {
        subject = `Permohonan Banding WhatsApp (${num})`;
        bodyText = `Halo Tim WhatsApp,

Saya ingin mengajukan banding atas pemblokiran akun WhatsApp saya dengan nomor ${num}.

Terima kasih.

Hormat saya,
${nama}
Nomor WhatsApp: ${num}`;
    }

    const mailto = `mailto:support@support.whatsapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    setTimeout(() => {
        window.location.href = mailto;
        setTimeout(() => {
            nameEl.value = '';
            phoneEl.value = '';
            bandEl.value = 'permanen';
            feedback.style.display = 'none';
        }, 2000);
    }, 1000);
});

// ===== CLEAR FORM =====
clearBtn.addEventListener('click', () => {
    nameEl.value = '';
    phoneEl.value = '';
    bandEl.value = 'permanen';
    feedback.style.display = 'none';
});

// ===== LOAD HALAMAN TERAKHIR SAAT REFRESH =====
window.addEventListener('load', () => {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage) {
        splash.style.display = 'none';
        navbar.style.display = 'flex';
        showPage(lastPage);
    }
});
