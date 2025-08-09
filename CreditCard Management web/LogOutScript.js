function logoutUser() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("transactions");
    window.location.href = "LoginPage.html";
}