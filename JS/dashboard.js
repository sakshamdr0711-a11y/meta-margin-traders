function renderDashboard() {

    if (typeof initDashboardChart === "function") {
        initDashboardChart();
    }

    document.getElementById("brokerCount").textContent =
        DB.brokers.length;

    document.getElementById("botCount").textContent =
        DB.bots.length;

    document.getElementById("customerCount").textContent =
        DB.customers.length;

    if(document.getElementById("aumValue")){

        document.getElementById("aumValue").textContent =
            "$" + (DB.analytics.balance || 0).toLocaleString();

    }

}

function renderRecentInvestments(){

    const table =
        document.getElementById("recentInvestmentTable");

    if(!table) return;

    table.innerHTML="";

    if(DB.investments.length===0){

        table.innerHTML=`

<tr>

<td colspan="5"
class="text-center py-10 text-zinc-500">

No investments yet.

</td>

</tr>

`;

        return;

    }

    const latest =
        [...DB.investments]

        .sort((a,b)=>

            new Date(b.createdAt)-new Date(a.createdAt)

        )

        .slice(0,5);

    latest.forEach(inv=>{

        const customer=
            DB.customers.find(c=>c.id===inv.customerId);

        const broker=
            DB.brokers.find(b=>b.id===inv.brokerId);

        const bot=
            DB.bots.find(bt=>bt.id===inv.botId);

        table.innerHTML+=`

<tr>

<td>${customer?.name || "-"}</td>

<td>${broker?.name || "-"}</td>

<td>${bot?.name || "-"}</td>

<td>$${inv.amount.toLocaleString()}</td>

<td>

<span class="text-green-400">

Active

</span>

</td>

</tr>

`;

    });

}

function updateDashboard(){

    const a = DB.analytics;

    document.getElementById("aumValue").textContent =
        "$" + a.balance.toLocaleString();

}