<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedidos = new PedidosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //CREAR
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                // Verificar si todos los datos necesarios son válidos
                if (
                    !$pedidos->setEstadoPedido2($_POST['estado_pedido'])
                ) {
                    // Si algún dato no es válido, se asigna un mensaje de error
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->createRowPedidos()) {
                    // Si se crea el registro correctamente, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Carrito creado correctamente';
                } else {
                    // Si ocurre un problema al crear el cliente, se asigna un mensaje de error
                    $result['error'] = 'Ocurrió un problema al crear el carrito';
                }
                break;
            //LEER TODOS
            case 'readAll':
                if ($result['dataset'] = $pedidos->readShoesOfCarritos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen carrito del cliente';
                }
                break;
            case 'readAllCarrito':
                if ($result['dataset'] = $pedidos->verCarrito()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen carrito del cliente';
                }
                break;
            //ACTUALIZAR
            case 'updateRow':
            
                break;
            //CAMBIAR EsTATUS DEL PEDIDO
            case 'updateStatus':
            
                break;
            // ELIMINAR
            case 'deleteRow':
            
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
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
