// check if the user is logged in
function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}

// call the checkIfLoggedIn function to ensure the user is logged in
checkIfLoggedIn();


let savingsData = {
    goalAmount: 0,
    totalSaved: 0,
    goalTarget: ''
};
let savingsChart = null;

// load data from localStorage
function loadSavingsData() {
    const savedData = localStorage.getItem('savingsData');
    if (savedData) {
        savingsData = JSON.parse(savedData);
    }
}

// save data to localStorage
function saveSavingsData() {
    localStorage.setItem('savingsData', JSON.stringify(savingsData));
}

// set the savings goal
function setSavingsGoal() {
    const targetInput = document.getElementById('goalTarget');
    const amountInput = document.getElementById('goalAmount');

    savingsData.goalTarget = targetInput.value.trim();
    savingsData.goalAmount = parseFloat(amountInput.value);

    if (savingsData.goalTarget && savingsData.goalAmount > 0) {
        saveSavingsData();
        alert(`Savings goal of $${savingsData.goalAmount} for ${savingsData.goalTarget} set!`);
        updateChart();
    } else {
        alert('Please enter a valid target and goal amount.');
    }
}

// log the savings
function logSavings() {
    const input = document.getElementById('savingsAmount');
    const amount = parseFloat(input.value);

    if (amount > 0) {
        savingsData.totalSaved += amount;
        saveSavingsData();
        alert(`You saved $${amount}. Total saved: $${savingsData.totalSaved}`);
        updateChart();
    } else {
        alert('Please enter a valid amount.');
    }
}

// update the chart js graph
function updateChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const percentage = (savingsData.totalSaved / savingsData.goalAmount) * 100;
    if (savingsChart) {
        savingsChart.destroy();
    }

    // create a new chart
    savingsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Saved', 'Remaining'],
            datasets: [{
                label: 'Savings Progress',
                data: [savingsData.totalSaved, Math.max(0, savingsData.goalAmount - savingsData.totalSaved)],
                backgroundColor: ['#4caf50', '#f44336'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const value = tooltipItem.raw;
                            return `$${value}`;
                        }
                    }
                }
            }
        }
    });

    const summary = document.getElementById('progressSummary');
    summary.textContent = `You have saved $${savingsData.totalSaved} out of your goal of $${savingsData.goalAmount} (${percentage.toFixed(2)}% complete) for "${savingsData.goalTarget}".`;
}

window.onload = function ()
{
    loadSavingsData();
    let targetInput = document.getElementById('goalTarget');
    let amountInput = document.getElementById('goalAmount');

    if (savingsData.goalTarget) {
        targetInput.value = savingsData.goalTarget;
    }

    if (savingsData.goalAmount > 0) {
        amountInput.value = savingsData.goalAmount;
    }

    updateChart();
}
