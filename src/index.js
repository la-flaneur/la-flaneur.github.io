import { signUp, signIn, logOut } from "./auth.js"
import { createUserProfile, getUsers } from "./db.js"
import { auth } from "./firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase.js"

// get values from form
function getAuthFormValues() {
  const email = document.getElementById("email")?.value
  const password = document.getElementById("password")?.value
  const name = document.getElementById("name")?.value
  return { email, password, name }
}

// sign up
document.getElementById("signup")?.addEventListener("click", async () => {
  const { email, password, name } = getAuthFormValues()
  if (!email || !password || !name) return

  try {
    const userCred = await signUp(email, password)
    await createUserProfile(userCred.user.uid, name, email)
    document.getElementById("statusText").textContent = `✅ Signed up: ${userCred.user.email}`
  } catch (err) {
    document.getElementById("statusText").textContent = `❌ Error: ${err.message}`
    console.error("Sign up error:", err)
  }
})

// sign in
document.getElementById("signin")?.addEventListener("click", async () => {
  const { email, password } = getAuthFormValues()
  if (!email || !password) return

  try {
    const userCred = await signIn(email, password)
    document.getElementById("statusText").textContent = `✅ Signed in: ${userCred.user.email}`
  } catch (err) {
    document.getElementById("statusText").textContent = `❌ Error: ${err.message}`
    console.error("Sign in error:", err)
  }
})

// logout
document.getElementById("logout")?.addEventListener("click", async () => {
  try {
    await logOut()
    document.getElementById("statusText").textContent = "👋 Signed out"
  } catch (err) {
    document.getElementById("statusText").textContent = `❌ Error: ${err.message}`
  }
})

// test write to firestore
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await setDoc(doc(db, "testCollection", "testDoc"), { hello: "world" })
    console.log("✅ Firestore write succeeded!")
  } catch (err) {
    console.error("❌ Firestore write failed:", err)
  }
})

// auth state listener (optional)
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("authStatus")
  if (user) {
    status.textContent = `🔓 Logged in as ${user.email}`
  } else {
    status.textContent = "🔒 Not logged in"
  }
})

document.addEventListener("DOMContentLoaded", () => {
    const logoVideo = document.getElementById("logo-video");
    if (logoVideo) {
      logoVideo.play();

      logoVideo.addEventListener("mouseenter", () => {
        logoVideo.currentTime = 0;
        logoVideo.play();
      });

      logoVideo.addEventListener("ended", () => {
        logoVideo.pause();
      });
    }
  });