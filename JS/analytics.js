function formatMetricValue(value, suffix = "", prefix = "", fallback = "—") {
    if (value === null || value === undefined || value === "" || Number.isNaN(Number(value))) {
        return fallback;
    }

    return `${prefix}${Number(value).toLocaleString()}${suffix}`;
}

function renderAnalytics() {

    const a = DB.analytics;
    const hasData = Boolean(DB.analytics.hasImportedData);

    document.getElementById("gainValue").textContent = hasData ? `${a.gain}%` : "—";
    document.getElementById("profitValue").textContent = hasData ? `$${formatMetricValue(a.profit)}` : "—";
    document.getElementById("tradeValue").textContent = hasData ? a.trades : "—";
    document.getElementById("winRateValue").textContent = hasData ? `${a.winRate}%` : "—";
    document.getElementById("balanceValue").textContent = hasData ? `$${formatMetricValue(a.balance)}` : "—";
    document.getElementById("drawdownValue").textContent = hasData ? `${a.drawdown}%` : "—";
    document.getElementById("pfValue").textContent = hasData ? a.profitFactor : "—";
    document.getElementById("sharpeValue").textContent = hasData ? a.sharpe : "—";

    renderAnalyticsTable();
    renderTradeTable();
    renderActivity();

}

function renderAnalyticsTable(){

    const table =
        document.getElementById("analyticsTable");

    if (!table) return;

    table.innerHTML="";

    if (!DB.analytics.hasImportedData || DB.analytics.history.length === 0) {
        table.innerHTML = `
<tr>
<td colspan="6" class="text-center py-10 text-zinc-500">No history imported yet.</td>
</tr>`;
        return;
    }

    DB.analytics.history.forEach(row=>{

        table.innerHTML += `

<tr>

<td>${row.date}</td>

<td>${row.profit}</td>

<td>$${row.profit}</td>

<td>-</td>

<td>-</td>

<td>-</td>

</tr>

`;

    });

}

function renderTradeTable(){

    const table =
        document.getElementById("tradeTable");

    if (!table) return;

    table.innerHTML="";

    if (!DB.analytics.hasImportedData || DB.analytics.openTrades.length === 0) {
        table.innerHTML = `
<tr>
<td colspan="6" class="text-center py-10 text-zinc-500">No open trades imported yet.</td>
</tr>`;
        return;
    }

    DB.analytics.openTrades.forEach(trade=>{

        table.innerHTML += `

<tr>

<td>${trade.symbol}</td>

<td>${trade.type}</td>

<td>${trade.lot}</td>

<td>${trade.openPrice}</td>

<td>${trade.profit}</td>

<td>${trade.status}</td>

</tr>

`;

    });

}

function renderActivity(){

    const container =
        document.getElementById("activityContainer");

    if(!container) return;

    container.innerHTML="";

    if (!DB.analytics.hasImportedData || DB.analytics.activity.length === 0) {
        container.innerHTML = `<div class="text-zinc-500">No activity imported yet.</div>`;
        return;
    }

    DB.analytics.activity.forEach(a=>{

        container.innerHTML += `

<div>

${a.time}
&nbsp;
${a.event}
&nbsp;
${a.amount}

</div>

`;

    });

}



