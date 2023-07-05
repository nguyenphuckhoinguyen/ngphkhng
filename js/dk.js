import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyDfbarULS7uhQcIDM-n4MOa8bLdKKnaaWs",
  authDomain: "spck-89a3d.firebaseapp.com",
  projectId: "spck-89a3d",
  storageBucket: "spck-89a3d.appspot.com",
  messagingSenderId: "1003387435841",
  appId: "1:1003387435841:web:85091216342c36a50bffc0",
  measurementId: "G-CHBGC03JCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const form = document.querySelector("#form");
console.log(form);
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const inputUsernameRegister = document.querySelector(".input-signup-username");
  const inputPasswordRegister = document.querySelector(".input-signup-password");
  const inputConfirmRegister = document.querySelector(".input-signup-confirm");
  const username = inputUsernameRegister.value;
  const password = inputPasswordRegister.value;
  const confirm = inputConfirmRegister.value;



  const auth = getAuth();
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      window.location.href="trang1.html"
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});
