import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
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

const orderListElement = document.getElementById('order-list');

// Lấy danh sách đơn hàng từ Firestore
async function getOrderList() {
  orderListElement.innerHTML = '';

  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      const orderItemElement = createOrderItemElement(order, doc.id);
      orderListElement.appendChild(orderItemElement);
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
  }
}

// Tạo phần tử HTML cho một đơn hàng
function createOrderItemElement(order, orderId) {
  const orderItemElement = document.createElement('li');
  orderItemElement.innerHTML = `
    <span>ID đơn hàng: ${orderId}</span>
    <span>Ngày đặt hàng: ${order.timestamp.toDate().toLocaleString()}</span>
    <ul>
      ${order.orderItems.map(item => `<li>${item.name} - Giá: $${item.price} - Số lượng: ${item.quantity}</li>`).join('')}
    </ul>
    <button onclick="deleteOrder('${orderId}')">Xóa đơn hàng</button>
  `;
  return orderItemElement;
}

// Xóa một đơn hàng
async function deleteOrder(orderId) {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    getOrderList(); // Cập nhật lại danh sách đơn hàng sau khi xóa
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
  }
}

// Gọi hàm getOrderList để hiển thị danh sách đơn hàng khi trang được tải
getOrderList();