// funtction that return the listOfUsers from local storage
function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("listOfUsers")) || [];
}

// function the return the logged-in users list from local storage
function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser")) || [];
}

// main function in this part - check if login porcess pass successfully
function checkLogin()
{
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;

    if (email === "" || password === "") {
        alert("Please fill both the email and password inputs");
        return false;
    }

    let users_array = getUsersFromLocalStorage();
    let user = null;

    // check if there is a user with this email and password in users_array (that comes from local storage)
    for (let i = 0; i < users_array.length; i++) {
        if (users_array[i].email === email && users_array[i].password === password) {
            user = users_array[i];
            break;
        }
    }

    // we found a matching user in our array
    if (user != null)
    {
        alert("Login successful!");
        let loggedInUser = [];
        // create new loggedinuser object and add him to loggedInUser in local storage
        let loggedUser = { email: email };
        loggedInUser.push(loggedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); // send as json to local storage
        window.location.href = "DashboardPage.html";
    }
    else {
        alert("Invalid email or password!");
    }
}