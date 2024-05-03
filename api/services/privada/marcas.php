<?php
// Se incluye la clase del modelo.
require_once('../../models/data/marcas_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $marca = new MarcasData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como trabajador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idTrabajador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un trabajador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$marca->setNombreMarca($_POST['nombreMarca']) or
                    !$marca->setDescripcionMarca($_POST['descripcionMarca']) or
                    !$marca->setFotoMarca($_FILES['customFile2'])
                ) {
                    $result['error'] = $marca->getDataError();
                } elseif ($marca->createRow()) {
                    $result['status'] = 1;
                    $result['fileStatus'] = Validator::saveFile($_FILES['customFile2'], $marca::RUTA_IMAGEN);
                    $result['message'] = 'Marca creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la marca';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $marca->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen marcas registradas';
                }
                break;
            case 'readOne':
                break;
            case 'updateRow':
                break;
            case 'deleteRow':
                break;
            case 'getUser':
                break;
            case 'logOut':
                break;
            case 'readProfile':
                break;
            case 'editProfile':
                break;
            case 'changePassword':
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el trabajador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($trabajador->checkUser($_POST['correo_electronico'], $_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            case 'searchMail':
                if (!$trabajador->setCorreo($_POST['correo'])) {
                    $result['error'] = 'Correo electrónico incorrecto';
                } elseif ($result['dataset'] = $trabajador->checkMail()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Usuario inexistente';
                }
                break;
            case 'changePasswordLogin':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$trabajador->setClave($_POST['claveTrabajador']) or
                    !$trabajador->setId($_POST['idTrabajador'])
                ) {
                    $result['error'] = $trabajador->getDataError();
                } elseif ($_POST['claveTrabajador'] != $_POST['confirmarTrabajador']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($trabajador->updatePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Se ha actualizado correctamente la contraseña';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
