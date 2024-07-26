<?php
// Encabezado para permitir solicitudes de cualquier origen.
header('Access-Control-Allow-Origin: *');
// Se establece la zona horaria local para la fecha y hora del servidor.
date_default_timezone_set('America/El_Salvador');
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
define('SERVER', 'mysql8001.site4now.net');
define('DATABASE', 'db_aab69f_ferxxit');
define('USERNAME', 'aab69f_ferxxit');
define('PASSWORD', 'feasverse!1');
?>