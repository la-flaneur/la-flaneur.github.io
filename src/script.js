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

import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

// adds a name + data if it doesn’t already exist
export async function addNameIfNotExists(name, data) {
  const docRef = doc(db, "names", name)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log("name already exists")
  } else {
    await setDoc(docRef, data)
    console.log("added new name:", name)
  }
}
