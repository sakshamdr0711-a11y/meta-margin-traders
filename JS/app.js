document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    document
        .getElementById("adminLogin")
        .onclick = () => login("admin");

    document
        .getElementById("customerLogin")
        .onclick = () => login("customer");

    initTabs();
    document

        .getElementById("addBrokerBtn")

        .addEventListener(

            "click",

            addBroker

        );

    document
        .getElementById("brokerSearch")
        .addEventListener("input", renderBrokerTable);

    document
        .getElementById("addBotBtn")
        .addEventListener("click", addBot);

    document
        .getElementById("botSearch")
        .addEventListener("input", renderBotTable);

    document
        .getElementById("addInvestmentBtn")
        .addEventListener(
            "click",
            addInvestment
        );

    document
        .getElementById("investmentSearch")
        .addEventListener(
            "input",
            renderInvestmentTable
        );

    document
        .getElementById("uploadReportBtn")
        .addEventListener(
            "click",
            uploadReport
        );

    document
        .getElementById("addCustomerBtn")
        .addEventListener("click", addCustomer);

    document
        .getElementById("customerSearch")
        .addEventListener("input", renderCustomerTable);

    populateBrokerDropdown();

    

    renderBrokerTable();

    renderBotTable();

    renderCustomerTable();

    renderInvestmentTable();

    loadDatabase();
    
    initCharts();

    renderDashboard();

    renderAnalytics();

    renderBotAnalysis();

    refreshBotAnalysis();

    updateGrowthChart();

    populateBrokerDropdown();

    populateCustomerDropdown();

    populateInvestmentBrokerDropdown();

    populateInvestmentBotDropdown();

    populateAnalysisBotDropdown();

    populateAnalysisBrokerDropdown();

    renderAnalytics();

    updateDashboard();
});