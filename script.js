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