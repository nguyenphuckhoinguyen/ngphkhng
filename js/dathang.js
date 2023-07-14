import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getDatabase, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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
const db = getFirestore(app);
const database = getDatabase();
const databaseRef = dbRef(database, "products");
const productList = document.getElementById("productList");

// Trong trang payment.html
const cart=  JSON.parse(localStorage.getItem('cart'));
// Xóa dữ liệu từ localStorage sau khi sử dụng (nếu cần)
// localStorage.removeItem('cart');
console.log(cart);
console.log("Dữ liệu giỏ hàng:", cart);//lưu trữ đơn hàng hiện tại để upload lên firebase
function displayCart() {
  const cartItemsElement = document.getElementById('cart-items')
  const cartTotalElement = document.getElementById('cart-total')
  const item = document.createElement('li')
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('cart-item')
    cartItemElement.innerHTML = `<span><img width="50px" src=${item.image} alt=""> </span><span> ${item.name} - Giá: $${item.price} - Số lượng: ${item.quantity}  
                                <button class="remove-button" data-id="${index}">Xóa</button></span>`
    console.log(item.quantity)
    cartItemsElement.appendChild(cartItemElement)
  })}
displayCart();

const placeholder = document.querySelector('.place-order')
placeholder.addEventListener('click' , ()=> {
  placeOrder();
});
function placeOrder() {
  console.log('dfaeg');
  // Lưu thông tin đơn hàng vào Firestore
  addDoc(collection(db, "orders"), {
    orderItems: cart,
    timestamp: Timestamp.now()
  })
    .then(function (docRef) {
      // Xóa giỏ hàng sau khi đặt hàng
      cart = [];

      // Cập nhật giỏ hàng trên giao diện
      displayCart();

      // Chuyển hướng đến trang mới (shop.html) với ID của đơn hàng
      window.location.href = `shop.html?orderID=${docRef.id}`;
    })
    .catch(function (error) {
      console.error("Lỗi khi lưu đơn hàng vào Firestore: ", error);
    });
    
}
