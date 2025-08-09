let paymentBarChart = null;
let categoryPieChart = null;
let paymentDoughnutChart = null

// get the list of users and the user_transactions from the local storage
let usersList = JSON.parse(localStorage.getItem("listOfUsers")) || [];
let user_transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// function that generate the month dropdown list
function generateMonthOptions()
{
    const monthDropdown = document.getElementById("month-dropdown");
    const startYear = 2024;
    const currentDate = new Date();

    // add a default "Select Month" option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Month";
    defaultOption.disabled = true; // make this option unselectable
    defaultOption.selected = true;
    monthDropdown.appendChild(defaultOption);

    for (let year = startYear; year <= currentDate.getFullYear(); year++)
    {
        let endMonth;
        if (year === currentDate.getFullYear()) { endMonth = currentDate.getMonth(); }
        else { endMonth = 11; }

        for (let month = 0; month <= endMonth; month++)
        {
            const date = new Date(year, month);
            const monthName = date.toLocaleString("default", { month: "long" });
            const option = document.createElement("option");
            option.setAttribute("data-month", month + 1); // +1 because in js months starts with 0
            option.setAttribute("data-year", year);
            option.textContent = `${monthName} ${year}`;
            monthDropdown.appendChild(option);
        }
    }
}


// function that generate the credit card dropdown list
function generateCreditCardOptions()
{
    const creditCardDropdown = document.getElementById("credit-card-dropdown");
    let loggedInUser_json = localStorage.getItem("loggedInUser");
    let loggedInUser_array = JSON.parse(loggedInUser_json);
    let loggedin_user_email = loggedInUser_array[0].email; // get the logged in user email
    let user = usersList.find(user => user.email === loggedin_user_email); //find a user object by logged in user email
    creditCardDropdown.innerHTML = '';

    // add "all cards" option as the first option
    const allCardsOption = document.createElement("option");
    allCardsOption.setAttribute("data-card-number", "0"); // set '0' as default value
    allCardsOption.textContent = "All Cards";
    allCardsOption.selected = true; 
    creditCardDropdown.appendChild(allCardsOption);

    // iterate over the user credit cards array
    if (user != null && user.creditCards != null)
    {
        for (let i = 0; i < user.creditCards.length; i++)
        {
            const card = user.creditCards[i];
            const option = document.createElement("option"); // create a new option element for each credit card
            option.setAttribute("data-card-number", card.number); // store the full card number
            option.setAttribute("data-card-index", i); // store the card index
            option.textContent = `**** **** **** ${card.number.slice(-4)} (Exp: ${card.expirationDate})`; // masked the card number (execpt the last 4) with expiration date
            creditCardDropdown.appendChild(option);
        }
    }
}
function displayTransactionswithCardNumber(filteredTransactions, cardNumber) {
    let transactionsBody = document.getElementById("transactions-body");
    let transactionsTable = document.getElementById("transactions-table");
    transactionsBody.innerHTML = '';

    // check if the filtered transactions array is valid and contains data
    if (Array.isArray(filteredTransactions) && filteredTransactions.length > 0) {
        // display the transactions table
        transactionsTable.style.display = 'table';
        let filteredtransactionsByCard = [];
        for (let i = 0; i < filteredTransactions.length; i++) {
            if (filteredTransactions[i].cardNumber === cardNumber) {
                filteredtransactionsByCard.push(filteredTransactions[i]);
            }
        }

        // append each transaction from filteredtransactionsByCard to the table
        for (let i = 0; i < filteredtransactionsByCard.length; i++) {
            let transaction = createTransactiondetails(filteredtransactionsByCard[i]);
            transactionsBody.appendChild(transaction);
        }
    }
    else {
        transactionsTable.style.display = 'none';
    }
}

function displayTransactionsWithoutCardNumber(filteredTransactions) {
    let transactionsBody = document.getElementById("transactions-body");
    let transactionsTable = document.getElementById("transactions-table");
    transactionsBody.innerHTML = '';

    // check if the filtered transactions array is valid and contains data
    if (Array.isArray(filteredTransactions) && filteredTransactions.length > 0)
    {
        transactionsTable.style.display = 'table';

        // append each transaction to the table
        for (let i = 0; i < filteredTransactions.length; i++) {
            let transaction = createTransactiondetails(filteredTransactions[i]);
            transactionsBody.appendChild(transaction);
        }
    } else {
        transactionsTable.style.display = 'none';
    }
}

