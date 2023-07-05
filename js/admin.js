import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";
import { getDatabase, ref as dbRef, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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
const productsRef = dbRef(database, "products");

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const editProductForm = document.getElementById("editProductForm");
const editProductName = document.getElementById("editProductName");
const editProductId = document.getElementById("editProductId");
const editProductPrice = document.getElementById("editProductPrice");
const editProductImage = document.getElementById("editProductImage");
const editProductSubmit = document.getElementById("editProductSubmit");
const editProductCancel = document.getElementById("editProductCancel");

let editingProductKey = null;

// Xử lý sự kiện submit của form
productForm.addEventListener("submit", handleProductUpload);

// Xử lý sự kiện submit của form chỉnh sửa sản phẩm
editProductForm.addEventListener("submit", handleProductUpdate);

// Xử lý sự kiện click nút Cancel trong form chỉnh sửa sản phẩm
editProductCancel.addEventListener("click", cancelProductEdit);

// Hàm xử lý sự kiện submit của form
function handleProductUpload(event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const productId = document.getElementById("productId").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").files[0];

  const imageRef = ref(storageRef, "images/" + productImage.name);
  const productRef = push(productsRef);

  // Upload hình ảnh sản phẩm
  uploadBytes(imageRef, productImage)
    .then(() => getDownloadURL(imageRef))
    .then((imageUrl) => {
      const productData = {
        name: productName,
        id: productId,
        price: productPrice,
        image: imageUrl
      };

      // Lưu thông tin sản phẩm vào database
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

// Hàm xử lý sự kiện submit của form chỉnh sửa sản phẩm
function handleProductUpdate(event) {
  event.preventDefault();

  const updatedProductName = editProductName.value;
  const updatedProductId = editProductId.value;
  const updatedProductPrice = editProductPrice.value;
  const updatedProductImage = editProductImage.files[0];

  if (editingProductKey) {
    const productRef = dbRef(database, `products/${editingProductKey}`);

    if (updatedProductImage) {
      const imageRef = ref(storageRef, "images/" + updatedProductImage.name);

      uploadBytes(imageRef, updatedProductImage)
        .then(() => getDownloadURL(imageRef))
        .then((imageUrl) => {
          const updatedProductData = {
            name: updatedProductName,
            id: updatedProductId,
            price: updatedProductPrice,
            image: imageUrl
          };

          return set(productRef, updatedProductData);
        })
        .then(() => {
          alert("Product updated successfully!");
          cancelProductEdit();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      const updatedProductData = {
        name: updatedProductName,
        id: updatedProductId,
        price: updatedProductPrice
      };

      set(productRef, updatedProductData)
        .then(() => {
          alert("Product updated successfully!");
          cancelProductEdit();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  }
}

// Hàm hiển thị form chỉnh sửa sản phẩm
function showProductEditForm(productKey, productData) {
  editProductName.value = productData.name;
  editProductId.value = productData.id;
  editProductPrice.value = productData.price;
  editProductImage.value = null;

  editingProductKey = productKey;
  editProductForm.classList.add("show");
}

// Hàm hủy bỏ form chỉnh sửa sản phẩm
function cancelProductEdit() {
  editProductName.value = "";
  editProductId.value = "";
  editProductPrice.value = "";
  editProductImage.value = null;

  editingProductKey = null;
  editProductForm.classList.remove("show");
}

// Hiển thị danh sách sản phẩm
onValue(productsRef, (snapshot) => {
  productList.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại

  snapshot.forEach((childSnapshot) => {
    const productKey = childSnapshot.key;
    const productData = childSnapshot.val();

    // Tạo phần tử cho mỗi sản phẩm
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Hiển thị thông tin sản phẩm
    const productImage = document.createElement("img");
    productImage.src = productData.image;
    productItem.appendChild(productImage);

    const productName = document.createElement("h3");
    productName.textContent = productData.name;
    productItem.appendChild(productName);

    const productId = document.createElement("p");
    productId.textContent = "ID: " + productData.id;
    productItem.appendChild(productId);

    const productPrice = document.createElement("p");
    productPrice.textContent = "Price: $" + productData.price;
    productItem.appendChild(productPrice);

    // Tạo nút Edit sản phẩm
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      showProductEditForm(productKey, productData);
    });
    productItem.appendChild(editButton);

    // Tạo nút Xóa sản phẩm
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteProduct(productKey);
    });
    productItem.appendChild(deleteButton);

    // Thêm sản phẩm vào danh sách
    productList.appendChild(productItem);
  });
});

// Hàm xóa sản phẩm
function deleteProduct(productKey) {
  const productRef = dbRef(database, `products/${productKey}`);

  // Xóa sản phẩm khỏi database
  remove(productRef)
    .then(() => {
      alert("Product deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
}