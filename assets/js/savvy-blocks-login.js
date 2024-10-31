document.addEventListener("DOMContentLoaded", () => {
    var svError = document.getElementById('savvy-display-login-error');
    var svErrorText = document.getElementById('login_error');
    if (svError && svErrorText) {
        svError.innerHTML = '<div class="p-error">' + svErrorText.innerHTML + '</div>';
    }

    document.querySelector('#loginform #wp-submit')?.addEventListener('click', function (e) {
        var userName = document.getElementById('user_login');
        var passWord = document.getElementById('user_pass');

        if (userName.value === '' || passWord.value === '') {
            if (userName.value === '') {
                userName.classList.add('savvy_login_error');
            } else {
                userName.classList.remove('savvy_login_error');
            }

            if (passWord.value === '') {
                passWord.classList.add('savvy_login_error');
            } else {
                passWord.classList.remove('savvy_login_error');
            }

            e.preventDefault();
        } else {
            // Additional logic can be added here for a valid form submission
        }
    });

    document.querySelector('#lostpasswordform #wp-submit')?.addEventListener('click', function (e) {
        var userName = document.getElementById('user_login');
        // var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (userName.value === '') {
            userName.classList.add('savvy_login_error');
            e.preventDefault();
        } else {
            userName.classList.remove('savvy_login_error');
        }
    });

    document.querySelector('#registerform #wp-submit')?.addEventListener('click', function (e) {
        var userName = document.getElementById('user_login');
        var userEmail = document.getElementById('user_email');

        if (userName.value === '' || userEmail.value === '') {
            if (userName.value === '') {
                userName.classList.add('savvy_login_error');
            } else {
                userName.classList.remove('savvy_login_error');
            }

            if (userEmail.value === '') {
                userEmail.classList.add('savvy_login_error');
            } else {
                userEmail.classList.remove('savvy_login_error');
            }

            e.preventDefault();
        } else {
            // Additional logic can be added here for a valid form submission
        }
    });

});