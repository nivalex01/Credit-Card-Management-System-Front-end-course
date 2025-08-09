// function to get the list of users from localStorage
function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("listOfUsers"));
}

// function to add a new card
function addNewCard() {
    let creditCardNumber = document.getElementById("CreditCardNumber").value;
    let expirationDate = document.getElementById("ExpirationDate").value;

    // validate card number with regex
    let creditCardPattern = /^\d{16}$/;
    if (!creditCardNumber.match(creditCardPattern)) {
        alert("Credit card number must be exactly 16 digits.");
        return false;
    }

    // validate expiration date
    let expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDate.match(expirationDatePattern)) {
        alert("Expiration date must be in the format MM/YY.");
        return false;
    }

    // check if expiration date is in the future
    let [expMonth, expYear] = expirationDate.split("/").map(Number);
    expYear += 2000; // Convert YY to YYYY
    let expDate = new Date(expYear, expMonth - 1, 1);
    let today = new Date();
    if (expDate < today) {
        alert("Expiration date cannot be in the past.");
        return false;
    }

    // get the current user email from logged-in array in local storage
    let emailArray = JSON.parse(localStorage.getItem("loggedInUser"));
    let email = emailArray[0].email; // get the first item (the email on the user) in logged-in array
    console.log(email);
    let listOfUsers = getUsersFromLocalStorage();
    let currentUser = null;
    for (let i = 0; i < listOfUsers.length; i++) {
        if (listOfUsers[i].email === email) {
            currentUser = listOfUsers[i];
            break;
        }
    }

    if (currentUser != null) {
        // add new card to user's card list
        currentUser.creditCards.push({
            number: creditCardNumber,
            expirationDate: expirationDate
        });
        localStorage.setItem("listOfUsers", JSON.stringify(listOfUsers));
        alert("Card added successfully!");
        window.location.href = "DashboardPage.html";
    }
    else {
        alert("User not found. Please log in again.");
        window.location.href = "LoginPage.html";
    }
}


function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}
checkIfLoggedIn();