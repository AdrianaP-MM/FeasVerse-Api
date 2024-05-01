<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_cliente = null;
    protected $nombre_cliente = null;
    protected $apellido_cliente = null;
    protected $dui_cliente = null;
    protected $telefono_cliente = null;
    protected $correo_cliente = null;
    protected $direccion_cliente = null;
    protected $clave_cliente = null;
    protected $fecha_de_registro = null;
    protected $fecha_de_nacimiento = null;
    protected $estado_cliente = null;

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($correo_cliente, $clave_cliente)
    {
        $sql = 'SELECT id_cliente, nombre_cliente, correo_cliente, clave_cliente, estado_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if (password_verify($clave_cliente, $data['clave_cliente'])) {
            $this->id_cliente = $data['id_cliente'];
            $this->correo_cliente = $data['correo_cliente'];
            $this->estado_cliente = $data['estado_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id_cliente;
            $_SESSION['correoCliente'] = $this->correo_cliente;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_cliente = ?, telefono_cliente = ?, fecha_de_nacimiento = ?, direccion_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->correo_cliente, $this->dui_cliente, $this->telefono_cliente, $this->fecha_de_nacimiento, $this->direccion_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_cliente, fecha_de_nacimiento, fecha_de_registro, direccion_cliente
                FROM tb_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ? OR correo_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_cliente, fecha_de_nacimiento, fecha_de_registro, direccion_cliente, clave_cliente, estado_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->correo_cliente, $this->dui_cliente, $this->telefono_cliente, $this->fecha_de_nacimiento, $this->fecha_de_registro, $this->direccion_cliente, $this->clave_cliente, $this->estado_cliente);
        return Database::executeRow($sql, $params);
    }


    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, estado_cliente
                FROM tb_clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_cliente, fecha_de_nacimiento, fecha_de_registro, direccion_cliente, estado_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, dui_cliente = ?, telefono_cliente = ?, fecha_de_nacimiento = ?, direccion_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->dui_cliente, $this->telefono_cliente, $this->fecha_de_nacimiento, $this->direccion_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function updateStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function updatePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM tb_clientes
                WHERE dui_cliente = ? OR correo_cliente = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }
}
