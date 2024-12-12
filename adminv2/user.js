// Mảng lưu trữ người dùng
let users = [
    { id: 1, name: "Nguyễn Văn A", email: "vana@example.com", status: "Hoạt động" },
    { id: 2, name: "Trần Thị B", email: "thib@example.com", status: "Không hoạt động" },
    { id: 3, name: "Phạm Văn C", email: "vanc@example.com", status: "Hoạt động" },
    { id: 4, name: "Lê Thị D", email: "thid@example.com", status: "Không hoạt động" },
    { id: 5, name: "Hoàng Văn E", email: "vane@example.com", status: "Hoạt động" },
    { id: 6, name: "Nguyễn Thị F", email: "thif@example.com", status: "Không hoạt động" },
    { id: 7, name: "Phạm Thị G", email: "thig@example.com", status: "Hoạt động" },
    { id: 8, name: "Trần Văn H", email: "vanh@example.com", status: "Không hoạt động" },
    { id: 9, name: "Nguyễn Văn I", email: "vani@example.com", status: "Hoạt động" },
    { id: 10, name: "Lê Văn J", email: "vanj@example.com", status: "Hoạt động" },
    { id: 11, name: "Trần Thị K", email: "thik@example.com", status: "Không hoạt động" },
    { id: 12, name: "Hoàng Thị L", email: "thil@example.com", status: "Hoạt động" },
    { id: 13, name: "Nguyễn Thị M", email: "thim@example.com", status: "Không hoạt động" },
    { id: 14, name: "Phạm Văn N", email: "vann@example.com", status: "Hoạt động" },
    { id: 15, name: "Lê Thị O", email: "thio@example.com", status: "Không hoạt động" },
    { id: 16, name: "Trần Văn P", email: "vanp@example.com", status: "Hoạt động" },
    { id: 17, name: "Nguyễn Thị Q", email: "thiq@example.com", status: "Không hoạt động" },
    { id: 18, name: "Phạm Thị R", email: "thir@example.com", status: "Hoạt động" },
    { id: 19, name: "Hoàng Văn S", email: "vans@example.com", status: "Không hoạt động" },
    { id: 20, name: "Lê Thị T", email: "thit@example.com", status: "Hoạt động" },
    { id: 21, name: "Trần Văn U", email: "vanu@example.com", status: "Không hoạt động" },
    { id: 22, name: "Nguyễn Thị V", email: "thiv@example.com", status: "Hoạt động" },
    { id: 23, name: "Phạm Văn W", email: "vanw@example.com", status: "Không hoạt động" },
];

function renderTable() {
    const tableBody = document.getElementById("userTable");
    tableBody.innerHTML = users
        .map(
            (user) => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>
                    <button class="edit-button" onclick="editUser(${user.id})">Sửa</button>
                    <button class="delete-button" onclick="deleteUser(${user.id})">Xóa</button>
                    <button class="status-button" onclick="toggleUserStatus(${user.id})">
                        ${user.status === "Hoạt động" ? "Khóa" : "Mở Khóa"}
                    </button>
                </td>
            </tr>
        `
        )
        .join("");
}

// Khóa/Mở khóa người dùng
function toggleUserStatus(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        user.status = user.status === "Hoạt động" ? "Không hoạt động" : "Hoạt động";
    }
    renderTable();
}

// Hiển thị modal
function openModal(edit = false, userId = null) {
    const modal = document.getElementById("userModal");
    modal.style.display = "flex";
    if (edit) {
        const user = users.find((u) => u.id === userId);
        document.getElementById("modalTitle").textContent = "Sửa Người Dùng";
        document.getElementById("userId").value = user.id;
        document.getElementById("userName").value = user.name;
        document.getElementById("userEmail").value = user.email;
        document.getElementById("userStatus").value = user.status;
    } else {
        document.getElementById("modalTitle").textContent = "Thêm Người Dùng";
        document.getElementById("userForm").reset();
    }
}


// Đóng modal
function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Lưu người dùng
function saveUser() {
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const status = document.getElementById('userStatus').value;

    if (id) {
        // Cập nhật người dùng
        const user = users.find((u) => u.id == id);
        user.name = name;
        user.email = email;
        user.status = status;
    } else {
        // Thêm mới
        const newId = users.length ? users[users.length - 1].id + 1 : 1;
        users.push({ id: newId, name, email, status });
    }

    renderTable();
    closeModal();
}

// Xóa người dùng
function deleteUser(id) {
    users = users.filter((u) => u.id !== id);
    renderTable();
}

// Chỉnh sửa người dùng
function editUser(id) {
    openModal(true, id);
}

// Hiển thị danh sách người dùng
function renderTable() {
    const tableBody = document.getElementById('userTable');
    tableBody.innerHTML = users
        .map(
            (user) => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>
                    <button class="edit-button" onclick="editUser(${user.id})">Sửa</button>
                    <button class="delete-button" onclick="deleteUser(${user.id})">Xóa</button>
                </td>
            </tr>
        `
        )
        .join('');
}

// Nút thêm người dùng
document.getElementById('addUserButton').addEventListener('click', () => openModal(false));

// Hiển thị bảng ban đầu
renderTable();
