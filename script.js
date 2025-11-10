const overlay = document.getElementById('loadingOverlay');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  setTimeout(() => overlay.classList.add('hide'), 1400);
});
