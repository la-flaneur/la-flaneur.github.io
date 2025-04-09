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
auth.languageCode = 'it'; // Set the language code for the reCAPTCHA verifier
// Set up reCAPTCHA verifier
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      const code = getCodeFromUserInput();
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  console.log("Error signing in: ", error);
});
    }).catch((error) => {
      // Error; SMS not sent
      window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
    });