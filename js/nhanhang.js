import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfA1wGxEk-8j9_gAsuvhY1ZjLEaWLcEtQ",
    authDomain: "week10-7ab4b.firebaseapp.com",
    databaseURL: "https://week10-7ab4b-default-rtdb.firebaseio.com",
    projectId: "week10-7ab4b",
    storageBucket: "week10-7ab4b.appspot.com",
    messagingSenderId: "340713155497",
    appId: "1:340713155497:web:5f91b7954ed89acb3132b8",
    measurementId: "G-NEEZPLRZHV"
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