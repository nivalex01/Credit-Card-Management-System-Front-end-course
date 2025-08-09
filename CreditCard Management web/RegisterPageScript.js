// set the current listOfUsers to localStorage
if (!localStorage.getItem("listOfUsers")) {
    localStorage.setItem("listOfUsers", JSON.stringify([]));
}

// main function of this js - check if submission pass successfully
function CheckSubmission() {
    let email = document.getElementById("Email").value;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // valid email regex
    let password = document.getElementById("Password").value;
    let passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&()])[A-Za-z\d!@#$%^&()]{8}$/; // valid password regex

    // email validation
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email.");
        return false;
    }

    // password validation
    if (!password.match(passwordPattern)) {
        alert("Password must meet the criteria.");
        return false;
    }

    // birthdate validation
    let birthDate = document.getElementById("BirthDate").value;
    let birthDateObj = new Date(birthDate);
    let today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    let m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    if (age < 16) {
        alert("You must be at least 16 years old.");
        return false;
    }

    // credit card number validation
    let creditCardNumber = document.getElementById("CreditCardNumber").value;
    let creditCardPattern = /^\d{16}$/; //credit card regex
    if (!creditCardNumber.match(creditCardPattern)) {
        alert("Credit card number must be exactly 16 digits.");
        return false;
    }

    // expiration date validation
    let expirationDate = document.getElementById("expiration date").value;
    let expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!expirationDate.match(expirationDatePattern)) {
        alert("Expiration date must be in the format MM/YY.");
        return false;
    }
    let [expMonth, expYear] = expirationDate.split("/").map(Number);
    expYear += 2000; // convert YY to YYYY
    let expDate = new Date(expYear, expMonth - 1, 1);
    if (expDate < today) {
        alert("Expiration date cannot be in the past.");
        return false;
    }

    // get the users from localStorage
    let listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
    let existingUser = listOfUsers.find(user => user.email === email);

    if (existingUser) {
        // user exists, add new card
        existingUser.creditCards.push({
            number: creditCardNumber,
            expirationDate: expirationDate
        });
        alert("Card added successfully!");
    }
    else {
        // create new user
        let newUser = {
            email: email,
            password: password,
            birthDate: birthDate,
            creditCards: [{
                number: creditCardNumber,
                expirationDate: expirationDate
            }]
        };
        listOfUsers.push(newUser); // push the user object to listOfUsers array
        alert("User and card added successfully!");
    }

    localStorage.setItem("listOfUsers", JSON.stringify(listOfUsers)); // sent the listOfUsers array to localStorage as json
    window.location.href = "DashboardPage.html"; // refer to DashboardPage.html
}