function populateBrokerDropdown() {

    const select = document.getElementById("botBroker");

    if (!select) return;

    select.innerHTML = "";

    if (DB.brokers.length === 0) {

        select.innerHTML = `
            <option value="">
                No Brokers Available
            </option>
        `;

        return;
    }

    DB.brokers.forEach(broker => {

        select.innerHTML += `
            <option value="${broker.id}">
                ${broker.name}
            </option>
        `;

    });

}

function populateAnalysisBotDropdown() {

    const select =
        document.getElementById("analysisBot");

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

function renderBotTable() {

    const table = document.getElementById("botTable");

    if (!table) return;

    table.innerHTML = "";

    if (DB.bots.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-10 text-zinc-500">
                📭
                <br><br>
                No bots registered.
            </td>
        </tr>
        `;

        return;
    }

    const keyword =
        document.getElementById("botSearch")
            ?.value
            .toLowerCase() || "";

    DB.bots
        .filter(bot =>
            bot.name.toLowerCase().includes(keyword) ||
            bot.description.toLowerCase().includes(keyword)
        )
        .forEach(bot => {

            const broker =
                DB.brokers.find(b => b.id === bot.brokerId);

            table.innerHTML += `
            <tr>

                <td>${bot.name}</td>

                <td>${bot.description}</td>

                <td>${broker ? broker.name : "-"}</td>

                <td class="flex gap-2">

                    <button
                        onclick="editBot('${bot.id}')"
                        class="action-btn edit-btn">

                        Edit

                    </button>

                    <button
                        onclick="deleteBot('${bot.id}')"
                        class="action-btn delete-btn">

                        Delete

                    </button>

                </td>

            </tr>
            `;

        });

}

function addBot() {

    const name =
        document.getElementById("botName")
            .value
            .trim();

    const description =
        document.getElementById("botDescription")
            .value
            .trim();

    const brokerId =
        document.getElementById("botBroker")
            .value;

    if (name === "") return;

    DB.bots.push({

        id: uid(),

        name,

        description,

        brokerId,

        createdAt: new Date()

    });

    saveDatabase();

    renderBotTable();

    renderDashboard();

    document.getElementById("botName").value = "";
    document.getElementById("botDescription").value = "";

    populateInvestmentBotDropdown();

}

function deleteBot(id) {

    DB.bots =
        DB.bots.filter(bot => bot.id !== id);

    saveDatabase();

    renderBotTable();

    renderDashboard();

}

function editBot(id) {

    const bot =
        DB.bots.find(b => b.id === id);

    if (!bot) return;

    const name =
        prompt("Bot Name", bot.name);

    if (name === null) return;

    const description =
        prompt("Description", bot.description);

    if (description === null) return;

    bot.name = name.trim();

    bot.description = description.trim();

    saveDatabase();

    renderBotTable();

}