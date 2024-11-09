document.addEventListener("DOMContentLoaded", () => {
    // Attach event listener to the form submission
    document.getElementById("loginForm").addEventListener("submit", validateUser);
});

async function validateUser(event) {
    event.preventDefault(); // Prevent form submission (page reload)

    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;
    const errorDisplay = document.getElementById("error-password-username");
    const button = document.getElementById("LoginButton");

    // Reset previous error display
    errorDisplay.style.display = 'none';
    button.innerText = 'Logging in...';

    try {
        const response = await fetch('http://localhost/Join-Up/public/validate_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.valid) {
            button.innerText = 'Successfully logged in';
            setTimeout(() => {
                window.location.href = 'Main_page.html';
            }, 1000);
        } else {
            errorDisplay.style.display = 'block';
            errorDisplay.innerText = 'Invalid username or password';
            button.innerText = 'Login';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorDisplay.style.display = 'block';
        errorDisplay.innerText = 'An error occurred. Please try again later.';
        button.innerText = 'Login';
    }
}
