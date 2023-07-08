import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
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
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase();
const databaseRef = dbRef(database, "products");
const productList = document.getElementById("productList");

let cart = [];//lưu trữ đơn hàng hiện tại để upload lên firebase
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


  const idElement = document.createElement( "p");
  idElement.textContent = "Mô tả " + id;
  productItem.appendChild(idElement);

  

  const priceElement = document.createElement("p");
  priceElement.textContent = "Giá: " + price;
  productItem.appendChild(priceElement);
}

function addToCart(productName, price) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProduct = cart.find(item => item.name === productName);
  
    if (existingProduct) {
      // Nếu đã tồn tại, tăng số lượng
      existingProduct.quantity += 1;
    } else {
      // Nếu chưa tồn tại, thêm sản phẩm vào giỏ hàng
      cart.push({ name: productName, price: price, quantity: 1 });
    }
  
    // Cập nhật giỏ hàng trên giao diện
    displayCart();
  }
  
  function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
  
    cartItemsElement.innerHTML = '<h3>Danh sách sản phẩm:</h3>';
  
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `<span>${item.name} - Giá: $${item.price} - Số lượng: ${item.quantity}</span>`;
      cartItemsElement.appendChild(cartItemElement);
    });
  
    const total = cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
    cartTotalElement.innerHTML = `<h3>Tổng giá trị đơn hàng: $${total}</h3>`;
  }
  
  function placeOrder() {
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
        // window.location.href = `shop.html?orderID=${docRef.id}`;
      })
      .catch(function (error) {
        console.error("Lỗi khi lưu đơn hàng vào Firestore: ", error);
      });
  }
  
  // Lấy danh sách tất cả các nút "Mua hàng" dựa trên lớp (class) "buy-item"
  const buyButtons = document.querySelectorAll('.buy-item');
  
  // Lặp qua từng nút và thêm sự kiện click
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.parentNode.querySelector('span:nth-child(1)').textContent;
      const price = parseInt(button.parentNode.querySelector('span:nth-child(2)').textContent.replace(/[^0-9]/g, ''));
      addToCart(productName, price);
    });
  });
  
  // Lấy nút "Đặt hàng" dựa trên lớp (class) "place-order"
  const placeOrderButton = document.querySelector('.place-order');
  
  // Thêm sự kiện click cho nút "Đặt hàng"
  placeOrderButton.addEventListener('click', () => {
    placeOrder();
  });
getProducts();
