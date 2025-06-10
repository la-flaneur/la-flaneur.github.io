import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.js' // <-- fix path

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}
export function logOut() {
  return signOut(auth)
}

export { auth, onAuthStateChanged }