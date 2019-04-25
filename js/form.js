$(document).ready(function () {

    isLoggedIn();

    $('#go-signin').click(() => {
        $('.signup').css('display', 'none');
        $('.signin').css('display', 'unset');
    });

    $('#go-signup').click(() => {
        $('.signin').css('display', 'none');
        $('.signup').css('display', 'unset');
    });

    $('#signup').submit((e) => {
        e.preventDefault();
        signup();
        $('#signup')[0].reset();
    })

    $('#signin').submit((e) => {
        e.preventDefault();
        signin();
        $('#signin')[0].reset();
    });

    function isLoggedIn() {
        $.get('../../php/isLoggedIn.php', function (res) {
            if (res == "01") {
                window.location = '../../index.html'
            } else {
                return;
            }
        });
    }

    function signup() {
        let signupData = {
            name: $('#name-signup').val(),
            username: $('#username-signup').val(),
            password: $('#password-signup').val()
        }

        $.post('../../php/signup.php', signupData, function (res) {
            console.log(res);
            if (res == 1) {
                swal("¡Oh Yeah!", "Now you're registered, Sign In Now! :D", 'success').then(() => {
                    window.location = './signin.html';
                });
            } else if (res == 2) {
                swal("¡Oh no!", "¡The username already exists, Sorry!", 'error');
            } else {
                swal("¡Oh no!", "Something is wrong in the Sign Up", 'error');
            }
        });
    }

    function signin() {
        let signinData = {
            username: $('#username-signin').val(),
            password: $('#password-signin').val()
        };

        $.post('../../php/signin.php', signinData, function (res) {
            console.log(res);

            if (res == 1) {
                swal('¡Welcome!', {
                    icon: 'success'
                }).then(() => {
                    window.location = '../../index.html';
                });
            } else if (res == 0) {
                swal("¡Oh no!", "Username or Password Incorrect", 'error');
            }
        });
    }
});