function createTransactiondetails(transaction) {
    const details = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = transaction.Date;
    details.appendChild(dateCell);

    const businessNameCell = document.createElement("td");
    businessNameCell.textContent = transaction.BusinessName;
    details.appendChild(businessNameCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = transaction.Category;
    details.appendChild(categoryCell);


    const cardNumberCell = document.createElement("td");
    cardNumberCell.textContent = `**** **** **** ${transaction.cardNumber.slice(-4)}`;
    details.appendChild(cardNumberCell);

    const amountCell = document.createElement("td");
    amountCell.textContent = `$${transaction.Amount}`;
    details.appendChild(amountCell);

    return details;
}



function createPaymentBarChart(selectedMonth)
{
    let currentMonth = (selectedMonth - 1 + 12) % 12; // the selected month
    let lastMonth = (currentMonth - 1 + 12) % 12; // last month (previous)
    let previousMonth = (currentMonth - 2 + 12) % 12; // last last month (second previous)

    const paymentData = [0, 0, 0]; // initialize array for previous, last, and current month payments
    if (user_transactions && user_transactions.length > 0)
    {
        user_transactions.forEach(transaction => {
            const [day, month, year] = transaction.Date.split('/').map(Number); // Split and convert to numbers

            if (month - 1 === currentMonth) {
                paymentData[2] += parseFloat(transaction.Amount); // Current month
            } else if (month - 1 === lastMonth) {
                paymentData[1] += parseFloat(transaction.Amount); // Last month (previous)
            } else if (month - 1 === previousMonth) {
                paymentData[0] += parseFloat(transaction.Amount); // Previous previous month (second previous)
            }
        });
    }

    const ctx = document.getElementById('paymentBarChart').getContext('2d');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [monthNames[previousMonth], monthNames[lastMonth], monthNames[currentMonth]], // Ensure correct order
            datasets: [{
                label: 'Payments',
                data: paymentData,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
                borderColor: ['#FF5733', '#33FF57', '#3357FF'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'top',
                    font: {
                        weight: 'bold'
                    },
                    formatter: function (value) {
                        return value.toFixed(2); // Format value with 2 decimal places
                    }
                }
            }
        }
    });
}


// function to create a Pie Chart for payments by category in the selected month
function createCategoryPieChart(filteredTransactions) {
    let categoryData = {};
    filteredTransactions.forEach(transaction => {
        if (categoryData[transaction.Category]) {
            categoryData[transaction.Category] += parseFloat(transaction.Amount);
        } else {
            categoryData[transaction.Category] = parseFloat(transaction.Amount);
        }
    });

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    const ctx = document.getElementById('categoryPieChart').getContext('2d');
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFDB33', '#FF7F33'],
            }]
        },
        options: {
            responsive: true,
        }
    });
}


// function to create a Doughnut Chart for expenses across months in 2024
function createDoughnutChart() {
    const paymentData = new Array(12).fill(0); // initialize array for payments (12 months)

    if (user_transactions && user_transactions.length > 0) {
        // save transactions into paymentData by month
        for (let i = 0; i < user_transactions.length; i++)
        {
            const transaction = user_transactions[i];
            const [day, month, year] = transaction.Date.split('/').map(Number); // Split and convert to numbers
            if (year === 2024) {
                paymentData[month - 1] += parseFloat(transaction.Amount);
            }
        }
    }
    const ctx = document.getElementById('paymentDoughnutChart').getContext('2d');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // initialize the doughnut chart
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: monthNames, 
            datasets: [{
                label: 'Monthly Expenses (2024)',
                data: paymentData, // use total payment data for each month
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#9B59B6', '#F1C40F',
                    '#1ABC9C', '#2ECC71', '#E74C3C', '#8E44AD', '#34495E', '#16A085'
                ], // Customize these colors
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return ` $${tooltipItem.raw.toFixed(2)} Expenses`; // Formatting tooltip value
                        }
                    }
                }
            }
        }
    });
}




