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
    protected $id_color = null;
    protected $nombre_color = null;

    const RUTA_IMAGEN = '../../images/zapatos';

    
    public function readAll(){
        $sql = 'SELECT  zapatos.id_zapato, zapatos.nombre_zapato,  detalle_zapatos.foto_detalle_zapato  FROM  tb_zapatos AS zapatos
    INNER JOIN tb_detalle_zapatos AS detalle_zapatos ON zapatos.id_zapato = detalle_zapatos.id_zapato;';
        return Database::getRows($sql);
    }

        
    public function readAllColores(){
        $sql = 'SELECT nombre_color FROM tb_colores;';
        return Database::getRows($sql);
    }

    public function readOneColores(){
        $sql ='SELECT nombre_color FROM tb_colores WHERE id_color = ?;';
    }


    public function addColores(){
        $sql = 'INSERT INTO tb_colores(nombre_color) VALUES (?)';
        $params = array($this->nombre_color
        );
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_detalle_zapato
                FROM tb_detalle_zapatos
                WHERE id_detalle_zapato = ?;';
        $params = array($this->id_zapato);
        return Database::getRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_color WHERE nombre_color = ?';
        $params = array($value);
        return Database::getRow($sql, $params);
    }
}