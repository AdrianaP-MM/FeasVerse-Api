<?php
// Se incluye la clase del modelo.
require_once('../../models/data/comentarios_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $comentarios = new ComentariosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como trabajador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idTrabajador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un trabajador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRowsActive':
                if ($result['dataset'] = $comentarios->readComentarios('Activo','')) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay comentarios existentes';
                }
                break;
            case 'searchRowsDesactive':
                if ($result['dataset'] = $comentarios->readComentarios('Desactivo','')) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay comentarios existentes';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $comentarios->readComentarios('Activo','Desactivo')) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay comentarios existentes';
                }
                break;
            case 'readOneComentario':
                if (!$comentarios->setId($_POST['idComentario'])) {
                    $result['error'] = $comentarios->getDataError();
                } elseif ($result['dataset'] = $comentarios->readOneComentario()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comentario inexistente';
                }
                break;
            case 'bloqDesbloqRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$comentarios->setId($_POST['idComentario']) or
                    !$comentarios->setEstado($_POST['estado_comentario'])
                ) {
                    $result['error'] = $comentarios->getDataError();
                } elseif ($comentarios->bloqDesbloqRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario retirado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al retirar el comentario';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['nombreTrabajador'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['nombreTrabajador'];
                } else {
                    $result['error'] = 'Alias de trabajador indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
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
