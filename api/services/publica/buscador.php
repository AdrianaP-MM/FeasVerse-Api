<?php
// Se incluye la clase del modelo.
require_once('../../models/data/zapatos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $zapato = new ZapatosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            //LEER TODOS
        case 'readAllZapatoMarca':
            $_POST = Validator::validateForm($_POST);
            // Verificar si todos los datos necesarios son válidos
            if (
                !$zapato->setIdMarca($_POST['idMarca'])

            ) {
                // Si algún dato no es válido, se asigna un mensaje de error
                $result['error'] = $pedidos->getDataError();
            } elseif ($result['dataset'] = $zapato->readAllZapatoMarca()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen zapatos registrados';
            }
            break;
        default:
            // Si no se reconoce la acción, se asigna un mensaje de error
            $result['error'] = 'Acción no disponible dentro de la sesión';
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
