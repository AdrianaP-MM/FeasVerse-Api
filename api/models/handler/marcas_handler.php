<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class MarcasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_marca = null;
    protected $nombre_marca = null;
    protected $foto_marca = null;
    protected $descripcion_marca = null;

    const RUTA_IMAGEN = '../../images/marcas/';

    public function readAll(){
        $sql = 'SELECT id_marca, foto_marca FROM tb_marcas';
        return Database::getRows($sql);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_marcas(nombre_marca, foto_marca, descripcion_marca) VALUES (?,?,?)';
        $params = array(
            $this->nombre_marca,
            $this->foto_marca,
            $this->descripcion_marca
        );
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_marca WHERE nombre_marca = ?';
        $params = array($value);
        return Database::getRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_marca, nombre_marca, foto_marca, descripcion_marca FROM tb_marcas WHERE id_marca = ?';
        $params = array($this->id_marca);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_marcas SET
        nombre_marca = ?,
        foto_marca = ?,
        descripcion_marca = ? WHERE id_marca = ?;';
        $params = array(
            $this->nombre_marca,
            $this->foto_marca,
            $this->descripcion_marca,
            $this->id_marca,
        );
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_marca
                FROM tb_marcas
                WHERE id_marca = ?;';
        $params = array($this->id_marca);
        return Database::getRow($sql, $params);
    }

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_marca, nombre_marca, foto_marca, descripcion_marca
        FROM tb_marcas
        WHERE nombre_marca LIKE ? OR descripcion_marca LIKE ?;';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

}
