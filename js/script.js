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


    const idElement = document.createElement( "p");
    idElement.textContent = "Mô tả " + id;
    productItem.appendChild(idElement);

    

    const priceElement = document.createElement("p");
    priceElement.textContent = "Giá: " + price;
    productItem.appendChild(priceElement);

    // Lấy danh sách các nút "Mua hàng"
const productbutton = document.createElement("button");
productbutton.textContent = "Mua hàng " ;
productItem.appendChild(productbutton)
productItem.classList.add("buy-item");
    return productItem;
}

// Gọi hàm để lấy danh sách sản phẩm  
getProducts();

let openShopping = document.querySelector('#shopping-img');
let  closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');

openShopping.addEventListener('click', ()=>{
      var sidebar = document.querySelector('.cart');
      sidebar.classList.toggle('open');
      console.log(open);
})
closeShopping.addEventListener('click', ()=>{

  var sidebar =document.querySelector('.cart')
  sidebar.classList.toggle('open')
  console.log(open);
    
})




// Thêm sự kiện cho từng nút "Mua hàng"
buyButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

// Hàm xử lý khi bấm nút "Mua hàng"
function addToCart(event) {
  const product = event.target.parentElement;
  const name = product.querySelector('.name').textContent;
  const price = product.querySelector('.price').textContent;
  const cartItem = createCartItem(name, price);
  const listCard = document.querySelector('.listCard');
  listCard.appendChild(cartItem);
  updateTotal();
}   

function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

// Hàm tạo phần tử danh sách đơn hàng
function createCartItem(name, price) {
  const item = document.createElement('li');
  item.innerHTML = `
    <span class="cart-item-name">${name}</span>
    <span class="cart-item-price">${price}</span>
    <div class="cart-item-quantity">
      <button class="quantity-decrease">-</button>
      <span class="quantity-value">1</span>
      <button class="quantity-increase">+</button>
    </div>
    <button class="remove-button">Xóa</button>
  `;
  item.querySelector('.quantity-decrease').addEventListener('click', decreaseQuantity);
  item.querySelector('.quantity-increase').addEventListener('click', increaseQuantity);
  item.querySelector('.remove-button').addEventListener('click', removeFromCart);
  return item;
}

// Hàm xử lý giảm số lượng sản phẩm trong đơn hàng
function decreaseQuantity(event) {
  const quantityElement = event.target.parentElement.querySelector('.quantity-value');
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
  }
  updateTotal();
}

// Hàm xử lý tăng số lượng sản phẩm trong đơn hàng
function increaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector('.quantity-value');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateTotal();
}

// Hàm xử lý xóa sản phẩm khỏi đơn hàng
function removeFromCart(event) {
  const item = event.target.parentElement;
  item.remove();
  updateTotal();
}

// Hàm cập nhật tổng số tiền trong đơn hàng
function updateTotal() {
  const cartItems = document.querySelectorAll('.listCard li');
  let total = 0;
  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector('.cart-item-price').textContent);
    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    total += price * quantity;
  });
  document.querySelector('.total').textContent = total.toFixed(2);
}


var popupButton =document.querySelector('.popupButton')
popupButton.addEventListener('click',()=>{
  var popup = document.getElementById(popup)
  popup.style.display = "block";
  currentPopup = popup;
})

function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none";
}