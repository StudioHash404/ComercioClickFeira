document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const toggleButtons = document.querySelectorAll('.toggle-password');
    const errorMessages = document.querySelectorAll('.error-message');

    // Alternar visibilidade da senha para ambos os campos
    toggleButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const passwordField = this.closest('.password-field');
            const input = passwordField.querySelector('input');
            const eyeOpen = passwordField.querySelector('.eye-open');
            const eyeClosed = passwordField.querySelector('.eye-closed');

            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            if (type === 'text') {
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    });

    // Validação do formulário
    form.addEventListener('submit', function(e) {
        let valid = true;

        // Resetar estados de erro
        errorMessages.forEach(function(msg) {
            msg.style.display = 'none';
        });
        document.querySelectorAll('.form-group input').forEach(function(input) {
            input.classList.remove('error');
        });

        // Validar senha
        if (passwordInput.value.length < 6) {
            valid = false;
            passwordInput.classList.add('error');
            passwordInput.closest('.form-group').querySelector('.error-message').style.display = 'block';
        }

        // Validar confirmação de senha
        if (confirmPasswordInput.value !== passwordInput.value) {
            valid = false;
            confirmPasswordInput.classList.add('error');
            confirmPasswordInput.closest('.form-group').querySelector('.error-message').style.display = 'block';
        }

        // Validar termos
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            valid = false;
            alert('Você precisa aceitar os Termos e Condições para se cadastrar.');
        }

        if (!valid) {
            e.preventDefault();
        }
    });
});