import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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

const database = getDatabase();
const databaseRef = dbRef(database, "products");
const productList = document.getElementById("productList");

// Hàm lấy danh sách sản phẩm từ Firebase
function getProducts() {
    onValue(databaseRef, (snapshot) => {
        productList.innerHTML = ""; // Xóa danh sách sản phẩm cũ

        snapshot.forEach((childSnapshot) => {
            const productData = childSnapshot.val();
            const productItem = createProductItem(productData);
            productList.appendChild(productItem);
        });
    });
}

// Hàm tạo phần tử HTML cho một sản phẩm
function createProductItem(productData) {
    const { name, id, price, image } = productData;

    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = name;
    productItem.appendChild(imageElement);

    const nameElement = document.createElement("h3");
    nameElement.textContent = name;
    productItem.appendChild(nameElement);

    const idElement = document.createElement("p");
    idElement.textContent = "ID: " + id;
    productItem.appendChild(idElement);

    // Lấy danh sách các nút "Mua hàng"
const productbutton = document.createElement("button");
productbutton.textContent = "Mua hàng " ;
productItem.appendChild(productbutton)
productItem.classList.add("buy-item");

    const priceElement = document.createElement("p");
    priceElement.textContent = "Price: " + price;
    productItem.appendChild(priceElement);

    return productItem;
}

// Gọi hàm để lấy danh sách sản phẩm
getProducts();