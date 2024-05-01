<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
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
        if (password_verify($password, $data['clave_trabajador'])) {
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

}
