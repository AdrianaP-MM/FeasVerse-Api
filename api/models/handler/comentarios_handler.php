<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla Comentarios.
*/
class ComentariosHandler
{

    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_comentario = null;
    protected $titulo_comentario = null;
    protected $descripcion_comentario = null;
    protected $calificacion_comentario = null;
    protected $estado_comentario = null;
    protected $fecha_del_comentario = null;
    protected $id_detalles_pedido = null;

    public function readComentarios()
    {
        $sql = 'SELECT id_comentario, titulo_comentario, descripcion_comentario, calificacion_comentario, estado_comentario, fecha_del_comentario
        FROM tb_comentarios
        ORDER BY fecha_del_comentario;';
        return Database::getRows($sql);
    }




}
