// Constante para establecer el formulario de inicio de sesión, olvidaste contraseña paso 1,2 y 3.
const MAIN_TITLE = document.getElementById('mainTitle');
const LOGIN_FORM = document.getElementById('loginForm');
const PASSWORD1_FORM = document.getElementById('password1');
const PASSWORD2_FORM = document.getElementById('password2');
const PASSWORD3_FORM = document.getElementById('password3');
const REGISTRO_FORM = document.getElementById('registro');

document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
});

function Registro() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    REGISTRO_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Registro de Usuario';
}

function showPass1() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM.classList.add('d-none');
    PASSWORD1_FORM.classList.remove('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    REGISTRO_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showPass2() {
    // Se oculta el formulario para iniciar sesión y paso 1, 3
    LOGIN_FORM.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.remove('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    REGISTRO_FORM.classList.add('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showPass3() {
    // Se oculta el formulario para iniciar sesión y paso 1, 2
    LOGIN_FORM.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.remove('d-none');
    REGISTRO_FORM.classList.add('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showLogIn() {
    // Se oculta el formulario para iniciar sesión y paso 1, 2
    LOGIN_FORM.classList.remove('d-none');
    REGISTRO_FORM.classList.add('d-none');
    // Se muestra el formulario de recuperación de contraseña (paso 3).
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



