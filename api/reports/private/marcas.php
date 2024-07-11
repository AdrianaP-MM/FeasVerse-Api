<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['id_marca'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/marcas_data.php');
    require_once('../../models/data/zapatos_data.php');
    // Se instancian las entidades correspondientes.
    $marca = new MarcasData;
    $zapato = new ZapatosData;
    // Se establece el valor de la marca, de lo contrario se muestra un mensaje.
    if ($marca->setId($_GET['id_marca']) && $zapato->setIdMarca($_GET['id_marca'])) {
        // Se verifica si hay zapatos con esa marca existente, de lo contrario se muestra un mensaje.
        if ($rowMarca = $marca->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Zapatos de la Marca ' . $rowMarca['nombre_marca']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataZapatos = $zapato->readAllZapatoMarca()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(225);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(126, 10, 'Nombre', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Precio (US$)', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                // Se recorren los registros fila por fila.
                foreach ($dataZapatos as $rowProducto) {
                    ($rowProducto['estado_zapato']) ? $estado = 'Activo' : $estado = 'Inactivo';
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(126, 10, $pdf->encodeString($rowProducto['nombre_zapato']), 1, 0);
                    $pdf->cell(30, 10, $rowProducto['precio_unitario_zapato'], 1, 0);
                    $pdf->cell(30, 10, $estado, 1, 1);
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay zapatos con esa marca'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'marca.pdf');
        } else {
            print('Marca inexistente');
        }
    } else {
        print('Marca incorrecta');
    }
} else {
    print('Debe seleccionar una Marca :p');
}