// Event listener for 'month-dropdown' list when a month is selected from the dropdownlist
document.getElementById("month-dropdown").addEventListener("change", function (event) {
    const selectedMonthOption = event.target.selectedOptions[0];
    const selectedMonth = parseInt(selectedMonthOption.getAttribute("data-month")); // Month (1-based)
    const selectedYear = parseInt(selectedMonthOption.getAttribute("data-year")); // Year
    console.log("Month Selected:", selectedMonth, selectedYear);

    // get the selected card number from the credit card dropdown
    const selectedCardDropdown = document.getElementById("credit-card-dropdown");
    const selectedCardOption = selectedCardDropdown.selectedOptions[0];
    const selectedCardNumber = selectedCardOption ? selectedCardOption.getAttribute("data-card-number") : null;

    if (selectedMonth && selectedYear) {
        filterTransactions(selectedMonth, selectedYear, selectedCardNumber); // Filter by month, year, and selected card number
    }
});

// Event listener for 'credit-card-dropdown' when a card is selected from the dropdownlist
document.getElementById("credit-card-dropdown").addEventListener("change", function (event) {
    const selectedOption = event.target.selectedOptions[0];
    console.log(selectedOption);
    const cardNumber = selectedOption.getAttribute("data-card-number"); // get the full card number
    console.log("Card Number Selected:", cardNumber || "All Cards");

    const selectedMonthOption = document.getElementById("month-dropdown").selectedOptions[0];
    const selectedMonth = parseInt(selectedMonthOption.getAttribute("data-month")); // Month (1-based)
    const selectedYear = parseInt(selectedMonthOption.getAttribute("data-year")); // Year

    if (selectedMonth && selectedYear) {
        // if no card is selected or "All Cards" is selected, we pass `null` or filter without a specific card
        filterTransactions(selectedMonth, selectedYear, cardNumber);
    }
});

// filter by card number and month
function filterByCardNumberAndMonth(transactions, month, year, cardNumber) {
    return transactions.filter(transaction => {
        const [day, transactionMonth, transactionYear] = transaction.Date.split('/').map(Number);
        return (
            transactionMonth === month &&
            transactionYear === year &&
            transaction.cardNumber === cardNumber
        );
    });
}

// filter only by month (without card number)
function filterByMonth(transactions, month, year) {
    return transactions.filter(transaction => {
        const [day, transactionMonth, transactionYear] = transaction.Date.split('/').map(Number);
        return transactionMonth === month && transactionYear === year;
    });
}


// function to filter transactions by month, year, and card number
function filterTransactions(month, year, cardNumber)
{
    let filteredTransactions;
    let for_pie_filteredTransactions;
    let allTransactions = user_transactions
    let totalAmount = 0;
    let selected_month_transactions = filterByMonth(allTransactions, month, year);

    for (let transaction of selected_month_transactions) {
        totalAmount += parseFloat(transaction.Amount);
    }
    document.getElementById("total-amount").innerText = `Total Amount: $${totalAmount}`;

    // filter only by month
    if (cardNumber === '0' || cardNumber === null)
    {
        for_pie_filteredTransactions = filteredTransactions; // Use the same filtered data for pie chart
        displayTransactionsWithoutCardNumber(selected_month_transactions);
    }
    // filter by card number and month
    else {

        filteredTransactions = filterByCardNumberAndMonth(allTransactions, month, year, cardNumber);
        for_pie_filteredTransactions = filterByMonth(allTransactions, month, year);
        displayTransactionswithCardNumber(filteredTransactions, cardNumber);
    }

    // Destroy existing charts to refresh data
    if (paymentBarChart instanceof Chart) {
        paymentBarChart.destroy();
    }
    if (categoryPieChart instanceof Chart) {
        categoryPieChart.destroy();
    }
    if (paymentDoughnutChart instanceof Chart) {
        paymentDoughnutChart.destroy();
    }
    paymentBarChart = createPaymentBarChart(month, year, cardNumber);
    categoryPieChart = createCategoryPieChart(selected_month_transactions);
}
paymentDoughnutChart = createDoughnutChart(); //DoughnutChart create one time only (we didnt update him)



window.onload = function () {
    generateMonthOptions();
    generateCreditCardOptions();
};