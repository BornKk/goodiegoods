// Dữ liệu mẫu sản phẩm ban đầu
let products = [
  { id: 1, name: "Táo", price: "50,000 VNĐ", image: "" },
  { id: 2, name: "Rau Xanh", price: "20,000 VNĐ", image: "" }
];

// DOM Elements
const tableBody = document.querySelector(".management-table tbody");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal h2");
const nameInput = document.querySelector("#productName");
const priceInput = document.querySelector("#productPrice");
const imageInput = document.querySelector("#productImage");
const modalSaveButton = document.querySelector("#saveButton");
const modalCloseButton = document.querySelector("#closeButton");
const addButton = document.querySelector(".add-button");

let editingProductId = null; // Để xác định trạng thái chỉnh sửa hoặc thêm mới

// Hiển thị danh sách sản phẩm trong bảng
function renderProducts() {
  tableBody.innerHTML = ""; // Xóa dữ liệu cũ
  products.forEach(product => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
              <button class="edit-button" data-id="${product.id}">Sửa</button>
              <button class="delete-button" data-id="${product.id}">Xóa</button>
          </td>
      `;
      tableBody.appendChild(row);
  });

  // Gắn sự kiện cho nút Sửa và Xóa sau khi render
  attachEventListeners();
}

// Mở modal
function openModal(title, product = null) {
  modalTitle.textContent = title;
  nameInput.value = product ? product.name : "";
  priceInput.value = product ? product.price : "";
  imageInput.value = ""; // Reset input ảnh
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
}

// Đóng modal
function closeModal() {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
  editingProductId = null; // Reset trạng thái chỉnh sửa
}

// Xử lý khi nhấn nút Thêm sản phẩm
addButton.addEventListener("click", () => {
  editingProductId = null; // Không có sản phẩm đang chỉnh sửa
  openModal("Thêm Sản Phẩm");
});

// Lưu sản phẩm
modalSaveButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const image = imageInput.value.trim(); // Ảnh là chuỗi URL

  if (!name || !price) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
  }

  if (editingProductId) {
      // Chỉnh sửa sản phẩm
      const product = products.find(p => p.id === editingProductId);
      product.name = name;
      product.price = price;
      product.image = image;
      alert("Cập nhật sản phẩm thành công!");
  } else {
      // Thêm sản phẩm mới
      const newProduct = {
          id: products.length ? products[products.length - 1].id + 1 : 1,
          name,
          price,
          image
      };
      products.push(newProduct);
      alert("Thêm sản phẩm thành công!");
  }

  closeModal();
  renderProducts();
});

// Đóng modal khi nhấn nút Hủy
modalCloseButton.addEventListener("click", closeModal);

// Gắn sự kiện cho các nút Sửa và Xóa
function attachEventListeners() {
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  // Nút Sửa
  editButtons.forEach(button => {
      button.addEventListener("click", () => {
          const id = parseInt(button.getAttribute("data-id"));
          const product = products.find(p => p.id === id);
          editingProductId = id; // Đặt trạng thái chỉnh sửa
          openModal("Chỉnh Sửa Sản Phẩm", product);
      });
  });

  // Nút Xóa
  deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
          const id = parseInt(button.getAttribute("data-id"));
          if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
              products = products.filter(p => p.id !== id);
              alert("Xóa sản phẩm thành công!");
              renderProducts();
          }
      });
  });
}

// Khởi tạo
renderProducts();
