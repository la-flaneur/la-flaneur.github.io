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

// Set up reCAPTCHA
const setUpRecaptcha = (containerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(containerId, {
    size: "invisible", // Invisible reCAPTCHA, can also use "normal" for visible
    callback: (response) => {
      console.log("reCAPTCHA solved:", response);
    },
  }, auth);
  return recaptchaVerifier;
};

// Send verification code to the phone number
const sendVerificationCode = (phoneNumber) => {
  const recaptchaVerifier = setUpRecaptcha("recaptcha-container");

  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      // Save the confirmation result to confirm the code later
      window.confirmationResult = confirmationResult;
      console.log("Code sent to:", phoneNumber);
    })
    .catch((error) => {
      console.error("Error during phone number sign-in:", error);
    });
};

// Verify the code entered by the user
const verifyCode = (code) => {
  const confirmationResult = window.confirmationResult;

  confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      // Handle authenticated user (e.g., store user data, navigate, etc.)
    })
    .catch((error) => {
      console.error("Error verifying code:", error);
    });
};

// Event listeners for phone number and verification code inputs
document.getElementById("send-code").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phone-number").value;
  sendVerificationCode(phoneNumber);
});

document.getElementById("verify-code").addEventListener("click", () => {
  const code = document.getElementById("verification-code").value;
  verifyCode(code);
});