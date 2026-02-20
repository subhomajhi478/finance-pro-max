‎let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
‎let chart1, chart2;
‎
‎if (!localStorage.getItem("appPassword")) {
‎    localStorage.setItem("appPassword", "1234");
‎}
‎
‎function login() {
‎    let pass = document.getElementById("password").value;
‎    if (pass === localStorage.getItem("appPassword")) {
‎        document.getElementById("loginBox").style.display = "none";
‎        document.getElementById("app").style.display = "block";
‎        updateUI();
‎    } else {
‎        alert("Wrong Password!");
‎    }
‎}
‎
‎function changePassword() {
‎    let newPass = prompt("Enter new password:");
‎    if (newPass) {
‎        localStorage.setItem("appPassword", newPass);
‎        alert("Password Changed!");
‎    }
‎}
‎
‎function addTransaction() {
‎    let date = date.value;
‎    let desc = document.getElementById("desc").value;
‎    let amount = document.getElementById("amount").value;
‎    let type = document.getElementById("type").value;
‎
‎    if (!date || !desc || !amount) return alert("Fill all fields");
‎
‎    transactions.push({ id: Date.now(), date, desc, amount, type });
‎    localStorage.setItem("transactions", JSON.stringify(transactions));
‎    updateUI();
‎}
‎
‎function deleteTransaction(id) {
‎    transactions = transactions.filter(t => t.id !== id);
‎    localStorage.setItem("transactions", JSON.stringify(transactions));
‎    updateUI();
‎}
‎
‎function updateUI() {
‎    let list = document.getElementById("list");
‎    list.innerHTML = "";
‎
‎    let filterMonth = document.getElementById("monthFilter").value;
‎
‎    let income = 0;
‎    let expense = 0;
‎    let balance = 0;
‎
‎    transactions.forEach(t => {
‎        if (filterMonth && !t.date.startsWith(filterMonth)) return;
‎
‎        let li = document.createElement("li");
‎        li.innerHTML = `${t.date} | ${t.desc} - ₹${t.amount}
‎        <button onclick="deleteTransaction(${t.id})">❌</button>`;
‎        list.appendChild(li);
‎
‎        if (t.type === "income") {
‎            income += Number(t.amount);
‎            balance += Number(t.amount);
‎        } else {
‎            expense += Number(t.amount);
‎            balance -= Number(t.amount);
‎        }
‎    });
‎
‎    document.getElementById("balance").textContent = balance;
‎    renderCharts(income, expense);
‎}
‎
‎function renderCharts(income, expense) {
‎    if (chart1) chart1.destroy();
‎    if (chart2) chart2.destroy();
‎
‎    chart1 = new Chart(document.getElementById("pieChart"), {
‎        type: "pie",
‎        data: {
‎            labels: ["Income", "Expense"],
‎            datasets: [{
‎                data: [income, expense],
‎                backgroundColor: ["green", "red"]
‎            }]
‎        }
‎    });
‎
‎    chart2 = new Chart(document.getElementById("barChart"), {
‎        type: "bar",
‎        data: {
‎            labels: ["Income", "Expense"],
‎            datasets: [{
‎                data: [income, expense],
‎                backgroundColor: ["green", "red"]
‎            }]
‎        }
‎    });
‎}
‎
‎function toggleDark() {
‎    document.body.classList.toggle("dark");
‎}
‎
‎function exportPDF() {
‎    window.print();
‎}
