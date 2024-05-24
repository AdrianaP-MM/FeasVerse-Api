<?php
// Se incluye la clase del modelo.
require_once('../../models/data/zapatos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
} else {
    print(json_encode('Recurso no disponible'));
}
