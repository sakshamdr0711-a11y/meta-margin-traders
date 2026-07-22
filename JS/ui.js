function initTabs() {

    document.querySelectorAll(".tabbtn").forEach(btn => {

        btn.addEventListener("click", () => {

            document.querySelectorAll(".tabbtn")
                .forEach(b => b.classList.remove("active"));

            document.querySelectorAll(".tab")
                .forEach(t => t.classList.remove("active"));

            btn.classList.add("active");

            document
                .getElementById(btn.getAttribute("data"))
                .classList.add("active");

            setTimeout(() => {
                if (typeof growthChart !== "undefined" && growthChart) {
                    growthChart.resize();
                }
                if (typeof botChart !== "undefined" && botChart) {
                    botChart.resize();
                }
                window.dispatchEvent(new Event("resize"));
            }, 120);

        });

    });

}

function customerMode() {

    // Hide all tabs except Dashboard
    document.querySelector('[data="t1"]').remove();
    document.querySelector('[data="t2"]').remove();
    document.querySelector('[data="t3"]').remove();
    document.querySelector('[data="t4"]').remove();

    // Make sure Dashboard stays selected
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById("t0").classList.add("active");

}