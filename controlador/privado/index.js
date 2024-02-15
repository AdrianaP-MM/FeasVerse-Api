// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('loginForm');

document.addEventListener('DOMContentLoaded', async () => {
    
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');

    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Inicio de sesión';
});