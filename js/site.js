// Click-to-load Vimeo: shows a thumbnail until tapped, so pages stay fast on phones.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".vid button");
  if (!btn) return;
  const box = btn.closest(".vid");
  const f = document.createElement("iframe");
  f.src = `https://player.vimeo.com/video/${box.dataset.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
  f.title = box.dataset.title || "Video";
  f.allow = "autoplay; fullscreen; picture-in-picture";
  f.allowFullscreen = true;
  box.replaceChildren(f);
});

// Phone menu: the three-line button opens and closes the list of pages.
const head = document.querySelector(".site-head");
const menuBtn = document.querySelector(".menu-btn");
function setMenu(open) {
  head.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
if (menuBtn) {
  menuBtn.addEventListener("click", () => setMenu(!head.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && head.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
  document.addEventListener("click", (e) => { if (head.classList.contains("open") && !head.contains(e.target)) setMenu(false); });
}

// Hide the sticky WhatsApp button while another WhatsApp button is on screen.
const bar = document.querySelector(".join-bar");
const others = document.querySelectorAll("main .btn.wa");
if (bar && others.length && "IntersectionObserver" in window) {
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
    bar.classList.toggle("hide", seen.size > 0);
  });
  others.forEach((b) => io.observe(b));
}
