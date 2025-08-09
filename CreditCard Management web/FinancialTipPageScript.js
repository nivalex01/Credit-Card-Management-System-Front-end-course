// check if the user is logged in
function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}


function getMonthlyExpensesWithAdvice()
{
    const expensesData = localStorage.getItem("transactions");
    if (expensesData == null)
    {
        return { transactions: [], totalExpenses: 0, advice: [] };
    }

    const transactions_array = JSON.parse(expensesData);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthExpenses = [];
    for (let i = 0; i < transactions_array.length; i++) {
        const transaction = transactions_array[i];
        const dateParts = transaction.Date.split('/'); // split the date into parts
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; 
        const year = parseInt(dateParts[2], 10);
        const transactionDate = new Date(year, month, day); // create a valid Date

        if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear)
        {
            currentMonthExpenses.push(transaction); // Add matching transaction to the array
        }
    }

    // sum the expenses for the current month
    let totalExpenses = 0;
    const categoryExpenses = {
        "Retail & Shopping": 0,
        "Food & Beverage": 0,
        "Entertainment": 0,
        "Transportation": 0,
        "Bills & Utilities": 0,
        "Travel": 0,
        "Electronics" : 0,
        "Others": 0
    };

    // sum expenses for each category
    currentMonthExpenses.forEach(transaction => {
        totalExpenses += parseFloat(transaction.Amount);

        if (categoryExpenses.hasOwnProperty(transaction.Category)) {
            categoryExpenses[transaction.Category] += parseFloat(transaction.Amount);
        } else {
            categoryExpenses["Others"] += parseFloat(transaction.Amount);
        }
    });

    // generate advice for each category based on its percentage of total expenses
    const advice = [];

    const categories = ["Retail & Shopping", "Food & Beverage", "Entertainment", "Bills & Utilities", "Travel", "Electronics", "Transportation", "Others"];

    for (let i = 0; i < categories.length; i++)
    {
        let category = categories[i];
        console.log(category)
        let categoryPercentage = (categoryExpenses[category] / totalExpenses) * 100;
        if (category === "Retail & Shopping" && categoryPercentage > 50) {
            advice.push("You are spending more than half of your monthly expenses on Retail & Shopping. Consider reducing your shopping to save more!");
        } else if (category === "Food & Beverage" && categoryPercentage > 30) {
            advice.push("You are spending a significant portion on Food & Beverage. Try cooking at home more to save!");
        } else if (category === "Entertainment" && categoryPercentage > 20) {
            advice.push("Entertainment expenses are high. You might want to explore cheaper options for entertainment.");
        } else if (category === "Bills & Utilities" && categoryPercentage > 25) {
            advice.push("Your Bills & Utilities are taking up a large part of your budget. Look for ways to cut down on these expenses.");
        } else if (category === "Travel" && categoryPercentage > 10) {
            advice.push("Travel expenses are adding up. You might want to plan your trips more carefully or opt for more affordable options.");
        } else if (category === "Electronics" && categoryPercentage > 15) {
            advice.push("Electronics purchases are significant. Consider delaying unnecessary purchases to save money.");
        } else if (category === "Transportation" && categoryPercentage > 15) {
            advice.push("Transportation costs are high. Look for ways to reduce travel expenses, such as using public transport or carpooling.");
        } else if (category === "Others" && categoryPercentage > 15) {
            advice.push("You may want to track 'Other' expenses more closely to ensure you're not overspending in this undefined category.");
        }
    }

    return { transactions: currentMonthExpenses, totalExpenses, advice };
}

// usage of the function to display the financial tips and total expenses
const monthlyData = getMonthlyExpensesWithAdvice();


// display total expenses
const totalExpensesBox = document.getElementById("total-expenses");
const totalExpensesElement = document.createElement("p");
totalExpensesElement.textContent = `Total Expenses for this month: $${monthlyData.totalExpenses.toFixed(2)}`;
totalExpensesBox.appendChild(totalExpensesElement);

// create a container to display the advice
const tips = document.getElementById("tips");

if (monthlyData.advice.length > 0)
{
    // create a heading for the tips
    const heading = document.createElement("h2");
    heading.textContent = "Financial Tips for You!";
    tips.appendChild(heading);

    // display the tips
    monthlyData.advice.forEach(tip => {
        const tipElement = document.createElement("p");
        tipElement.textContent = tip;
        tips.appendChild(tipElement);
    });
}
else {
    const noTipsMessage = document.createElement("p");
    noTipsMessage.textContent = "No financial tips for this month based on your expenses.";
    tips.appendChild(noTipsMessage);
}

// call the checkIfLoggedIn function to ensure the user is logged in
checkIfLoggedIn();
