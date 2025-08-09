// check if the user is logged in
function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// remove the cardNumber property from each transaction
transactions.forEach(transaction => {
    delete transaction.cardNumber;
});

// function that send a request to the API and handle the API response
async function getRecommendations(transactions) {
    const url = "https://yael-ex-expenses-services-299199094731.me-west1.run.app/get-recommendations?lang=en&apiKay=afGre4Eerf223432AXE";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactions }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); 

        // check if recommendations exist
        if (data.recommendations && typeof data.recommendations === "string") {
            displayRecommendations(data.recommendations);
        } else {
            throw new Error("Invalid format: 'recommendations' is not a string");
        }
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
    }
}

// function that display the recommendations to the user
function displayRecommendations(recommendationsHTML) {
    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = ""; // clear previous content
    if (recommendationsHTML.trim() === "") {
        recommendationsContainer.innerHTML = "<p>No recommendations available at this time.</p>";
        return;
    }
    recommendationsContainer.innerHTML = recommendationsHTML;
}

checkIfLoggedIn();
getRecommendations(transactions);