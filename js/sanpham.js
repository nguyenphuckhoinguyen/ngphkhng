import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
import {
  getDatabase,
  ref as dbRef,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDfbarULS7uhQcIDM-n4MOa8bLdKKnaaWs',
  authDomain: 'spck-89a3d.firebaseapp.com',
  projectId: 'spck-89a3d',
  storageBucket: 'spck-89a3d.appspot.com',
  messagingSenderId: '1003387435841',
  appId: '1:1003387435841:web:85091216342c36a50bffc0',
  measurementId: 'G-CHBGC03JCW',
}

initializeApp(firebaseConfig)

const database = getDatabase()
const databaseRef = dbRef(database, 'products')
const productList = document.getElementById('productList')

// Hàm lấy danh sách sản phẩm từ Firebase
function getProducts() {
  onValue(databaseRef, (snapshot) => {
    productList.innerHTML = '' // Xóa danh sách sản phẩm cũ
    snapshot.forEach((childSnapshot) => {
      const productData = childSnapshot.val()
      const productItem = createProductItem(productData)
      productList.appendChild(productItem)
    })
  })
}

// Hàm tạo phần tử HTML cho một sản phẩm

function createProductItem(productData) {
  const { name, id, price, image } = productData

  const productItem = document.createElement('div')
  productItem.classList.add('product-item')

  const imageElement = document.createElement('img')
  imageElement.src = image
  imageElement.alt = name
  productItem.appendChild(imageElement)

  const nameElement = document.createElement('h3')
  nameElement.textContent = name
  productItem.appendChild(nameElement)

  const idElement = document.createElement('p')
  idElement.textContent = 'Mô tả ' + id
  productItem.appendChild(idElement)

  const priceElement = document.createElement('p')
  priceElement.textContent = 'Giá: ' + price
  productItem.appendChild(priceElement)

  // Lấy danh sách các nút "Mua hàng"
  const productbutton = document.createElement('button')
  productbutton.textContent = 'Mua hàng '
  productItem.appendChild(productbutton)
  productItem.classList.add('buy-item')
  return productItem
}
// var numberElement=document.getElementById('increaseNumber');
// var number =0;

// Gọi hàm để lấy danh sách sản phẩm
getProducts()

let openShopping = document.querySelector('#shopping-img')
let closeShopping = document.querySelector('.closeShopping')
// let body = document.querySelector('body');

openShopping.addEventListener('click', () => {
  var sidebar = document.querySelector('.cart')
  sidebar.classList.toggle('open') // ktra cai dlieu do co hay chua, neu co r thi no xoa chua co thi them
  console.log(open)
})
closeShopping.addEventListener('click', () => {
  var sidebar = document.querySelector('.cart')
  sidebar.classList.remove('open')
  console.log(open)
})

const removebut = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Kiểm tra nếu các phần tử có class quantiny đã được tạo hoàn tất
      const removes = document.querySelectorAll('.remove-button')
      if (removes.length > 0) {
        // Hủy bỏ việc theo dõi
        removebut.disconnect()

        // Gọi hàm khi các phần tử đã được tạo hoàn tất
        removebutton()
        break
      }
    }
  }
})

// Bắt đầu theo dõi thay đổi trong DOM
removebut.observe(document.body, { childList: true, subtree: true })
function removebutton() {
  const removeButtons = document.querySelectorAll('.remove-button')
  console.log(removeButtons)

  // Lặp qua từng nút và thêm sự kiện click
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Lấy thông tin sản phẩm từ các phần tử con của n
      const index = button.getAttribute('data-id')
      cart.splice(index, 1)
      displayCart()
      removebutton()
    })
  })
}

function RemoveToCart(productName, price) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = cart.find((item) => item.name === productName)

  if (existingProduct) {
    // Nếu đã tồn tại, tăng số lượng
    existingProduct.quantity -= 1
  } else {
    // Nếu chưa tồn tại, thêm sản phẩm vào giỏ hàng
    cart.pop({ name: productName, price: price, quantity: 1 })
  }

  // Cập nhật giỏ hàng trên giao diện
  displayCart()
}

// Hàm chạy khi các phần tử đã được tạo hoàn tất
function onElementsCreated() {
  const buyButtons = document.querySelectorAll('.buy-item')
  console.log(buyButtons)

  // Lặp qua từng nút và thêm sự kiện click
  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Lấy thông tin sản phẩm từ các phần tử con của nút
      const image =button.querySelector('img').getAttribute("src")
      const productItem = button.querySelector('h3').textContent
      const description = button.querySelector('p').textContent
      const priceText = button.querySelector('p').textContent

      const price = parseInt(priceText.replace(/[^0-9]/g, ''))

      // Thực hiện các hành động khác với thông tin sản phẩm
      console.log('Sản phẩm:', productItem)
      console.log('Mô tả:', description)
      console.log('Giá:', price)

      // Gọi hàm addToCart với thông tin sản phẩm
      addToCart(productItem, price,image)
    })
  })
}

// Tạo một observer để theo dõi thay đổi trong DOM
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Kiểm tra nếu các phần tử có class "buy-item" đã được tạo hoàn tất
      const buyItems = document.querySelectorAll('.buy-item')
      if (buyItems.length > 0) {
        // Hủy bỏ việc theo dõi
        observer.disconnect()

        // Gọi hàm khi các phần tử đã được tạo hoàn tất
        onElementsCreated()
        break
      }
    }
  }
})

// Bắt đầu theo dõi thay đổi trong DOM
observer.observe(document.body, { childList: true, subtree: true })
let cart = []
function addToCart(productName, price,image) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = cart.find((item) => item.name === productName)

  if (existingProduct) {
    // Nếu đã tồn tại, tăng số lượng
    existingProduct.quantity += 1
  } else {
    // Nếu chưa tồn tại, thêm sản phẩm vào giỏ hàng
    cart.push({
      image:image,
      name: productName,
      price: price,
      quantity: 1,
    })
  }

  const quantity = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)
  document.getElementsByClassName('quantity')[0].innerHTML = quantity

  // Cập nhật giỏ hàng trên giao diện
  displayCart()
  removebutton()

}
function displayCart() {
  const cartItemsElement = document.getElementById('cart-items')
  const cartTotalElement = document.getElementById('cart-total')
  const item = document.createElement('li')

  cartItemsElement.innerHTML = ``
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('cart-item')
    cartItemElement.innerHTML = ` <span><img width="50px" src=${item.image} alt=""></span>
                                  <span>  ${item.name}<span></span> - Giá: $${item.price} - Số lượng: ${item.quantity}  
                                <button class="remove-button" data-id="${index}">Xóa</button></span>`
    console.log(item.quantity)
    cartItemsElement.appendChild(cartItemElement)
  })
  const total = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  )
  cartTotalElement.innerHTML = `<a  id="linkdt"> Tổng : $${total}</a>`
  let dathang = document.getElementById('linkdt')
  console.log(dathang)
dathang.addEventListener('click', ()=>{
  console.log(dathang)
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'dathang.html';
});
}

