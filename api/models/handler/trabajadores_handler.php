<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class TrabajadorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_trabajador = null;
    protected $nombre_trabajador = null;
    protected $apellido_trabajador = null;
    protected $dui_trabajador = null;
    protected $telefono_trabajador = null;
    protected $correo_trabajador = null;
    protected $clave_trabajador = null;
    protected $fecha_de_registro = null;
    protected $fecha_de_nacimiento = null;
    protected $id_nivel = null;
    protected $estado_trabajador = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_trabajador, nombre_trabajador, clave_trabajador
                FROM tb_trabajadores
                WHERE  correo_trabajador = ?';
        $params = array($mail);
        $data = Database::getRow($sql, $params);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_trabajador'])) {
            $_SESSION['idTrabajador'] = $data['id_trabajador'];
            $_SESSION['nombreTrabajador'] = $data['nombre_trabajador'];
            return true;
        } else {
            return false;
        }
    }

    public function checkMail()
    {
        $sql = 'SELECT id_trabajador, nombre_trabajador, correo_trabajador
                FROM tb_trabajadores
                WHERE  correo_trabajador = ?';
        $params = array($this->correo_trabajador);
        return Database::getRow($sql, $params);
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_trabajador
                FROM tb_trabajadores
                WHERE id_trabajador = ?';
        $params = array($_SESSION['idTrabajador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_trabajador'])) {
            return true;
        } else {
            return false;
        }
    }

    public function updatePassword()
    {
        $sql = 'UPDATE tb_trabajadores
                SET clave_trabajador = ?
                WHERE id_trabajador = ?';
        $params = array($this->clave_trabajador, $this->id_trabajador);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT t.id_trabajador, t.apellido_trabajador, t.nombre_trabajador, t.dui_trabajador, t.telefono_trabajador, t.correo_trabajador, n.nivel, t.estado_trabajador FROM tb_trabajadores t
        INNER JOIN tb_niveles n WHERE n.id_nivel = t.id_nivel;';
        return Database::getRows($sql);
    }


    public function createRow()
    {
        $sql = 'INSERT INTO  tb_trabajadores(nombre_trabajador, apellido_trabajador, dui_trabajador, telefono_trabajador, correo_trabajador, clave_trabajador, fecha_de_registro, fecha_de_nacimiento, id_nivel, estado_trabajador)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        $params = array(
            $this->nombre_trabajador,
            $this->apellido_trabajador,
            $this->dui_trabajador,
            $this->telefono_trabajador,
            $this->correo_trabajador,
            $this->clave_trabajador,
            $this->fecha_de_registro,
            $this->fecha_de_nacimiento,
            $this->id_nivel,
            $this->estado_trabajador
        );
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_trabajador FROM tb_trabajadores WHERE dui_trabajador = ? OR correo_trabajador = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }
}
