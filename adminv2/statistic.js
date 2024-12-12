const orders = [
    { id: 1, customer: "Nguyễn Văn A", total: 1500000, status: "Đã thanh toán", details: "Mua sản phẩm A, B, C", date: "2023-12-01", address: "Quận 1" },
    { id: 2, customer: "Trần Thị B", total: 800000, status: "Chưa thanh toán", details: "Mua sản phẩm D", date: "2023-12-02", address: "Quận 3" },
    { id: 3, customer: "Lê Văn C", total: 2000000, status: "Đã thanh toán", details: "Mua sản phẩm X, Y", date: "2023-12-03", address: "Quận 2" },
    { id: 4, customer: "Phạm Văn D", total: 500000, status: "Đã hủy", details: "Mua sản phẩm Z", date: "2023-12-04", address: "Quận 5" },
    { id: 5, customer: "Nguyễn Thị E", total: 3000000, status: "Đã thanh toán", details: "Mua sản phẩm M, N, P", date: "2024-12-05", address: "Quận 4" },
    { id: 6, customer: "Nguyễn Văn A", total: 1500000, status: "Đã thanh toán", details: "Mua sản phẩm A, B, C", date: "2024-12-01", address: "Quận 1" },
    { id: 7, customer: "Trần Thị B", total: 800000, status: "Chưa thanh toán", details: "Mua sản phẩm D", date: "2024-12-02", address: "Quận 3" },
    { id: 8, customer: "Lê Văn C", total: 2000000, status: "Đã thanh toán", details: "Mua sản phẩm X, Y", date: "2024-12-03", address: "Quận 2" },
    { id: 9, customer: "Phạm Văn D", total: 500000, status: "Đã hủy", details: "Mua sản phẩm Z", date: "2024-12-04", address: "Quận 5" },
    { id: 10, customer: "Nguyễn Thị E", total: 3000000, status: "Đã thanh toán", details: "Mua sản phẩm M, N, P", date: "2024-12-05", address: "Quận 4" },
  ];
  
  function filterStatistics() {
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    // Lọc hóa đơn theo khoảng thời gian và trạng thái "Đã thanh toán"
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate && order.status === "Đã thanh toán";
    });

    // Thống kê mặt hàng
    const productStats = {};
    filteredOrders.forEach(order => {
        order.details.split(", ").forEach(product => {
            if (!productStats[product]) productStats[product] = { quantity: 0, total: 0 };
            productStats[product].quantity += 1;
            productStats[product].total += order.total;
        });
    });

    // Hiển thị thống kê mặt hàng
    const productTable = document.getElementById("product-stats");
    productTable.innerHTML = Object.entries(productStats).map(([product, stats]) => `
        <tr>
            <td>${product}</td>
            <td>${stats.quantity}</td>
            <td>${stats.total.toLocaleString()} VNĐ</td>
            <td><button class="view-button" onclick="viewProductOrders('${product}')">Xem Hóa Đơn</button></td>
        </tr>
    `).join("");

    // Thống kê khách hàng
    const customerStats = {};
    filteredOrders.forEach(order => {
        if (!customerStats[order.customer]) customerStats[order.customer] = { invoices: 0, revenue: 0 };
        customerStats[order.customer].invoices += 1;
        customerStats[order.customer].revenue += order.total;
    });

    // Hiển thị thống kê khách hàng
    const customerTable = document.getElementById("customer-stats");
    customerTable.innerHTML = Object.entries(customerStats)
        .sort(([, a], [, b]) => b.revenue - a.revenue) // Sắp xếp theo doanh thu
        .slice(0, 5) // Lấy top 5
        .map(([customer, stats]) => `
            <tr>
                <td>${customer}</td>
                <td>${stats.invoices}</td>
                <td>${stats.revenue.toLocaleString()} VNĐ</td>
                <td><button class="view-button" onclick="viewCustomerOrders('${customer}')">Xem Hóa Đơn</button></td>
            </tr>
        `).join("");
}

// Xem hóa đơn của mặt hàng
function viewProductOrders(product) {
    const filteredOrders = orders.filter(order => order.details.includes(product) && order.status === "Đã thanh toán");
    alert(`Hóa đơn liên quan đến sản phẩm: ${product}\n` + filteredOrders.map(o => `ID: ${o.id}, Khách hàng: ${o.customer}, Tổng tiền: ${o.total.toLocaleString()} VNĐ`).join("\n"));
}

// Xem hóa đơn của khách hàng
function viewCustomerOrders(customer) {
    const filteredOrders = orders.filter(order => order.customer === customer && order.status === "Đã thanh toán");
    alert(`Hóa đơn của khách hàng: ${customer}\n` + filteredOrders.map(o => `ID: ${o.id}, Chi tiết: ${o.details}, Tổng tiền: ${o.total.toLocaleString()} VNĐ`).join("\n"));
}
