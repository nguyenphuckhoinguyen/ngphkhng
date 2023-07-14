import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { addDoc, collection,getFirestore  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"; 
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfbarULS7uhQcIDM-n4MOa8bLdKKnaaWs",
  authDomain: "spck-89a3d.firebaseapp.com",
  databaseURL: "https://spck-89a3d-default-rtdb.firebaseio.com",
  projectId: "spck-89a3d",
  storageBucket: "spck-89a3d.appspot.com",
  messagingSenderId: "1003387435841",
  appId: "1:1003387435841:web:85091216342c36a50bffc0",
  measurementId: "G-CHBGC03JCW"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

const form = document.getElementById("form")


form.addEventListener("submit", async function(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const pass = document.getElementById("pass").value
  if(email=="admin@gmail.com" && pass=="admin123"){
window.location.href="admin.html"}
  else{
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in 
      window.location.href="trang1.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('sai email hoặc password')
      
    });
  }})

  
