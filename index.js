let expenses = []
let expenseChartCanvas = null;

const expenseForm = document.getElementById("expense-form")
const expenseList = document.getElementById("expense-list");
const expenseChart = document.getElementById("expense-chart")

const renderExpense = () => {

    // Repopulate the expense list
    // Clear it first
    expenseList.innerHTML = ''
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i]
        const li = document.createElement('li')
        li.innerHTML = `
            ${currExpense.description} - $${currExpense.amount}
            <span>${currExpense.type}</span>
        `
        expenseList.appendChild(li)
    }

    // Now generate the data for chart
    let incomeTempList = []
    let expenseTempList = []
    let incomeAmount = 0;
    let expenseAmount = 0;
    for (let i = 0; i < expenses.length; i++) {
        const currExpense = expenses[i]
        if (currExpense.type === "Income") {
            incomeTempList.push(currExpense.amount)
            incomeAmount += currExpense.amount
        } else {
            expenseTempList.push(currExpense.amount)
            expenseAmount += currExpense.amount
        }
    }

    // Now render the chart
    if (expenseChartCanvas) {
        expenseChartCanvas.destroy()
    }
    expenseChartCanvas = new Chart(expenseChart, {
        type: 'pie',
        data : {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [incomeTempList, expenseTempList],
                backgroundColor: ['#4CAF50', 'F44336']
            }]
        },
        options: {
            responsive: true
        }
    })
}


const addExpense = (description, amount, type) => {
    const expense = {description: description, amount: amount, type: type}
    expenses.push(expense)
    renderExpense()   
}


expenseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const description = document.getElementById("description").value
    const amount = document.getElementById("amount").value
    const type = document.getElementById("type").value
    addExpense(description, amount, type)
    expenseForm.reset()
})