const orders = [
  { id: 1, customer: "Nguyễn Văn A", total: "1,500,000 VNĐ", status: "Đã thanh toán", details: "Mua sản phẩm A, B, C", date: "2023-12-01", address: "Quận 1" },
  { id: 2, customer: "Trần Thị B", total: "800,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm D", date: "2023-12-02", address: "Quận 3" },
  { id: 3, customer: "Lê Văn C", total: "2,000,000 VNĐ", status: "Đã giao thành công", details: "Mua sản phẩm X, Y", date: "2023-12-03", address: "Quận 2" },
  { id: 4, customer: "Phạm Văn D", total: "500,000 VNĐ", status: "Đã hủy", details: "Mua sản phẩm Z", date: "2023-12-04", address: "Quận 5" },
  { id: 5, customer: "Nguyễn Thị E", total: "3,000,000 VNĐ", status: "Đã xác nhận", details: "Mua sản phẩm M, N, P", date: "2023-12-05", address: "Quận 4" },
  { id: 6, customer: "Lê Thị F", total: "1,200,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm A, D", date: "2023-12-06", address: "Quận 2" },
  { id: 7, customer: "Trần Văn G", total: "900,000 VNĐ", status: "Đã thanh toán", details: "Mua sản phẩm C, E", date: "2023-12-07", address: "Quận 6" },
  { id: 8, customer: "Hoàng Văn H", total: "2,500,000 VNĐ", status: "Đã giao thành công", details: "Mua sản phẩm Y, Z, W", date: "2023-12-08", address: "Quận 3" },
  { id: 9, customer: "Phạm Thị I", total: "700,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm B, D", date: "2023-12-09", address: "Quận 1" },
  { id: 10, customer: "Nguyễn Văn J", total: "1,800,000 VNĐ", status: "Đã thanh toán", details: "Mua sản phẩm N, P, Q", date: "2023-12-10", address: "Quận 5" },
  { id: 11, customer: "Lê Văn K", total: "2,200,000 VNĐ", status: "Đã giao thành công", details: "Mua sản phẩm X, A, W", date: "2023-12-11", address: "Quận 4" },
  { id: 12, customer: "Trần Thị L", total: "600,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm C, F", date: "2023-12-12", address: "Quận 6" },
  { id: 13, customer: "Nguyễn Thị M", total: "1,400,000 VNĐ", status: "Đã xác nhận", details: "Mua sản phẩm B, Q", date: "2023-12-13", address: "Quận 2" },
  { id: 14, customer: "Lê Văn N", total: "1,100,000 VNĐ", status: "Đã hủy", details: "Mua sản phẩm D, P", date: "2023-12-14", address: "Quận 1" },
  { id: 15, customer: "Trần Văn O", total: "1,000,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm Z, Y", date: "2023-12-15", address: "Quận 3" },
  { id: 16, customer: "Nguyễn Thị P", total: "3,200,000 VNĐ", status: "Đã giao thành công", details: "Mua sản phẩm A, N, W, X", date: "2023-12-16", address: "Quận 5" },
  { id: 17, customer: "Phạm Văn Q", total: "2,000,000 VNĐ", status: "Đã thanh toán", details: "Mua sản phẩm F, Q, R", date: "2023-12-17", address: "Quận 4" },
  { id: 18, customer: "Hoàng Thị R", total: "900,000 VNĐ", status: "Chưa thanh toán", details: "Mua sản phẩm E, M", date: "2023-12-18", address: "Quận 6" },
  { id: 19, customer: "Nguyễn Văn S", total: "2,400,000 VNĐ", status: "Đã xác nhận", details: "Mua sản phẩm P, X, A, B", date: "2023-12-19", address: "Quận 1" },
  { id: 20, customer: "Lê Thị T", total: "1,300,000 VNĐ", status: "Đã giao thành công", details: "Mua sản phẩm W, D, Y", date: "2023-12-20", address: "Quận 3" },
];



// Lấy các phần tử DOM
const orderList = document.getElementById("order-list");
const modal = document.getElementById("order-detail-modal");
const modalContent = document.getElementById("order-detail-content");
const closeModalButton = document.getElementById("close-detail-modal");

// Hiển thị danh sách hóa đơn
function renderOrders() {
  orderList.innerHTML = "";
  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.total}</td>
      <td>${order.status}</td>
      <td>
        <button class="detail-button" data-id="${order.id}">Chi Tiết</button>
        <button class="print-button" data-id="${order.id}">In Hóa Đơn</button>
      </td>
    `;
    orderList.appendChild(row);
  });
  attachEventListeners();
}

// Thêm sự kiện cho nút Chi Tiết và In Hóa Đơn
function attachEventListeners() {
  document.querySelectorAll(".detail-button").forEach((button) => {
    button.addEventListener("click", () => {
      const orderId = Number(button.dataset.id);
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        modalContent.innerHTML = `
          <p><strong>ID:</strong> ${order.id}</p>
          <p><strong>Tên Khách Hàng:</strong> ${order.customer}</p>
          <p><strong>Tổng Tiền:</strong> ${order.total}</p>
          <p><strong>Trạng Thái:</strong> ${order.status}</p>
          <p><strong>Chi Tiết:</strong> ${order.details}</p>
        `;
        modal.style.display = "flex";
      }
    });
  });

  document.querySelectorAll(".print-button").forEach((button) => {
    button.addEventListener("click", () => {
      const orderId = Number(button.dataset.id);
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        const printContent = `
          <h1>Hóa Đơn</h1>
          <p><strong>ID:</strong> ${order.id}</p>
          <p><strong>Tên Khách Hàng:</strong> ${order.customer}</p>
          <p><strong>Tổng Tiền:</strong> ${order.total}</p>
          <p><strong>Trạng Thái:</strong> ${order.status}</p>
          <p><strong>Chi Tiết:</strong> ${order.details}</p>
        `;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }
    });
  });
}

// Đóng modal
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Hiển thị hóa đơn khi load trang
renderOrders();
// Cập nhật trạng thái đơn hàng
function updateOrderStatus(orderId, status) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    renderOrders();
  }
}
function renderOrders() {
  orderList.innerHTML = "";
  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.total}</td>
      <td>${order.status}</td>
      <td>
        <button class="detail-button" data-id="${order.id}">Chi Tiết</button>
        <button class="status-button" onclick="updateOrderStatus(${order.id}, 'Đã xác nhận')">Xác Nhận</button>
        <button class="status-button" onclick="updateOrderStatus(${order.id}, 'Đã giao thành công')">Giao Thành Công</button>
        <button class="status-button" onclick="updateOrderStatus(${order.id}, 'Đã hủy')">Hủy</button>
      </td>
    `;
    orderList.appendChild(row);
  });
  attachEventListeners();
}
function filterOrdersByStatus() {
  const status = document.getElementById("status-filter").value;
  const filteredOrders = orders.filter((order) =>
    status ? order.status === status : true
  );
  renderFilteredOrders(filteredOrders);
}

function sortOrdersByAddress() {
  const sortType = document.getElementById("address-sort").value;
  const sortedOrders = [...orders].sort((a, b) => {
    const addressA = a.address.toLowerCase(); // Cần thêm thuộc tính `address` trong dữ liệu mẫu
    const addressB = b.address.toLowerCase();
    if (sortType === "asc") return addressA.localeCompare(addressB);
    if (sortType === "desc") return addressB.localeCompare(addressA);
    return 0;
  });
  renderFilteredOrders(sortedOrders);
}
