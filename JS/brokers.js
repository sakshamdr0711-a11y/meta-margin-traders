function renderBrokerTable() {

    const table = document.getElementById("brokerTable");

    if (!table) return;

    table.innerHTML = "";

    if (DB.brokers.length === 0) {

        table.innerHTML = `
    <tr>
        <td colspan="3" class="text-center py-10 text-zinc-500">

            📭

            <br><br>

            No brokers registered.

        </td>
    </tr>
    `;

        return;

    }

    const keyword = document
        .getElementById("brokerSearch")
        ?.value
        .toLowerCase() || "";

    DB.brokers
        .filter(broker =>
            broker.name.toLowerCase().includes(keyword) ||
            broker.notes.toLowerCase().includes(keyword)
        )
        .forEach(broker => {

            table.innerHTML += `

                <td>${broker.name}</td>

                <td>${broker.notes}</td>

                <td class="flex gap-2">

                    <button
                        onclick="editBroker('${broker.id}')"
                        class="action-btn edit-btn">

                        Edit

                    </button>

                    <button
                        onclick="deleteBroker('${broker.id}')"
                        class="action-btn delete-btn">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

}

function addBroker() {

    const name = document
        .getElementById("brokerName")
        .value
        .trim();

    const notes = document
        .getElementById("brokerNotes")
        .value
        .trim();

    if (name === "") return;

    DB.brokers.push({

        id: uid(),

        name,

        notes,

        createdAt: new Date()

    });

    saveDatabase();

    renderBrokerTable();

    renderDashboard();

    populateBrokerDropdown();

    document.getElementById("brokerName").value = "";
    document.getElementById("brokerNotes").value = "";

    populateInvestmentBrokerDropdown();
}

function deleteBroker(id) {

    DB.brokers =

        DB.brokers.filter(

            b => b.id !== id

        );

    saveDatabase();

    renderBrokerTable();

    renderDashboard();

}

function editBroker(id) {

    const broker = DB.brokers.find(b => b.id === id);

    if (!broker) return;

    const newName = prompt("Broker Name", broker.name);

    if (newName === null) return;

    const newNotes = prompt("Notes", broker.notes);

    if (newNotes === null) return;

    broker.name = newName.trim();

    broker.notes = newNotes.trim();

    saveDatabase();

    renderBrokerTable();

    renderDashboard();

}

function populateAnalysisBrokerDropdown() {

    const select =
        document.getElementById("analysisBroker");

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