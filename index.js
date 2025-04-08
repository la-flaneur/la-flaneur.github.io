// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-zfjbqrXppC8injtYcQAT_yaCs0LEAc0",
  authDomain: "bookingwithmae-0.firebaseapp.com",
  projectId: "bookingwithmae-0",
  storageBucket: "bookingwithmae-0.firebasestorage.app",
  messagingSenderId: "1083066284303",
  appId: "1:1083066284303:web:5e46b477b6b838c117667a",
  measurementId: "G-FQ9WZ5NVYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
db.collection('users').getDocs();
const todosCol = collection(db, 'users');
const snapshot = await getDocs(todosCol);
// Initialize Firebase Authentication and get a reference to the service
onAuthStateChanged (auth, user => {
    if(user != null) {
    console.log('logged in!');
    } else {
    console.log('No user');
    }
    });