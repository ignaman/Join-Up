function validateUser() {
    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;
    const errorDisplay = document.getElementById("error-password-username");
    const button = document.getElementById('LoginButton');
    fetch('/validate-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameOrEmail, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            button.innerText = 'Successfully logged in';
            setTimeout(() => {
                window.location.href = 'Main_page.html';
                button.innerText = 'Login';

            }, 1000);


        } else {
            errorDisplay.style.display = 'block'; // Show error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
