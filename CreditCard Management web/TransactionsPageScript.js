// check if the user is logged in
function checkIfLoggedIn() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser == null) {
        window.location.href = "LoginPage.html";
    }
}

// call the checkIfLoggedIn function to ensure the user is logged in
checkIfLoggedIn();

// event listener for file input change
document.getElementById('file-input').addEventListener('change', function (event)
{
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the file

        reader.onload = function () {
            const csvData = reader.result; // get the file content as text
            const jsonData = csvToJson(csvData); // convert the CSV to json
            localStorage.setItem('transactions', JSON.stringify(jsonData)); // save the json to localStorage
            console.log('JSON data saved to local storage.');
            alert('Your CSV file uploaded successfully!'); 
        };

        reader.onerror = function () {
            console.error('Error reading the file.');
        };

        reader.readAsText(file); // Read the file as text
    }
    else {
        console.error('No file selected.');
    }
});


// function to convert CSV data to JSON
function csvToJson(csv) {
    const lines = csv.trim().split("\n"); // split the csv into lines
    const headers = lines[0].split(","); // get tge headers
    const result = []; // array to store the json objects

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(","); // Split the line into values
        const obj = {}; 

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = line[j] ? line[j].trim() : ""; 
        }

        result.push(obj); 
    }

    return result; // array of objects
}