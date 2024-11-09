// Function to check if the username is unique
async function isUsernameUnique(username) {
    try {
        const response = await fetch('check_username.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        // Ensure response is valid JSON
        const resultText = await response.text();
        
        try {
            const result = JSON.parse(resultText);
            return result.isUnique;
        } catch (error) {
            console.error('Response is not valid JSON:', resultText);
            return false;
        }
    } catch (error) {
        console.error('Error checking username uniqueness:', error);
        return false;
    }
}



// Function to check if the email is unique
async function isEmailUnique(email) {
    try {
        // Send a POST request to 'check_email.php' with the email
        const response = await fetch('check_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })  // Send the email as JSON
        });

        const result = await response.json();
        return result.isUnique;  // Expecting { isUnique: true/false }
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        return false;  // Return false in case of an error
    }
}

// Function to save data after validation
async function saveDataToDatabase(event) {
    event.preventDefault();  // Prevent form submission
    console.log("saveDataToDatabase triggered");

    // Get values from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const buttonName = document.getElementById('RegisterButton');

    // Validate that passwords match
    if (password !== confirmPassword) {
        document.getElementById('error-password').style.display = 'block';
        document.getElementById('error-password').innerText = "Passwords do not match!";
        return;  // Exit early if passwords don't match
    } else {
        document.getElementById('error-password').style.display = 'none';  // Hide error if passwords match
    }

    // Validate username uniqueness
    const isUniqueUsername = await isUsernameUnique(username);
    if (!isUniqueUsername) {
        document.getElementById('error-username').style.display = 'block';
        document.getElementById('error-username').innerText = "Username is already taken.";
        return;
    } else {
        document.getElementById('error-username').style.display = 'none';  // Hide error if username is unique
    }

    // Validate email uniqueness
    const isUniqueEmail = await isEmailUnique(email);
    if (!isUniqueEmail) {
        document.getElementById('error-email').style.display = 'block';
        document.getElementById('error-email').innerText = "Email is already taken.";
        return;
    } else {
        document.getElementById('error-email').style.display = 'none';  // Hide error if email is unique
    }

    // If all validations pass, proceed to send data to the server
    const data = { username, email, password };

    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            buttonName.innerText = "Thank you for registering";
            setTimeout(() => {
                window.location.href = 'Login_page.html';
            }, 1500);
        } else {
            alert('Error saving data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving data');
    }
}