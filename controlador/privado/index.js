// Constante para establecer el formulario de registro del primer usuario.
const SIGNUP_FORM = document.getElementById('signupForm');
// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('loginForm');

document.addEventListener('DOMContentLoaded', async () => {
    
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
});