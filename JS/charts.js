let growthChart;
let dashboardChart;

function resizeChart(chart) {
    if (!chart) return;

    requestAnimationFrame(() => {
        chart.resize();
    });

    setTimeout(() => {
        chart.resize();
    }, 120);
}

function initDashboardChart() {
    const canvas = document.getElementById("c1");

    if (!canvas) return;

    if (dashboardChart) {
        const history = DB.analytics.history || [];
        dashboardChart.data.labels = history.map(x => x.date);
        dashboardChart.data.datasets[0].data = history.map(x => x.equity);
        dashboardChart.update("none");
        resizeChart(dashboardChart);
        return;
    }

    const history = DB.analytics.history || [];

    dashboardChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: history.map(x => x.date),
            datasets: [{
                label: "AUM Growth",
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
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.08)"
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.08)"
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                }
            }
        }
    });

    resizeChart(dashboardChart);
}

function initCharts() {
    const canvas = document.getElementById("growthChart");

    if (!canvas) return;

    if (growthChart) {
        const history = DB.analytics.history || [];
        growthChart.data.labels = history.map(x => x.date);
        growthChart.data.datasets[0].data = history.map(x => x.equity);
        growthChart.update("none");
        resizeChart(growthChart);
        return;
    }

    const history = DB.analytics.history || [];

    growthChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: history.map(x => x.date),
            datasets: [{
                label: "Growth",
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
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.08)"
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: "rgba(255,255,255,0.08)"
                    },
                    ticks: {
                        color: "#9ca3af"
                    }
                }
            }
        }
    });

    resizeChart(growthChart);
    initDashboardChart();
}

function updateGrowthChart() {
    if (!growthChart) {
        initCharts();
        return;
    }

    const history = DB.analytics.history || [];

    growthChart.data.labels = history.map(x => x.date);
    growthChart.data.datasets[0].data = history.map(x => x.equity);
    growthChart.update("none");
    resizeChart(growthChart);
    updateDashboardChart();
}

function updateDashboardChart() {
    if (!dashboardChart) {
        initDashboardChart();
        return;
    }

    const history = DB.analytics.history || [];

    dashboardChart.data.labels = history.map(x => x.date);
    dashboardChart.data.datasets[0].data = history.map(x => x.equity);
    dashboardChart.update("none");
    resizeChart(dashboardChart);
}