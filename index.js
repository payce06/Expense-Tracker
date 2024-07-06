let expenses = [];
let expenseChartCanvas = null;

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const expenseChart = document.getElementById("expense-chart");

const renderExpense = () => {
    // Repopulate the expense list
    // Clear it first
    expenseList.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i];
        const li = document.createElement('li');
        li.innerHTML = `
            ${currExpense.description} - $${currExpense.amount}
            <span>${currExpense.type}</span>
        `;
        expenseList.appendChild(li);
    }

    // Group expenses by description and type
    let incomeMap = {};
    let expenseMap = {};
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i];
        if (currExpense.type === "Income") {
            if (!incomeMap[currExpense.description]) {
                incomeMap[currExpense.description] = 0;
            }
            incomeMap[currExpense.description] += parseFloat(currExpense.amount);
        } else {
            if (!expenseMap[currExpense.description]) {
                expenseMap[currExpense.description] = 0;
            }
            expenseMap[currExpense.description] += parseFloat(currExpense.amount);
        }
    }

    // Prepare data for the chart
    const incomeCategories = Object.keys(incomeMap);
    const incomeAmounts = Object.values(incomeMap);
    const expenseCategories = Object.keys(expenseMap);
    const expenseAmounts = Object.values(expenseMap);

    const categories = incomeCategories.concat(expenseCategories);
    const amounts = incomeAmounts.concat(expenseAmounts);
    const backgroundColors = incomeCategories.map(() => '#4CAF50').concat(expenseCategories.map(() => '#F44336'));
    // Now render the chart
    if (expenseChartCanvas) {
        expenseChartCanvas.destroy();
    }
    expenseChartCanvas = new Chart(expenseChart, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: backgroundColors
            }]
        },
        options: {
            responsive: true
        }
    });
}

const addExpense = (description, amount, type) => {
    const expense = { description: description, amount: parseFloat(amount), type: type };
    expenses.push(expense);
    renderExpense();
}

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    addExpense(description, amount, type);
    expenseForm.reset();
});
