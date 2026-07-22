function renderInvestmentTable() {

    const table =
        document.getElementById("investmentTable");

    if (!table) return;

    table.innerHTML = "";

    if (DB.investments.length === 0) {

        table.innerHTML = `

<tr>

<td colspan="5"
class="text-center py-10 text-zinc-500">

📭

<br><br>

No investments found.

</td>

</tr>

`;

        return;

    }

    const keyword =
        document
            .getElementById("investmentSearch")
            ?.value
            .toLowerCase() || "";

    DB.investments

        .filter(inv => {

            const customer =
                DB.customers.find(c => c.id === inv.customerId);

            const broker =
                DB.brokers.find(b => b.id === inv.brokerId);

            const bot =
                DB.bots.find(bt => bt.id === inv.botId);

            return (

                customer?.name.toLowerCase().includes(keyword) ||

                broker?.name.toLowerCase().includes(keyword) ||

                bot?.name.toLowerCase().includes(keyword)

            );

        })

        .forEach(inv => {

            const customer =
                DB.customers.find(c => c.id === inv.customerId);

            const broker =
                DB.brokers.find(b => b.id === inv.brokerId);

            const bot =
                DB.bots.find(bt => bt.id === inv.botId);

            table.innerHTML += `

<tr>

<td>${customer?.name || "-"}</td>

<td>${broker?.name || "-"}</td>

<td>${bot?.name || "-"}</td>

<td>$${inv.amount.toLocaleString()}</td>

<td class="flex gap-2">

<button

class="action-btn edit-btn"

onclick="editInvestment('${inv.id}')">

Edit

</button>

<button

class="action-btn delete-btn"

onclick="deleteInvestment('${inv.id}')">

Delete

</button>

</td>

</tr>

`;

        });

}

function populateCustomerDropdown() {

    const select =
        document.getElementById("investmentCustomer");

    if (!select) return;

    select.innerHTML = "";

    DB.customers.forEach(customer => {

        select.innerHTML += `

<option value="${customer.id}">

${customer.name}

</option>

`;

    });

}

function populateInvestmentBrokerDropdown() {

    const select =
        document.getElementById("investmentBroker");

    if (!select) return;

    select.innerHTML = "";

    DB.brokers.forEach(broker => {

        select.innerHTML += `

<option value="${broker.id}">

${broker.name}

</option>

`;

    });

}

function populateInvestmentBotDropdown() {

    const select =
        document.getElementById("investmentBot");

    if (!select) return;

    select.innerHTML = "";

    DB.bots.forEach(bot => {

        select.innerHTML += `

<option value="${bot.id}">

${bot.name}

</option>

`;

    });

}

function addInvestment() {

    const customerId =
        document.getElementById("investmentCustomer").value;

    const brokerId =
        document.getElementById("investmentBroker").value;

    const botId =
        document.getElementById("investmentBot").value;

    const amount =
        Number(
            document.getElementById("investmentAmount").value
        );

    if (
        !customerId ||
        !brokerId ||
        !botId ||
        amount <= 0
    ) {

        alert("Fill all fields.");

        return;

    }

    DB.investments.push({

        id: uid(),

        customerId,

        brokerId,

        botId,

        amount,

        createdAt: new Date()

    });

    saveDatabase();

    renderInvestmentTable();

    renderDashboard();

    document.getElementById("investmentAmount").value = "";

}

function deleteInvestment(id){

    const confirmDelete =
        confirm("Delete this investment?");

    if(!confirmDelete) return;

    DB.investments =
        DB.investments.filter(inv => inv.id !== id);

    saveDatabase();

    renderInvestmentTable();

    renderDashboard();

}

function editInvestment(id){

    const investment =
        DB.investments.find(inv => inv.id === id);

    if(!investment) return;

    const amount = prompt(
        "Investment Amount",
        investment.amount
    );

    if(amount === null) return;

    const newAmount = Number(amount);

    if(isNaN(newAmount) || newAmount <= 0){

        alert("Invalid amount.");

        return;

    }

    investment.amount = newAmount;

    saveDatabase();

    renderInvestmentTable();

    renderDashboard();

}