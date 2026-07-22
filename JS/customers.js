function renderCustomerTable() {

    const table =
        document.getElementById("customerTable");

    if (!table) return;

    table.innerHTML = "";

    if (DB.customers.length === 0) {

        table.innerHTML = `

<tr>

<td colspan="4" class="text-center py-10 text-zinc-500">

📭

<br><br>

No customers yet.

</td>

</tr>

`;

        return;

    }

    const keyword =
        document
            .getElementById("customerSearch")
            ?.value
            .toLowerCase() || "";

    DB.customers

        .filter(customer =>

            customer.name.toLowerCase().includes(keyword) ||

            customer.email.toLowerCase().includes(keyword)

        )

        .forEach(customer => {

            table.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.email}</td>

<td class="flex gap-2">

<button

onclick="editCustomer('${customer.id}')"

class="action-btn edit-btn">

Edit

</button>

<button

onclick="deleteCustomer('${customer.id}')"

class="action-btn delete-btn">

Delete

</button>

</td>

</tr>

`;

        });

}

function addCustomer() {
    const name = document.getElementById("customerName")?.value.trim() || "";
    const phone = document.getElementById("customerPhone")?.value.trim() || "";
    const email = document.getElementById("customerEmail")?.value.trim() || "";
    const password = document.getElementById("customerPassword")?.value.trim() || "";

    if (!name || !email) {
        alert("Please enter a customer name and email.");
        return;
    }

    const exists = DB.customers.some(customer => customer.email.toLowerCase() === email.toLowerCase());

    if (exists) {
        alert("A customer with that email already exists.");
        return;
    }

    DB.customers.push({
        id: uid(),
        name,
        phone,
        email,
        password,
        createdAt: new Date().toISOString()
    });

    saveDatabase();
    renderCustomerTable();
    renderDashboard();
    populateCustomerDropdown();

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerEmail").value = "";
    document.getElementById("customerPassword").value = "";
}

function deleteCustomer(id) {

    DB.customers =
        DB.customers.filter(c => c.id !== id);

    saveDatabase();

    renderCustomerTable();

    renderDashboard();

}

function editCustomer(id) {

    const customer =
        DB.customers.find(c => c.id === id);

    if (!customer) return;

    const name =
        prompt("Customer Name", customer.name);

    if (name === null) return;

    const phone =
        prompt("Phone", customer.phone);

    if (phone === null) return;

    const email =
        prompt("Email", customer.email);

    if (email === null) return;

    customer.name = name.trim();

    customer.phone = phone.trim();

    customer.email = email.trim();

    saveDatabase();

    renderCustomerTable();

}