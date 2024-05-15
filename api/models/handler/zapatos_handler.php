<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */

class ZapatosHandler{

    protected $id_zapato = null;
    protected $id_trabajador = null;
    protected $id_marca = null;
    protected $nombre_zapato = null;
    protected $genero_zapato = null;
    protected $descripcion_zapato = null;
    protected $estado_zapato = null;
    protected $foto_detalle_zapato = null;

    const RUTA_IMAGEN = '../../images/marcas/zapatos';

    
    public function readAll(){
        $sql = 'SELECT  zapatos.id_zapato, zapatos.nombre_zapato,  detalle_zapatos.foto_detalle_zapato  FROM  tb_zapatos AS zapatos
    INNER JOIN tb_detalle_zapatos AS detalle_zapatos ON zapatos.id_zapato = detalle_zapatos.id_zapato;';
        return Database::getRows($sql);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_detalle_zapato
                FROM tb_detalle_zapatos
                WHERE id_detalle_zapato = ?;';
        $params = array($this->id_zapato);
        return Database::getRow($sql, $params);
    }
}