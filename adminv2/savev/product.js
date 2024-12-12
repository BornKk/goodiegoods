// Lưu danh sách sản phẩm
let productList = [
    { id: 1, name: "Táo", price: "50,000 VNĐ", image: "../img/taohuuco.webp" },
    { id: 2, name: "Rau Xanh", price: "20,000 VNĐ", image: "../img/rau_ngot_ta_huu_co_-_300g.webp" },
    // Thêm dữ liệu mẫu ở đây... q
];

// Tìm sản phẩm theo ID
function findProductById(id) {
    return productList.find(product => product.id === id);
}

// Cập nhật bảng sản phẩm
function updateProductTable() {
    const tbody = document.querySelector(".management-table tbody");
    tbody.innerHTML = "";
    productList.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-image" style="height: 100px; width: 100px;"></td>
            <td>
                <button class="edit-button" onclick="openModal('edit', ${product.id})">Sửa</button>
                <button class="delete-button" onclick="confirmDeleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Xử lý mở modal thêm/sửa
function openModal(action, productId = null) {
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const submitButton = document.getElementById("submit-button");
    const productNameInput = document.getElementById("product-name");
    const productPriceInput = document.getElementById("product-price");
    const productImageInput = document.getElementById("product-image");

    modal.style.display = "block";

    if (action === "add") {
        modalTitle.innerText = "Thêm Sản Phẩm";
        productNameInput.value = "";
        productPriceInput.value = "";
        productImageInput.value = null;
        submitButton.onclick = function (e) {
            e.preventDefault();
            addProduct();
            closeModal();
        };
    } else if (action === "edit") {
        const product = findProductById(productId);
        if (!product) return;

        modalTitle.innerText = "Sửa Sản Phẩm";
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productImageInput.value = null;

        submitButton.onclick = function (e) {
            e.preventDefault();
            editProduct(productId);
            closeModal();
        };
    }
}

// Thêm sản phẩm mới
function addProduct() {
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productImage = document.getElementById("product-image").files[0];

    if (!productName || !productPrice || !productImage) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const newProduct = {
            id: productList.length + 1,
            name: productName,
            price: productPrice,
            image: e.target.result,
        };
        productList.push(newProduct);
        updateProductTable();
    };
    reader.readAsDataURL(productImage);
}

// Sửa sản phẩm
function editProduct(productId) {
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productImage = document.getElementById("product-image").files[0];
    const product = findProductById(productId);

    if (!productName || !productPrice) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    product.name = productName;
    product.price = productPrice;

    if (productImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            product.image = e.target.result;
            updateProductTable();
        };
        reader.readAsDataURL(productImage);
    } else {
        updateProductTable();
    }
}

// Xác nhận và xóa sản phẩm
function confirmDeleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        deleteProduct(productId);
    }
}

// Xóa sản phẩm
function deleteProduct(productId) {
    productList = productList.filter(product => product.id !== productId);
    updateProductTable();
}

// Đóng modal
function closeModal() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "none";
}

// Khởi tạo bảng khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    updateProductTable();
});
