
let products = JSON.parse(localStorage.getItem("ProductsFromLocalStroge")) || [];
let productName = document.getElementById("product-name");
let category = document.getElementById("category");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let supplierName = document.getElementById("supplier-name");
let form = document.querySelector("#product-form");
let submitBtn = document.getElementById("submit")
let cancelBtn = document.getElementById("cancel-btn");

let totalProduct = document.getElementById("total-product");
let totalStock = document.getElementById("total-stock");
let lowStock = document.getElementById("low-stock");
let tableBody = document.getElementById("Table-Body");
let noData = document.getElementById("noData");
let searchInput = document.querySelector(".search-box input");

displayProducts();
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let editIndex = document.getElementById("edit-index").value;

    let product = {
        name: productName.value,
        category: category.value,
        price: parseFloat(price.value),
        qty: parseInt(quantity.value),
        supplier: supplierName.value
    };



    if (editIndex === "") {
        products.push(product);
    }
    else {
        products[editIndex] = product;
        document.getElementById("edit-index").value = "";
    }

    displayProducts();
    saveDataLocal();
    form.reset();
    submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';

});


function saveDataLocal() {
    localStorage.setItem("ProductsFromLocalStroge", JSON.stringify(products));

}


function displayProducts() {

    tableBody.innerHTML = "";

    if (products.length === 0) {
        noData.style.display = "block";
        totalProduct.innerText = 0;
        totalStock.innerText = 0;
        lowStock.innerText = 0;
        return;
    }
    let totalQty = 0;
    let lowStockCount = 0;

    noData.style.display = "none";

    for (let i = 0; i < products.length; i++) {

        let p = products[i];
        totalQty += parseInt(p.qty);
        if (parseInt(p.qty) <= 5) lowStockCount++;
        let status = parseInt(p.qty) <= 5 ? "Low Stock" : "In Stock";

        tableBody.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>$${p.price}</td>
            <td>${p.qty}</td>
            <td>
                <span class="badge ${status === 'Low Stock' ? 'badge-warning' : 'badge-success'}">
                    ${status}
                </span>
            </td>
            <td>${p.supplier}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editProduct(${i})" class="btn btn-icon btn-edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button onclick="deleteProduct(${i})" class="btn btn-icon btn-delete" >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;

    };

    totalProduct.innerText = products.length;
    totalStock.innerText = totalQty;
    lowStock.innerText = lowStockCount;

}

function editProduct(index) {

    let p = products[index];

    productName.value = p.name;
    category.value = p.category;
    price.value = p.price;
    quantity.value = p.qty;
    supplierName.value = p.supplier;

    document.getElementById("edit-index").value = index;

    submitBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
    cancelBtn.style.display = "inline-block";
}

cancelBtn.addEventListener("click", function () {


    form.reset();

    document.getElementById("edit-index").value = "";

    submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Product';

    cancelBtn.style.display = "none";

});
cancelBtn.style.display = "none";

let deleteIndex;

function deleteProduct(index) {
    deleteIndex = index;
    document.getElementById("delete-modal").style.display = "block";
}

document.getElementById("confirm-delete").onclick = function () {
    products.splice(deleteIndex, 1);
    saveDataLocal();
    displayProducts();
    document.getElementById("delete-modal").style.display = "none";
};

document.getElementById("cancel-delete").onclick = function () {
    document.getElementById("delete-modal").style.display = "none";
};





searchInput.addEventListener("input", function() {
    let filter = searchInput.value.toLowerCase(); 
    let rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
        let nameCell = row.cells[0].textContent.toLowerCase();
        let categoryCell = row.cells[1].textContent.toLowerCase();

        if (nameCell.includes(filter) || categoryCell.includes(filter)) {
            row.style.display = "";
            noData.style.display = "none";
        } else {
            row.style.display = "none";
            noData.style.display = "block";
        }
        
    }

});



