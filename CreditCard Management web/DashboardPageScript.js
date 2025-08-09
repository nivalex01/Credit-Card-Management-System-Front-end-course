// check if the user is logged in
function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}



// get the list of users and the user_transactions from the local storage
let list_of_users = JSON.parse(localStorage.getItem("listOfUsers")) || [];
let user_transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// function that catch the current date and time and show them on 'current-date-time' <p>.
function usertimemsg() {
    let currentDate = new Date();
    let curr_year = currentDate.getFullYear();
    let curr_month = currentDate.getMonth() + 1;
    let curr_day = currentDate.getDate();
    let curr_hour = currentDate.getHours();
    let curr_minute = currentDate.getMinutes();
    let curr_second = currentDate.getSeconds();
    curr_day = curr_day < 10 ? '0' + curr_day : curr_day; // if day<10 add leading zero (for eaxample 9 ---> 09) 
    curr_month = curr_month < 10 ? '0' + curr_month : curr_month;
    curr_minute = curr_minute < 10 ? '0' + curr_minute : curr_minute;
    curr_second = curr_second < 10 ? '0' + curr_second : curr_second;
    let timeString = `${curr_hour}:${curr_minute}:${curr_second}`;
    let dateTimeString = `Your connection was at: ${timeString} on ${curr_day}-${curr_month}-${curr_year}`;
    document.getElementById('current-date-time').textContent = dateTimeString; 
}

// function that catch the user email from the loggedInUser_array (that saved in local storage) and show it on user-email <span>
function displayUserGreeting() {
    let loggedInUser_json = localStorage.getItem("loggedInUser");
    let loggedInUser_array = JSON.parse(loggedInUser_json);
    document.getElementById('user-email').textContent = loggedInUser_array[0].email;
}

// function to calculate the previous month bill (for example: january bill) and show it on previous-month-bill <p>
function getPreviousMonthBill()
{
    if (!user_transactions || user_transactions.length === 0) {
        document.getElementById('previous-month-bill').textContent = "No transactions available for the previous month.";
        return false;
    }

    let currentDate = new Date();
    let lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    let lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
    let lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);

    // help function definition for filtering transactions
    function filterTransactions(transaction) {
        let transactionDate = new Date(transaction.Date.split('/').reverse().join('/')); // parse date correctly in DD/MM/YYYY format
        if (transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd)
            return transactionDate;
    }

    // filter all the transactions of the last month -- array comes back
    let previousMonthTransactions = user_transactions.filter(filterTransactions);

    // check if there are any transactions in the previous month
    if (previousMonthTransactions.length === 0) {
        document.getElementById('previous-month-bill').textContent = "No transactions available for the previous month.";
        return false;
    }

    // sum up the amounts from the filtered transactions
    let previousBillAmount = 0;
    for (let transaction of previousMonthTransactions)
    {
        previousBillAmount += parseFloat(transaction.Amount);
    }

    // update the <p> with the previous bill amount
    document.getElementById('previous-month-bill').textContent = `$${previousBillAmount}`;
}

// function to calculate the upcoming month bill (for examle: march bill) and show it on future-bill-amount <p>
function getUpcomingMonthBill()
{
    if (!user_transactions || user_transactions.length === 0) {
        document.getElementById('future-bill-amount').textContent = "No transactions available for the upcoming month.";
        return false;
    }

    let currentDate = new Date();
    let nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    let nextMonthStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    let nextMonthEnd = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

    function filterUpcomingTransactions(transaction) {
        let transactionDate = new Date(transaction.Date.split('/').reverse().join('/')); // Parse date in YYYY/MM/DD format
        return transactionDate >= nextMonthStart && transactionDate <= nextMonthEnd;
    }

    let upcomingMonthTransactions = user_transactions.filter(filterUpcomingTransactions);

    // check if there are any transactions in the upcoming month
    if (upcomingMonthTransactions.length === 0) {
        document.getElementById('future-bill-amount').textContent = "No transactions available for the upcoming month.";
        return false;
    }

    // sum up the amounts from the filtered transactions
    let upcomingBillAmount = 0;
    for (let transaction of upcomingMonthTransactions) {
        upcomingBillAmount += parseFloat(transaction.Amount);
    }

    // update the <p> with the upcoming bill amount
    document.getElementById('future-bill-amount').textContent = `$${upcomingBillAmount}`;
}

