//* Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'FeasVerse - Admin';
const MAIN_TITLE = document.getElementById('mainTitle');

// Constante para establecer el formulario de inicio de sesión, olvidaste contraseña paso 1,2 y 3.
const LOGIN_FORM = document.getElementById('loginForm');
const FORGOT_PASSWORD_FORM = document.getElementById('forgetpasswordstepone');
const FORGOT_PASSWORD_STEP_TWO_FORM = document.getElementById('forgetpasswordsteptwo');
const FORGOT_PASSWORD_STEP_THREE_FORM = document.getElementById('forgetPasswordStepThree');

document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE';
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
});

function showLoginForm() {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Inicio de sesión';
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2 y 3).
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
}

function showForgotPasswordForm() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    FORGOT_PASSWORD_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showForgotPasswordStepTwoForm() {
    // Se oculta el formulario para iniciar sesión y paso 1, 3
    LOGIN_FORM.classList.add('d-none');
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
    // Se muestra el formulario de recuperación de contraseña (paso 2).
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showForgotPasswordStepThreeForm() {
    // Se oculta el formulario para iniciar sesión y paso 1, 2
    LOGIN_FORM.classList.add('d-none');
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    // Se muestra el formulario de recuperación de contraseña (paso 3).
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

//Funcion de mostrar la dashboard
function showDashboard()
{
    location.href = '/vistas/privado/panel_principal.html';
}