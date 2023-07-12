import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { addDoc, collection,getFirestore  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"; 
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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


form.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Đăng ký thành công
      const user = userCredential.user;
      console.log(user);
      window.location.href="dn.html"
      // Redirect hoặc thực hiện các hành động khác sau khi đăng ký
    })
    .catch((error) => {
      // Xử lý lỗi đăng ký
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}); 
