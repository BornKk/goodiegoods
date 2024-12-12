// Lấy thông tin đơn hàng từ localStorage và hiển thị
document.addEventListener('DOMContentLoaded', function () {
  const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));
  const orderSummaryList = document.getElementById('order-summary-list');

  if (!orderInfo) {
      alert('Không tìm thấy thông tin đơn hàng!');
      window.location.href = 'index.html';
      return;
  }

  // Hiển thị mã đơn hàng
  document.getElementById('order-id').textContent = orderInfo.orderId;

  // Ví dụ: thêm sản phẩm đã mua vào danh sách
  const items = [
      { name: 'Táo Organic', quantity: 2, price: '100.000đ' },
      { name: 'Rau Xanh Organic', quantity: 1, price: '50.000đ' },
      { name: 'Ngũ Cốc Hữu Cơ', quantity: 3, price: '300.000đ' },
  ];

  items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <span>${item.price}</span>
      `;
      orderSummaryList.appendChild(li);
  });

  // Sau khi hiển thị, xóa dữ liệu khỏi localStorage
  localStorage.removeItem('orderInfo');
});
