// Constante para establecer el formulario de inicio de sesión, olvidaste contraseña paso 1,2 y 3.

const LOGIN_FORM_DIV = document.getElementById('login');
const LOGIN_FORM = document.getElementById('loginForm');
const REGISTRO_FORM = document.getElementById('registroForm');
const PASSWORD1_FORM = document.getElementById('password1');
const PASSWORD2_FORM = document.getElementById('password2');
const PASSWORD3_FORM = document.getElementById('password3');
const REGISTRO_FORM_DIV = document.getElementById('registro');

const INPUTDATENOW = document.getElementById('fecharInput');



document.addEventListener('DOMContentLoaded', async () => {
    // Se muestra el formulario para iniciar sesión.
    INPUTDATENOW.readOnly = true;
    llenarFechaActual();
    LOGIN_FORM_DIV.classList.remove('d-none');

    const TODAY = new Date();

    let day = ('0' + TODAY.getDate()).slice(-2);
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    let month = ('0' + (TODAY.getMonth() + 1)).slice(-2);
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = TODAY.getFullYear() - 18;
    // Se declara e inicializa una variable para establecer el formato de la fecha.
    const DATE = `${year}-${month}-${day}`;
    // Se asigna la fecha como valor máximo en el campo del formulario.
    document.getElementById('fechanInput').max = DATE;
});


// Agrega el listener para el formulario de registro
REGISTRO_FORM.addEventListener('submit', async(event)  => {
    event.preventDefault();


    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombreInput').value.trim();
    const apellidos = document.getElementById('apellidosInput').value.trim();
    const dui = document.getElementById('duiInput').value.trim();
    const telefono = document.getElementById('telefonoInput').value.trim();
    const correo = document.getElementById('correoInput').value.trim();
    const fechaNacimiento = document.getElementById('fechanInput').value.trim();
    const fechaRegistro = document.getElementById('fecharInput').value.trim();
    const contrasena = document.getElementById('contraInput').value.trim();
    const confirmcontrasena = document.getElementById('confirmContraseña').value.trim();

    // Expresiones regulares para validar nombre y apellidos (solo letras y espacios)
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const apellidosRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    // Verificar que los campos no estén vacíos
    if (!nombre || !apellidos || !dui || !telefono || !correo || !fechaNacimiento || !fechaRegistro || !confirmcontrasena || !contrasena) {
        await sweetAlert(2, 'Todos los campos son obligatorios', false);
        return;
    }

    // Verificar que el nombre y apellidos solo contengan letras
    if (!nombreRegex.test(nombre) || !apellidosRegex.test(apellidos)) {
        await sweetAlert(2, 'El nombre y los apellidos solo pueden contener letras', false);
        return;
    }

    // Crear un FormData con los datos del formulario
    const form = new FormData(REGISTRO_FORM) ;

    // Llamar a la API para el registro del usuario
    const data = await fetchData(USER_API, 'signUp', form);

    // Comprobar la respuesta de la API
    if (data.status) {
        await sweetAlert(1, data.message, true);
        // Mostrar el formulario de inicio de sesión y ocultar el de registro
        LOGIN_FORM_DIV.classList.remove('d-none');
        REGISTRO_FORM_DIV.classList.add('d-none');
    } else {
        await sweetAlert(2, data.error, false);
    }
});

function llenarFechaActual(){
    // Obtener la fecha actual
    var fechaActual = new Date();
    // Formatear la fecha actual como YYYY-MM-DD
    var fechaActualFormato = fechaActual.toISOString().split('T')[0];
    // Establecer la fecha actual como el valor del campo de entrada de fecha
    fecharInput.value = fechaActualFormato;
}

LOGIN_FORM.addEventListener('submit', async(event) =>{
    event.preventDefault();

    const FORM = new FormData(LOGIN_FORM);

    const DATA = await fetchData(USER_API, 'logIn', FORM)

    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});



function Registro() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM_DIV.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    REGISTRO_FORM_DIV.classList.remove('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Registro de Usuario';
}

function showPass1() {
    // Se oculta el formulario para iniciar sesión y paso 2, 3.
    LOGIN_FORM_DIV.classList.add('d-none');
    PASSWORD1_FORM.classList.remove('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    REGISTRO_FORM_DIV.classList.add('d-none');
    // Se muestra el formulario de restablecimiento de contraseña.
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

const showPass2 = async () => {
    await sweetAlert(1, 'Se ha enviado correctamente al correo electrónico', true);
    // Se oculta el formulario para iniciar sesión y paso 1, 3
    LOGIN_FORM_DIV.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.remove('d-none');
    PASSWORD3_FORM.classList.add('d-none');
    REGISTRO_FORM_DIV.classList.add('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

const showPass3 = async () => {
    await sweetAlert(1, 'Código ingresado correctamente', true);
    // Se oculta el formulario para iniciar sesión y paso 1, 2
    LOGIN_FORM_DIV.classList.add('d-none');
    PASSWORD1_FORM.classList.add('d-none');
    PASSWORD2_FORM.classList.add('d-none');
    PASSWORD3_FORM.classList.remove('d-none');
    REGISTRO_FORM_DIV.classList.add('d-none');
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'FEASVERSE - Recuperar contraseña';
}

function showLogIn() {
    // Se oculta el formulario para iniciar sesión y paso 1, 2
    LOGIN_FORM_DIV.classList.remove('d-none');
    REGISTRO_FORM_DIV.classList.add('d-none');
    // Se muestra el formulario de recuperación de contraseña (paso 3).
    // Se establece el título del contenido principal.
}

function handleLoginFormSubmission(event) {
    event.preventDefault(); // Evita la recarga de la página por defecto
}


document.getElementById('duiInput').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 9 dígitos
    inputValue = inputValue.slice(0, 9);

    // Formatear el número agregando el guión antes del último dígito si hay al menos dos dígitos
    if (inputValue.length > 1) {
        inputValue = inputValue.slice(0, -1) + '-' + inputValue.slice(-1);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
});

document.getElementById('telefonoInput').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});