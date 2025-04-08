function scrollToPosition(position) {
    event.preventDefault(); // Prevent default anchor behavior
    if (position === 0) {
        window.scrollBy({
            top: position - window.pageYOffset,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }
}

function goHome(position) {
    window.location.href = "index.html";
    scrollToPosition(position);
}

const videos = document.querySelectorAll('.video');

videos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});