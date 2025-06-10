// db.js
import { db } from "./firebase"
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"

export async function createUserProfile(uid, name, email) {
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    createdAt: new Date().toISOString()
  })
}

export async function getUser(uid) {
  const ref = doc(db, "users", uid)
  const snapshot = await getDoc(ref)
  return snapshot.exists() ? snapshot.data() : null
}

export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"))
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}