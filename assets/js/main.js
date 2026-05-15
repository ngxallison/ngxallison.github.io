// Generate waveform bars
const waveform = document.querySelector('.hero__waveform');
if (waveform) {
  const barCount = 64;
  // Rough bell-curve shape: taller in the middle, shorter at edges
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.classList.add('wbar');
    // Create a natural-looking waveform envelope
    const pos = i / barCount;
    const envelope = Math.sin(pos * Math.PI); // 0 → 1 → 0
    const noise = 0.4 + Math.random() * 0.6;
    const maxH = envelope * noise;
    bar.style.setProperty('--bar-max', maxH);
    bar.style.animationDelay = `${(Math.random() * 1.4).toFixed(2)}s`;
    bar.style.animationDuration = `${(0.9 + Math.random() * 0.8).toFixed(2)}s`;
    // Colour: brighter blue in the middle, softer at edges
    const brightness = 60 + Math.round(envelope * 40);
    bar.style.background = `hsl(204, 65%, ${brightness}%)`;
    waveform.appendChild(bar);
  }
}


const cursor = document.getElementById('noteCursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursor.style.transition = 'transform 0.1s ease';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.transition = 'transform 0.2s ease';
  });
}

// Progress bar — tracks real time on page
const progressFill = document.querySelector('.audio-bar__progress-fill');
const timeEl = document.querySelector('.audio-bar__time');
const MAX_SECONDS = 200; // bar fills over 3 minutes and 20 seconds

const startTime = Date.now();

setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const pct = Math.min(100, (elapsed / MAX_SECONDS) * 100);

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;

  if (progressFill) progressFill.style.width = pct + '%';
  if (timeEl) timeEl.textContent =
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}, 1000);

// Skill bar animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-item__fill').forEach(bar => {
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#skills').forEach(el => observer.observe(el));

// Pause skill bar animations initially
document.querySelectorAll('.skill-item__fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
});

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.style.opacity = '0.7';
    l.style.color = '#a8d4ef';
  });
  const active = document.querySelector(`.nav__link[href="#${current}"]`);
  if (active) { active.style.opacity = '1'; active.style.color = 'var(--light-blue)'; }
});

// Piano with real samples
const piano = document.getElementById('piano');
const notesArea = document.getElementById('pianoNotes');

const hobbies = [
  'Music Production',
  'Language Learning',
  'Reading',
  'Gaming',
  'Travel',
  'Songwriting',
  'Programming',
  'Research',
  'Singing',
  'Food',
  'Fashion',
];

// 88-key pattern
const keyPattern = [
  true,false,true,false,true,true,false,true,false,true,false,true, // C3 
  true,false,true,false,true,true,false,true,false,true,false,true, // C4 
  true,false,true,false,true,true,false,true,false,true,false,true, // C5 
  true // C6
];

// Note names for each key index
const NOTE_NAMES = [
  'C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3',
  'C4','Db4','D4','Eb4','E4','F4','Gb4','G4','Ab4','A4','Bb4','B4',
  'C5','Db5','D5','Eb5','E5','F5','Gb5','G5','Ab5','A5','Bb5','B5',
  'C6'
];

// Load the Salamander grand piano samples
const pianoSampler = new Tone.Sampler({
  urls: {
    'C3':  'C3.mp3',
    'D#3': 'Ds3.mp3',
    'F#3': 'Fs3.mp3',
    'A3':  'A3.mp3',
    'C4':  'C4.mp3',
    'D#4': 'Ds4.mp3',
    'F#4': 'Fs4.mp3',
    'A4':  'A4.mp3',
    'C5':  'C5.mp3',
    'D#5': 'Ds5.mp3',
    'F#5': 'Fs5.mp3',
    'A5':  'A5.mp3',
    'C6':  'C6.mp3',
  },
  release: 0.8,
  baseUrl: 'https://tonejs.github.io/audio/salamander/',
  onload: () => {
    console.log('Piano samples loaded');
  }
}).toDestination();

if (piano && notesArea) {
  keyPattern.forEach((isWhite, index) => {
    const key = document.createElement('div');
    key.classList.add('piano__key', isWhite ? 'white' : 'black');

    key.addEventListener('click', async () => {
      // Resume audio context on first click (browser requirement)
      await Tone.start();

      // Flash key
      key.classList.add('active');
      setTimeout(() => key.classList.remove('active'), 200);

      // Play the real piano note
      const noteName = NOTE_NAMES[index];
      pianoSampler.releaseAll(Tone.now());
      pianoSampler.triggerAttackRelease(noteName, '4n', Tone.now() + 0.05);

      // Pick random hobby
      const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];

      // Rising note label
      const noteEl = document.createElement('div');
      noteEl.classList.add('piano-note');
      noteEl.textContent = '♪ ' + hobby;

      const keyRect = key.getBoundingClientRect();
      const areaRect = notesArea.getBoundingClientRect();
      const leftPos = keyRect.left - areaRect.left + keyRect.width / 2;
      noteEl.style.left = leftPos + 'px';
      noteEl.style.transform = 'translateX(-50%)';

      notesArea.appendChild(noteEl);
      setTimeout(() => noteEl.remove(), 2500);
    });

    piano.appendChild(key);
  });
}

// Project card arrows
const projGrid = document.getElementById('projectsGrid');
const projLeft = document.getElementById('projLeft');
const projRight = document.getElementById('projRight');

if (projGrid && projLeft && projRight) {
  const scrollAmount = projGrid.querySelector('.project-card')?.offsetWidth + 32 || 500;

  function updateArrows() {
    projLeft.classList.toggle('hidden', projGrid.scrollLeft <= 0);
    projRight.classList.toggle('hidden',
      projGrid.scrollLeft + projGrid.clientWidth >= projGrid.scrollWidth - 1
    );
  }

  projLeft.addEventListener('click', () => {
    projGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  projRight.addEventListener('click', () => {
    projGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  projGrid.addEventListener('scroll', updateArrows);

  // Set initial arrow state
  updateArrows();
}

// Mobile menu
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__links');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('nav__links--open');
  });

  mobileMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('nav__links--open');
    });
  });
}