// function to calculate the previous transaction bill (the last transaction) and show it on previous-bill <p>
function getPreviousTransactionBill()
{
    if (!user_transactions || user_transactions.length === 0) {
        document.getElementById('previous-bill').textContent = "No transactions for the previous month";
        return false;
    }

    let currentDate = new Date();
    let lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    // filter all the transactions of the last month
    let previousMonthTransactions = user_transactions.filter(transaction => {
        let transactionDate = new Date(transaction.Date.split('/').reverse().join('/')); // Reversing for correct Date parsing
        return transactionDate.getMonth() === lastMonth.getMonth() && transactionDate.getFullYear() === lastMonth.getFullYear();
    });

    // check if there are any transactions in the previous month
    if (previousMonthTransactions.length === 0) {
        document.getElementById('previous-bill').textContent = "No transactions for the previous month";
        return;
    }

    // sort transactions in descending order to get the latest one
    previousMonthTransactions.sort((a, b) => new Date(b.Date.split('/').reverse().join('/')) - new Date(a.Date.split('/').reverse().join('/')));

    // get the most recent transaction (its in the first place in previousMonthTransactions array )
    let lastTransaction = previousMonthTransactions[0];

    // function to format date to day/month/year
    function formatDate(dateStr) {
        let date = new Date(dateStr.split('/').reverse().join('/'));
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    document.getElementById('previous-bill').textContent = `Last Transaction: $${lastTransaction.Amount}`;
    document.getElementById('previous-bill-details').textContent = `Business: ${lastTransaction.BusinessName} on ${formatDate(lastTransaction.Date)}`;
}

// function to calculate the upcoming transaction bill (the next transaction) and show it on future-bill <p>
function getUpcomingTransactionBill() {
    if (user_transactions === null || user_transactions.length === 0) {
        document.getElementById('future-bill').textContent = "No transactions available.";
        return false;
    }

    let currentDate = new Date();

    // filter transactions dates after the current date
    let upcomingTransactions = user_transactions.filter(transaction => {
        let transactionDate = new Date(transaction.Date.split('/').reverse().join('/')); 
        return transactionDate > currentDate; // check if transaction date is in the future
    });

    // check if there are any upcoming transactions
    if (upcomingTransactions.length === 0) {
        document.getElementById('future-bill').textContent = "No upcoming transactions.";
        return false;
    }
    // sort transactions in ascending order to get the earliest one
    sortedupcomingTransactions = upcomingTransactions.sort((a, b) => {
        let dateA = new Date(a.Date.split('/').reverse().join('/'));
        let dateB = new Date(b.Date.split('/').reverse().join('/'));
        return dateA - dateB;
    });

    // get the earliest upcoming transaction
    let nextTransaction = sortedupcomingTransactions[0];

    // function to format date to day/month/year
    function formatDate(dateStr) {
        let date = new Date(dateStr.split('/').reverse().join('/'));
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    document.getElementById('future-bill').textContent = `Upcoming Transaction: $${nextTransaction.Amount}`;
    document.getElementById('future-bill-details').textContent = `Business: ${nextTransaction.BusinessName} on ${formatDate(nextTransaction.Date)}`;
}


function BirthdayCoupon() {

    let list_of_users = JSON.parse(localStorage.getItem("listOfUsers")) || [];
    let loggedInUser_array = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    let user_email = loggedInUser_array[0].email;
    let user = null;
    for (let i = 0; i < list_of_users.length; i++)
    {
        console.log(list_of_users[i].email)
        if (list_of_users[i].email === user_email) {
            user = list_of_users[i];
            break;
        }
    }
    let userBirthday = new Date(user.birthDate);
    let today = new Date();

    // checking if today is the user BirthDay
    if (userBirthday.getDate() === today.getDate() && userBirthday.getMonth() === today.getMonth())
    {
        // check if the coupon has already used in the past
        let isCouponUsed = localStorage.getItem("birthdayCouponUsed");
        if (isCouponUsed === "true") {
            document.getElementById('birthday-coupon').textContent = "You already used your birthday coupon!";
            return;
        }

        // display "Claim Birthday Coupon" button
        let couponText = document.createElement("span");
        couponText.id = "load-birthday-coupon";
        couponText.textContent = "Claim Birthday Coupon";
        couponText.style.cursor = "pointer";

        // Event listener to add the $50 credit
        couponText.addEventListener("click", () => {
            user_transactions.push({
                    Date: `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`,
                    BusinessName: "Birthday Coupon",
                    Category: "Birthday",
                    Amount: -50, // Negative for a credit (we give 50 sheles to the user, so he need to pay 50 less)
                    cardNumber: user.creditCards[0].number}
            );

            // Update local storage
            localStorage.setItem("transactions", JSON.stringify(user_transactions));
            localStorage.setItem("birthdayCouponUsed", "true");

            // Update user message
            document.getElementById('birthday-coupon').textContent = "Your birthday coupon has been successfully claimed!";
        });

        document.getElementById('birthday-coupon').appendChild(couponText);
    }
    else {
        document.getElementById('birthday-coupon').textContent = "The birthday coupon is not available today.";
    }
}

// activate all the functions
checkIfLoggedIn();
displayUserGreeting();
usertimemsg();
getUpcomingTransactionBill();
getPreviousTransactionBill()
getPreviousMonthBill();
getUpcomingMonthBill();
BirthdayCoupon();