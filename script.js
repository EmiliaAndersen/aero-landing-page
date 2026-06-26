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
