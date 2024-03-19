// Constante para establecer el formulario de inicio de sesión, olvidaste contraseña paso 1,2 y 3.
const MAIN_TITLE = document.getElementById('mainTitle');
const LOGIN_FORM = document.getElementById('loginForm');
const FORGOT_PASSWORD_FORM = document.getElementById('password1');
const FORGOT_PASSWORD_STEP_TWO_FORM = document.getElementById('password2');
const FORGOT_PASSWORD_STEP_THREE_FORM = document.getElementById('password3');
const REGISTRO_FORM = document.getElementById('registro');

document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
});

function Registro() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    REGISTRO_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Registro de Usuario';
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

function handleLoginFormSubmission(event) {
    event.preventDefault(); // Evita la recarga de la página por defecto
}

//Funcion de mostrar la dashboard
function showInicio()
{
    location.href = '/vistas/publico/index.html';
}

