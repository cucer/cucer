const splashScreen = document.getElementById('splashScreen');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

const hideSplash = () => splashScreen?.classList.add('hide');

window.addEventListener('load', () => {
  // keep splash visible briefly so the animation can be noticed
  setTimeout(hideSplash, 1600);
});

// Always hide splash after a maximum wait in case the load event never fires
setTimeout(hideSplash, 4000);
