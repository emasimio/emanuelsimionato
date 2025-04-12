// ==========================
// INIZIALIZZAZIONE VIDEO SOUND TOGGLE
// ==========================
function initializeSoundToggles() {
    const wrappers = document.querySelectorAll('.has-sound-toggle');

    wrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const button = wrapper.querySelector('.sound-toggle');

        if (!video || !button) return;

        // Imposta il testo iniziale
        button.textContent = video.muted ? 'Sound' : 'Mute';

        // Gestisci il click
        button.onclick = () => {
            video.muted = !video.muted;
            button.textContent = video.muted ? 'Sound' : 'Mute';

            // Se il video è in pausa, prova a farlo partire
            if (video.paused || video.readyState < 3) {
                video.play().catch(err => {
                    console.warn("Errore nel playback:", err);
                });
            }
        };
    });
}

// ==========================
// GESTIONE TITOLI DINAMICI (SEZIONE "WORK")
// ==========================
function updateProjectTitles() {
    const homes = document.querySelectorAll('.home');
    const scrollPosition = document.getElementById('work').scrollTop;
    const windowHeight = window.innerHeight;
    const homeTitles = document.querySelectorAll('.home-title');

    let activeIndex = 0;

    homes.forEach((home, index) => {
        const homeTop = home.offsetTop;
        if (scrollPosition >= homeTop - windowHeight / 2) {
            activeIndex = index;
        }
    });

    homeTitles.forEach((title, index) => {
        if (index <= activeIndex) {
            title.style.transform = `translateY(0rem)`;
            title.style.opacity = index === activeIndex ? '1' : '0.5';
        } else {
            title.style.transform = 'translateY(calc(100vh - 15rem))';
            title.style.opacity = '0.5';
        }
    });
}

// ==========================
// CAMBIO SEZIONE
// ==========================
function showSection(sectionId) {
    // Nasconde tutte le sezioni
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });

    // Mostra la sezione attiva
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');

    // Aggiorna lo stato attivo nella navbar
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Mostra i titoli solo nella sezione "work"
    const homeTitlesContainer = document.querySelector('.home-titles');
    homeTitlesContainer.style.display = sectionId === 'work' ? 'flex' : 'none';

    // Se è la sezione "work", aggiorna i titoli
    if (sectionId === 'work') {
        updateProjectTitles();
    }

    // Inizializza i bottoni "sound" in ogni nuova sezione
    initializeSoundToggles();
}

// ==========================
// ALL'AVVIO DELLA PAGINA
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const workSection = document.getElementById('work');
    const homeTitles = document.querySelectorAll('.home-title');

    // Posiziona inizialmente i titoli
    homeTitles.forEach((title, index) => {
        title.style.top = `${index * 1.35}rem`;
        title.style.transform = 'translateY(calc(100vh - 15rem))';
    });

    // Mostra la sezione "work" all'inizio (puoi cambiare in "about" o altro)
    if (workSection) {
        workSection.classList.remove('hidden');
        if (homeTitles.length > 0) {
            homeTitles[0].style.transform = 'translateY(0)';
        }
        workSection.addEventListener('scroll', updateProjectTitles);
    }

    // Inizializza i bottoni "sound"
    initializeSoundToggles();
});

document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll('.autoplay-video');
  
    // Precarica tutti i video
    videos.forEach(video => video.load());
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
  
        if (entry.isIntersecting) {
          video.loop = true;
          const playPromise = video.play();
  
          // Per compatibilità: alcuni browser restituiscono una Promise
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.warn('Autoplay non riuscito per un video:', error);
            });
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, { threshold: 0.2 });
  
    videos.forEach(video => observer.observe(video));
  });

