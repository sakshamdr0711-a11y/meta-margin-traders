function uploadReport() {
    const file = document.getElementById("reportFile").files[0];

    if (!file) {
        alert("Please choose an Excel report.");
        return;
    }

    const extension = file.name.split(".").pop().toLowerCase();

    if (extension !== "xlsx" && extension !== "xls" && extension !== "html" && extension !== "htm") {
        alert("Please upload an Excel or HTML report.");
        return;
    }

    readExcel(file);
}

function readExcel(file){
    const reader = new FileReader();

    reader.onload = function(e){
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            parseWorkbook(workbook);
        } catch (error) {
            console.error("Excel parse failed:", error);
            alert("The selected file could not be parsed. Please use the required sheet format.");
        }
    };

    reader.onerror = function() {
        alert("The selected file could not be read.");
    };

    reader.readAsArrayBuffer(file);
}

function sheetToJSON(workbook,sheetName){

    const sheet = workbook.Sheets[sheetName];

    if(!sheet) return [];

    return XLSX.utils.sheet_to_json(sheet,{
        defval:""
    });

}

function parseWorkbook(workbook){
    try {
        parseSummary(sheetToJSON(workbook, "Summary"));
        parseHistory(sheetToJSON(workbook, "History"));
        parseOpenTrades(sheetToJSON(workbook, "Open Trades"));
        parseClosedTrades(sheetToJSON(workbook, "Closed Trades"));
        parseActivity(sheetToJSON(workbook, "Activity"));

        DB.analytics.hasImportedData = true;

        saveDatabase();

        renderAnalytics();
        refreshBotAnalysis();
        updateGrowthChart();
        updateDashboardChart();
        initBotChart();
        renderDashboard();

        alert("Report Imported Successfully.");
    } catch (error) {
        console.error("Workbook parse failed:", error);
        alert("The report structure is invalid. Please follow the required sheet format.");
    }
}

function parseSummary(rows){
    rows.forEach(row=>{
        const metric = row.Metric || row.metric || row.Metrics || row.Measure;
        const value = row.Value ?? row.value ?? row.Amount ?? row.Number;

        switch(metric){
            case "Gain":
                DB.analytics.gain = Number(value) || 0;
                break;
            case "Balance":
                DB.analytics.balance = Number(value) || 0;
                break;
            case "Equity":
                DB.analytics.equity = Number(value) || 0;
                break;
            case "Profit":
                DB.analytics.profit = Number(value) || 0;
                break;
            case "Drawdown":
                DB.analytics.drawdown = Number(value) || 0;
                break;
            case "Profit Factor":
                DB.analytics.profitFactor = Number(value) || 0;
                break;
            case "Sharpe Ratio":
                DB.analytics.sharpe = Number(value) || 0;
                break;
            case "Trades":
                DB.analytics.trades = Number(value) || 0;
                break;
            case "Win Rate":
                DB.analytics.winRate = Number(value) || 0;
                break;
        }
    });
}

function parseHistory(rows){
    DB.analytics.history = (rows || []).map(r => ({
        date: r.Date || r.date || "",
        balance: Number(r.Balance ?? r.balance ?? 0) || 0,
        equity: Number(r.Equity ?? r.equity ?? 0) || 0,
        profit: Number(r.Profit ?? r.profit ?? 0) || 0,
        drawdown: Number(r.Drawdown ?? r.drawdown ?? 0) || 0
    })).filter(item => item.date !== "" || item.equity !== 0 || item.balance !== 0 || item.profit !== 0);
}

function parseOpenTrades(rows){
    DB.analytics.openTrades = (rows || []).map(r => ({
        symbol: r.Symbol || r.symbol || "",
        type: r.Type || r.type || "",
        lot: Number(r.Lot ?? r.lot ?? 0) || 0,
        openPrice: Number(r["Open Price"] ?? r["open price"] ?? r.openPrice ?? 0) || 0,
        currentPrice: Number(r["Current Price"] ?? r["current price"] ?? r.currentPrice ?? 0) || 0,
        profit: Number(r.Profit ?? r.profit ?? 0) || 0,
        status: r.Status || r.status || "OPEN"
    })).filter(trade => trade.symbol !== "" || trade.type !== "");
}

function parseClosedTrades(rows){

    DB.analytics.closedTrades=rows.map(r=>({

        ticket:r.Ticket,

        symbol:r.Symbol,

        type:r.Type,

        openTime:r["Open Time"],

        closeTime:r["Close Time"],

        profit:Number(r.Profit),

        pips:Number(r.Pips),

        commission:Number(r.Commission),

        swap:Number(r.Swap)

    }));

}

function parseActivity(rows){
    DB.analytics.activity = (rows || []).map(r => ({
        time: r.Time || r.time || "",
        event: r.Event || r.event || "",
        amount: Number(r.Amount ?? r.amount ?? 0) || 0,
        description: r.Description || r.description || ""
    })).filter(item => item.event !== "");
}

