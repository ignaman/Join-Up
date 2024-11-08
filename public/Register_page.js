async function isUsernameUnique(username) {
    try {
        const response = await fetch('/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const result = await response.json();
        return result.isUnique;
    } catch (error) {
        console.error('Error checking username uniqueness:', error);
        return false;
    }
}

async function isEmailUnique(email) {

    try {
        const response = await fetch('/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        return result.isUnique;
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        return false;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorPassword = document.getElementById('error-password');

    function checkPasswordsMatch() {
        if (password.value.trim() !== '' && confirmPassword.value.trim() !== '') {
            if (password.value !== confirmPassword.value) {
                errorPassword.style.display = 'block';
            } else {
                errorPassword.style.display = 'none';
            }
        } else {
            errorPassword.style.display = 'none';
        }
    }

    password.addEventListener('input', checkPasswordsMatch);
    confirmPassword.addEventListener('input', checkPasswordsMatch);
});

async function SavaDatasToDataBase() {
    event.preventDefault();
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const ErrorUsername = document.getElementById('error-username');
    const isUniqueEmail = await isEmailUnique(email.value);
    const ErrorEmail = document.getElementById('error-email');

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const isUniqueUsername = await isUsernameUnique(username.value);
    const buttonName = document.getElementById('RegisterButton');


    if (!isUniqueUsername && username.value !== '') {
        ErrorUsername.style.display = 'block';
        return;
    } else {
        ErrorUsername.style.display = 'none';
    }

    if (!isUniqueEmail && email.value !== '') {
        ErrorEmail.style.display = 'block';
        return;
    } else {
        ErrorEmail.style.display = 'none';
    }



    if ( isUniqueEmail && email.value !== '' && isUniqueUsername && username.value !== '' && password.value === confirmPassword.value && password.value !== '' && confirmPassword.value !== '') {
        const data = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        try {
            const response = await fetch('/save-data', {
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

        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        username.value = '';
    }
}