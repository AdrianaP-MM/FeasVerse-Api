<?php
// Se incluye la clase del modelo.
require_once('../../models/data/zapatos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $zapatos= new ZapatosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idTrabajador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                // Verificar si el valor de búsqueda es válido
                if (!Validator::validateSearch($_POST['inputBusquedaZapatos'])) {
                    // Si no es válido, se asigna un mensaje de error
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $zapatos->searchRows()) {
                    // Si la búsqueda es válida y se encuentran resultados, se establece el estado como éxito y se crea un mensaje
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    // Si la búsqueda es válida pero no se encuentran resultados, se asigna un mensaje de error
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $zapatos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen zapatos registrados';
                }
                break;
                case 'readAllColores':
                    if ($result['dataset'] = $zapatos->readAllColores()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen colores registrados';
                    }
                    break;
                    case 'readOneColores':
                        if (!$zapatos->setIdColor($_POST['id_color'])) {
                            $result['error'] = $zapatos->getDataError();
                        } elseif ($result['dataset'] = $zapatos->readOneColores()) {
                            $result['status'] = 1;
                        } else {
                            $result['error'] = 'Color inexistente';
                        }
                        break;
            case 'readOneZapato':
                    if (!$zapatos->setId($_POST['id_zapato'])) {
                        $result['error'] = $zapatos->getDataError();
                    } elseif ($result['dataset'] = $zapatos->readOneZapato()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Zapato inexistente';
                    }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$zapatos->setIdMarca($_POST['marcaInput']) or
                    !$zapatos->setNombreZapato($_POST['nombreZapatoInput']) or
                    !$zapatos->setGenero($_POST['generoInput']) or
                    !$zapatos->setDescripcion($_POST['descripcionInput']) or
                    !$zapatos->setPrecio($_POST['precioInput']) 
                ) {
                    $result['error'] = $zapatos->getDataError();
                } elseif ($zapatos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al subir el zapato';
                }
                break;
                case 'createRowPT2':
                    $_POST = Validator::validateForm($_POST);
                    if (
                        !$zapatos->setIdTalla($_POST['idTalla']) or
                        !$zapatos->setCantidad($_POST['cantidad']) or
                        !$zapatos->setIdColor($_POST['Color']) or
                        !$zapatos->setFotoZapato($_FILES['customFile2'])
                    ) {
                        $result['error'] = $zapatos->getDataError();
                    } elseif ($zapatos->createRowPT2()) {
                        $result['status'] = 1;
                        $result['fileStatus'] = Validator::saveFile($_FILES['customFile2'], $zapatos::RUTA_IMAGEN);
                        $result['message'] = 'Zapato creada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al crear el zapato';
                    }
                    break;
                case 'addColores':
                    $_POST = Validator::validateForm($_POST);
                    if (
                        !$zapatos->setNombreColor($_POST['nombreColorInput']) 
                    ) {
                        $result['error'] = $zapatos->getDataError();
                    } elseif ($zapatos->addColores()) {
                        $result['status'] = 1;
                        $result['message'] = 'Marca creada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al añadir el color';
                    }
                    break;
            case 'ActColores':
                if (
                    !$zapatos->setIdColor($_POST['id_color']) or
                    !$zapatos->setNombreColor($_POST['nombreColor']) 
                ) {
                    $result['error'] = $zapatos->getDataError();
                } elseif ($zapatos->ActColores()) {
                    $result['status'] = 1;
                    $result['message'] = 'El color se actualizo correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el color';
                }
                break;
            case 'deleteRow':
                if (!$cliente->setId($_POST['idCliente'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cliente';
                }
                break;
                case 'readMarcas':
                    if ($result['dataset'] = $zapatos->readMarcas()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen marcas registrados';
                    }
                    break;
                    case 'readColores':
                        if ($result['dataset'] = $zapatos->readColores()) {
                            $result['status'] = 1;
                            $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                        } else {
                            $result['error'] = 'No existen colores registrados';
                        }
                        break;
                        case 'readTallas':
                            if ($result['dataset'] = $zapatos->readTallas()) {
                                $result['status'] = 1;
                                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                            } else {
                                $result['error'] = 'No existen tallas registrados';
                            }
                            break;
                case 'readDetallesZapato':
                    if (!$zapatos->setId($_POST['id_zapato'])) {
                        $result['error'] = $zapatos->getDataError();
                    } elseif ($result['dataset'] = $zapatos->readDetallesZapatos()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Trabajador inexistente';
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
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
