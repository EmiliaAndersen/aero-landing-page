const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

const rotatingWord = document.querySelector("[data-rotating-word]");
const rotatingWords = [
  { text: "No es solo un vuelo.", tone: "tone-primary" },
  { text: "Es un registro.", tone: "tone-blue" },
  { text: "Es una comparación.", tone: "tone-green" },
  { text: "Es evidencia.", tone: "tone-amber" },
  { text: "Es seguimiento.", tone: "tone-primary" },
];

let rotatingIndex = 0;

if (rotatingWord) {
  window.setInterval(() => {
    rotatingWord.classList.add("is-changing");

    window.setTimeout(() => {
      rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
      rotatingWord.textContent = rotatingWords[rotatingIndex].text;
      rotatingWord.className = rotatingWords[rotatingIndex].tone;
      rotatingWord.classList.remove("is-changing");
    }, 380);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("aero-video");
  const overlay = document.getElementById("video-overlay");
  const replayBtn = document.getElementById("replay-btn");
  const muteBtn = document.getElementById("mute-btn");
  const iconMuted = document.getElementById("icon-muted");
  const iconUnmuted = document.getElementById("icon-unmuted");

  if (!video || !overlay || !replayBtn || !muteBtn) return;

  const hideReplay = () => {
    overlay.classList.add("hidden");
    replayBtn.classList.add("hidden");
  };

  const showReplay = () => {
    overlay.classList.remove("hidden");
    replayBtn.classList.remove("hidden");
  };

  const syncMuteButton = () => {
    muteBtn.setAttribute("aria-label", video.muted ? "Activar sonido" : "Silenciar video");
    iconMuted?.classList.toggle("hidden", !video.muted);
    iconUnmuted?.classList.toggle("hidden", video.muted);
  };

  const playVideo = () => {
    hideReplay();
    video.play().catch(showReplay);
  };

  video.pause();
  syncMuteButton();

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!video.ended && video.paused) {
          playVideo();
        }
        return;
      }

      if (!video.ended && !video.paused) {
        video.pause();
      }
    },
    { threshold: 0.45 }
  );

  observer.observe(video);

  video.addEventListener("ended", showReplay);

  replayBtn.addEventListener("click", () => {
    video.currentTime = 0;
    playVideo();
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    syncMuteButton();
  });
});
