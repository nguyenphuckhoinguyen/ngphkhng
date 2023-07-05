import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";
import { getDatabase, ref as dbRef, push, set} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfbarULS7uhQcIDM-n4MOa8bLdKKnaaWs",
    authDomain: "spck-89a3d.firebaseapp.com",
    projectId: "spck-89a3d",
    storageBucket: "spck-89a3d.appspot.com",
    messagingSenderId: "1003387435841",
    appId: "1:1003387435841:web:85091216342c36a50bffc0",
    measurementId: "G-CHBGC03JCW"
  };
initializeApp(firebaseConfig);

const storage = getStorage();
const database = getDatabase();

const storageRef = ref(storage);
const databaseRef = dbRef(database, "products");

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", handleProductUpload);

function handleProductUpload(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productId = document.getElementById("productId").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").files[0];

    const imageRef = ref(storageRef, "images/" + productImage.name);
    const newProductRef = push(databaseRef);
    const productKey = newProductRef.key;
    const productRef = dbRef(database, `products/${productKey}`);



    uploadBytes(imageRef, productImage)
        .then(() => getDownloadURL(imageRef))
        .then((imageUrl) => {
        const productData = {
            name: productName,
            id: productId,
            price: productPrice,
            image: imageUrl
        };
        return set(productRef, productData);
        })
        .then(() => {
            alert("Product uploaded successfully!");
            productForm.reset();
        })
        .catch((error) => {
            console.error("Error uploading product:", error);
        });
}