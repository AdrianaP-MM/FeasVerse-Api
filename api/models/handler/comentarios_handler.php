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
    protected $id_cliente = null;
    protected $nombre_cliente = null;
    protected $apellido_cliente = null;
    protected $telefono_cliente = null;
    protected $correo_cliente = null;
    protected $nombre_zapato = null;
    protected $genero_zapato = null;
    protected $nombre_color = null;
    protected $precio_unitario_zapato = null;
    protected $foto_detalle_zapato = null;
    

    /*
     *  Metodos
     */
    public function readComentarios()
    {
        $sql = 'SELECT id_comentario, titulo_comentario, descripcion_comentario, calificacion_comentario, estado_comentario, fecha_del_comentario
        FROM tb_comentarios
        WHERE estado_comentario = "Activo";';
        return Database::getRows($sql);
    }

    public function updateEstado()
    {
        $sql = 'UPDATE tb_comentarios
                SET estado_comentario = ?
                WHERE id_comentario = ?';
        $params = array($this->estado_comentario, $this->id_comentario);
        return Database::executeRow($sql, $params);
    }


    public function readOneComentario()
    {
        $sql = "SELECT
                c.nombre_cliente AS 'Nombre del cliente',
                c.apellido_cliente AS 'Apellido del cliente',
                c.correo_cliente AS 'Correo del cliente',
                c.telefono_cliente AS 'Teléfono del cliente',
                z.nombre_zapato AS 'Nombre del Zapato',
                z.genero_zapato AS 'Género del zapato',
                col.nombre_color AS 'Color del zapato',
                dz.precio_unitario_zapato AS 'Precio del zapato',
                dz.foto_detalle_zapato AS 'Foto del zapato',
                com.descripcion_comentario AS 'Descripción del comentario'
            FROM
                tb_comentarios com
                JOIN tb_detalles_pedidos dp ON com.id_detalles_pedido = dp.id_detalles_pedido
                JOIN tb_pedidos_clientes pc ON dp.id_pedido_cliente = pc.id_pedido_cliente
                JOIN tb_clientes c ON pc.id_cliente = c.id_cliente
                JOIN tb_detalle_zapatos dz ON dp.id_detalle_zapato = dz.id_detalle_zapato
                JOIN tb_zapatos z ON dz.id_zapato = z.id_zapato
                JOIN tb_colores col ON dz.id_color = col.id_color
            WHERE
                com.id_comentario = ?;";
        $params = array($this->id_comentario);
        return Database::getRow($sql, $params);
    }
    
    public function updateRow()
    {
        $sql = 'UPDATE tb_comentarios
                SET titulo_comentario = ?, descripcion_comentario = ?, calificacion_comentario = ?, estado_comentario = ?, fecha_del_comentario = ?
                WHERE id_comentario = ?';
        $params = array($this->titulo_comentario, $this->descripcion_comentario, $this->calificacion_comentario, $this->estado_comentario, $this->fecha_del_comentario, $this->id_comentario);
        return Database::executeRow($sql, $params);
    }
}
