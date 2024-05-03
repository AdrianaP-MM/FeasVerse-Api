// Se establece el título de la página web.
document.querySelector('title').textContent = 'FeasVerse - Admin';
const MAIN_TITLE = document.getElementById('mainTitle');

// Constante para establecer el formulario de inicio de sesión, olvidaste contraseña paso 1,2 y 3.
const LOGIN_FORM = document.getElementById('loginForm');
const FORGOT_PASSWORD_FORM = document.getElementById('forgetpasswordstepone');
const FORGOT_PASSWORD_STEP_TWO_FORM = document.getElementById('forgetpasswordsteptwo');
const FORGOT_PASSWORD_STEP_THREE_FORM = document.getElementById('forgetPasswordStepThree');

document.addEventListener('DOMContentLoaded', async () => {
    
    loadTemplate();

    const DATA = await fetchData(USER_API, 'getUser');


    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'panel_principal.html';
    } else {
        // Se establece el título del contenido principal.
        MAIN_TITLE.textContent = 'FEASVERSE - Inicio de sesión';
        // Se muestra el formulario para iniciar sesión.
        LOGIN_FORM.classList.remove('d-none');
        // Se establece el título del contenido principal.
        MAIN_TITLE.textContent = 'FEASVERSE';
        // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2).
        FORGOT_PASSWORD_FORM.classList.add('d-none');
        FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    }
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

const showLoginFormRestablecer = async () => {
    await sweetAlert(1, 'Se ha restablecido la contraseña correctamente', true);
    // Se muestra el formulario para iniciar sesión.
    LOGIN_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Inicio de sesión';
    // Se oculta el formulario de restablecimiento de contraseña (paso 1 y 2 y 3).
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
}

const showForgotPasswordForm = async () => {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    FORGOT_PASSWORD_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

const showForgotPasswordStepTwoForm = async () => {
    await sweetAlert(1, 'Se ha enviado correctamente al correo electrónico', true);
    // Se oculta el formulario para iniciar sesión y paso 1, 3
    LOGIN_FORM.classList.add('d-none');
    FORGOT_PASSWORD_FORM.classList.add('d-none');
    FORGOT_PASSWORD_STEP_THREE_FORM.classList.add('d-none');
    // Se muestra el formulario de recuperación de contraseña (paso 2).
    FORGOT_PASSWORD_STEP_TWO_FORM.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

const showForgotPasswordStepThreeForm = async () => {
    await sweetAlert(1, 'Código ingresado correctamente', true);
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
const showDashboard = async () => {
    await sweetAlert(1, 'Se ha iniciado correctamente la sesión', true);
    location.href = 'panel_principal.html';
}

// Método del evento para cuando se envía el formulario de inicio de sesión.
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'panel_principal.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});