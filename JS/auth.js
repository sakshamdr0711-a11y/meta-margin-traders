let currentUser = null;
const ADMIN_PASSCODE = "MMT2026";

function login(role) {
    if (role === "admin") {
        const enteredCode = prompt("Enter admin passcode:");

        if (enteredCode !== ADMIN_PASSCODE) {
            alert("Incorrect admin passcode.");
            return;
        }
    }

    currentUser = role;

    localStorage.setItem("MMT_ROLE", role);

    showApp();
}

function logout() {

    localStorage.removeItem("MMT_ROLE");

    location.reload();

}

function checkLogin() {

    const role = localStorage.getItem("MMT_ROLE");

    if (role) {

        currentUser = role;

        showApp();

    }

}

function showApp() {

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("roleText").textContent =
        currentUser.toUpperCase();

    if (currentUser === "customer") {
        customerMode();
    }

}