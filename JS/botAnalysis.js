let botChart;



function renderBotAnalysis() {

    const a = DB.analytics;
    const hasData = Boolean(DB.analytics.hasImportedData);

    document.getElementById("botGain").textContent = hasData ? `${a.gain}%` : "—";
    document.getElementById("botBalance").textContent = hasData ? `$${a.balance}` : "—";
    document.getElementById("botTrades").textContent = hasData ? a.trades : "—";
    document.getElementById("botWinrate").textContent = hasData ? `${a.winRate}%` : "—";
    document.getElementById("botPF").textContent = hasData ? a.profitFactor : "—";
    document.getElementById("botSharpe").textContent = hasData ? a.sharpe : "—";
    document.getElementById("botDD").textContent = hasData ? `${a.drawdown}%` : "—";
    document.getElementById("botEquity").textContent = hasData ? `$${a.equity}` : "—";

    DB.analytics.openTrades

    DB.analytics.activity

    document
        .getElementById("growthBtn")
        .onclick = () => {

            switchBotChart("Growth");

            activateButton("growthBtn");

        };

    document
        .getElementById("balanceBtn")
        .onclick = () => {

            switchBotChart("Balance");

            activateButton("balanceBtn");

        };

    document
        .getElementById("profitBtn")
        .onclick = () => {
            switchBotChart("Profit");

            activateButton("profitBtn");
        };

    document
        .getElementById("drawdownBtn")
        .onclick = () => {
            switchBotChart("Drawdown");

            activateButton("drawdownBtn");
        };


    initBotChart();
    renderBotTrades();
    renderBotActivity();

    activateButton("growthBtn");

}

function refreshBotAnalysis() {

    const a = DB.analytics;
    const hasData = Boolean(DB.analytics.hasImportedData);

    document.getElementById("botGain").textContent = hasData ? `${a.gain}%` : "—";
    document.getElementById("botBalance").textContent = hasData ? `$${a.balance}` : "—";
    document.getElementById("botTrades").textContent = hasData ? a.trades : "—";
    document.getElementById("botWinrate").textContent = hasData ? `${a.winRate}%` : "—";
    document.getElementById("botPF").textContent = hasData ? a.profitFactor : "—";
    document.getElementById("botSharpe").textContent = hasData ? a.sharpe : "—";
    document.getElementById("botDD").textContent = hasData ? `${a.drawdown}%` : "—";
    document.getElementById("botEquity").textContent = hasData ? `$${a.equity}` : "—";

    renderBotTrades();
    renderBotActivity();

}

function renderBotTrades() {
    const table = document.getElementById("botTradeTable");

    if (!table) return;

    table.innerHTML = "";

    if (!DB.analytics.hasImportedData || DB.analytics.openTrades.length === 0) {
        table.innerHTML = `<tr><td colspan="6" class="text-center py-10 text-zinc-500">No imported trades yet.</td></tr>`;
        return;
    }

    DB.analytics.openTrades.forEach(trade => {
        table.innerHTML += `
<tr>
<td>${trade.symbol}</td>
<td>${trade.type}</td>
<td>${trade.lot}</td>
<td>${trade.openPrice}</td>
<td>${trade.profit}</td>
<td>${trade.status}</td>
</tr>`;
    });
}

function renderBotActivity() {
    const container = document.getElementById("botActivity");

    if (!container) return;

    container.innerHTML = "";

    if (!DB.analytics.hasImportedData || DB.analytics.activity.length === 0) {
        container.innerHTML = `<div class="text-zinc-500">No imported activity yet.</div>`;
        return;
    }

    DB.analytics.activity.forEach(item => {
        container.innerHTML += `<div>${item.time} • ${item.event} • ${item.amount}</div>`;
    });
}

function initBotChart() {
    const canvas = document.getElementById("botChart");

    if (!canvas) return;

    if (botChart) {
        const history = DB.analytics.history || [];
        botChart.data.labels = history.map(x => x.date);
        botChart.data.datasets[0].data = history.map(x => x.equity);
        botChart.data.datasets[0].label = "Equity";
        botChart.update("none");

        requestAnimationFrame(() => {
            botChart.resize();
        });

        setTimeout(() => {
            botChart.resize();
        }, 120);

        return;
    }

    const history = DB.analytics.history || [];

    botChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: history.map(x => x.date),
            datasets: [{
                label: "Equity",
                data: history.map(x => x.equity),
                borderColor: "#d4af37",
                backgroundColor: "rgba(212, 175, 55, 0.16)",
                fill: true,
                borderWidth: 3,
                tension: 0.35,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#e5e7eb"
                    }
                }
            },
            scales: {
                x: {
                    border: {
                        color: "rgba(255,255,255,0.16)"
                    },
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.10)",
                        lineWidth: 1
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                },
                y: {
                    border: {
                        color: "rgba(255,255,255,0.16)"
                    },
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.10)",
                        lineWidth: 1
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                }
            }
        }
    });

    requestAnimationFrame(() => {
        botChart.resize();
    });

    setTimeout(() => {
        botChart.resize();
    }, 120);
}

function switchBotChart(type) {
    if (!botChart) return;

    const history = DB.analytics.history || [];

    switch (type) {
        case "Growth":
            botChart.data.datasets[0].data = history.map(x => x.equity);
            break;
        case "Balance":
            botChart.data.datasets[0].data = history.map(x => x.balance);
            break;
        case "Profit":
            botChart.data.datasets[0].data = history.map(x => x.profit);
            break;
        case "Drawdown":
            botChart.data.datasets[0].data = history.map(x => x.drawdown || 0);
            break;
    }

    botChart.data.datasets[0].label = type;
    botChart.update("none");
    requestAnimationFrame(() => {
        botChart.resize();
    });
}

function activateButton(id) {

    document
        .querySelectorAll(".chartBtn")
        .forEach(btn => {

            btn.classList.remove("btn");

            btn.classList.add(
                "border",
                "border-zinc-700"
            );

        });

    const active = document.getElementById(id);

    active.classList.add("btn");

    active.classList.remove(
        "border",
        "border-zinc-700"
    );

}