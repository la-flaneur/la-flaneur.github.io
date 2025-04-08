// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
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

const auth = getAuth(app);

// Set up reCAPTCHA verifier
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'invisible', // Or 'normal' if you want the reCAPTCHA to show visibly
  callback: (response) => {
    // reCAPTCHA verification callback
    console.log("reCAPTCHA verified:", response);
  }
}, auth);

// This function will handle phone number sign-in
function signInWithPhone() {
  const phoneNumber = document.getElementById('phoneNumber').value; // Get phone number from input
  const appVerifier = recaptchaVerifier;  // Firebase reCAPTCHA verifier

  if (phoneNumber) {
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // The user will receive a verification code via SMS
        window.confirmationResult = confirmationResult; // Save the confirmation result for later use
        console.log("SMS sent to:", phoneNumber);
        // You can then prompt the user to enter the verification code
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  } else {
    console.error("Phone number is empty or invalid");
  }
}

// After receiving the verification code, handle verification like this
function verifyCode() {
  const code = document.getElementById('verificationCode').value; // Get verification code input
  confirmationResult.confirm(code)  // Use the saved confirmationResult
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error verifying code:", error);
    });
}