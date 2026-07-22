const DB = {

    brokers: [],
    bots: [],
    customers: [],
    investments: [],
    analytics: {
        hasImportedData: false,
        gain: 0,
        balance: 0,
        equity: 0,
        profit: 0,
        drawdown: 0,
        profitFactor: 0,
        sharpe: 0,
        trades: 0,
        winRate: 0,

        history: [],
        openTrades: [],
        closedTrades: [],
        activity: []
    }

};

function loadDatabase() {
    const data = localStorage.getItem("MMT_DATABASE");

    if (data) {
        Object.assign(DB, JSON.parse(data));
    }
}

function saveDatabase() {
    localStorage.setItem("MMT_DATABASE", JSON.stringify(DB));
}

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

loadDatabase();