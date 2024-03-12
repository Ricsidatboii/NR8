const navigationLinks = document.querySelectorAll('.navigation a');

navigationLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetSection = document.getElementById(this.getAttribute('href').slice(1));
    smoothScroll(targetSection);
  });
});

function smoothScroll(targetSection) {
  const targetY = targetSection.offsetTop;
  const currentY = window.pageYOffset;
  const distance = targetY - currentY;
  let start = null;

  function animate(time) {
    if (start === null) start = time;
    const timeElapsed = time - start;
    const easedY = currentY + distance * (timeElapsed / 1000) * (easeInOutQuad(timeElapsed, distance, 1000) - 1);
    window.scrollTo(0, easedY);
    if (timeElapsed < 1000) {
      requestAnimationFrame(animate);
    }
  }

  function easeInOutQuad(t, b, c) {
    t /= c / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animate);
}
