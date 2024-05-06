<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class PedidosHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_pedido_cliente = null;
    protected $id_cliente = null;
    protected $id_repartidor = null;
    protected $estado_pedido = null;
    protected $precio_total = null;
    protected $fecha_de_inicio = null;
    protected $fecha_de_entrega = null;
    protected $id_costo_de_envio_por_departamento = null;
    protected $id_detalles_pedido = null;
    protected $id_detalle_zapato = null;
    protected $cantidad_pedido = null;
    protected $precio_del_zapato = null;

    //!METODOS DE BUSQUEDA
    //SELECT PARA LEER TODOS LOS PEDIDOS REALIzADOS
    public function readAllOrders()
    {
        $sql = "SELECT tb_pedidos_clientes.id_pedido_cliente, 
        CONCAT(tb_trabajadores.nombre_trabajador,' ', tb_trabajadores.apellido_trabajador) AS nombre_repartidor,
        CONCAT(tb_clientes.nombre_cliente,' ', tb_clientes.apellido_cliente) AS nombre_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
        estado_pedido,
        fecha_de_inicio,
        fecha_de_entrega,
        precio_total,
        costo_de_envio,
        precio_total + costo_de_envio AS total_cobrar
        FROM tb_pedidos_clientes 
        INNER JOIN tb_trabajadores ON tb_trabajadores.id_trabajador = tb_pedidos_clientes.id_repartidor
        INNER JOIN tb_clientes ON tb_clientes.id_cliente = tb_pedidos_clientes.id_cliente
        INNER JOIN tb_costos_de_envio_por_departamento ON tb_pedidos_clientes.id_costo_de_envio_por_departamento = tb_costos_de_envio_por_departamento.id_costo_de_envio_por_departamento
        ";
        return Database::getRows($sql);
    }

    //BUSCAR de todos los pedidos
    public function searchOrders($searchTerm)
    {
        $sql = "SELECT tb_pedidos_clientes.id_pedido_cliente, 
        CONCAT(tb_trabajadores.nombre_trabajador,' ', tb_trabajadores.apellido_trabajador) AS nombre_repartidor,
        CONCAT(tb_clientes.nombre_cliente,' ', tb_clientes.apellido_cliente) AS nombre_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
        estado_pedido,
        fecha_de_inicio,
        fecha_de_entrega,
        precio_total,
        costo_de_envio,
        precio_total + costo_de_envio AS total_cobrar
        FROM tb_pedidos_clientes 
        INNER JOIN tb_trabajadores ON tb_trabajadores.id_trabajador = tb_pedidos_clientes.id_repartidor
        INNER JOIN tb_clientes ON tb_clientes.id_cliente = tb_pedidos_clientes.id_cliente
        INNER JOIN tb_costos_de_envio_por_departamento ON tb_pedidos_clientes.id_costo_de_envio_por_departamento = tb_costos_de_envio_por_departamento.id_costo_de_envio_por_departamento
        WHERE tb_pedidos_clientes.estado_pedido LIKE ? 
        OR tb_trabajadores.nombre_trabajador LIKE ?
        OR tb_trabajadores.apellido_trabajador LIKE ?
        OR tb_clientes.nombre_cliente LIKE ?
        OR tb_clientes.apellido_cliente LIKE ?
        OR tb_clientes.correo_cliente LIKE ?
        OR tb_clientes.telefono_cliente LIKE ?
        OR tb_clientes.direccion_cliente LIKE ?
        OR tb_costos_de_envio_por_departamento.nombre_departamento LIKE ?";
        
        $params = array(
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%",
            "%$searchTerm%"
        );
        
        return Database::getRows($sql, $params);
    }

    //SELECT PARA VER LOS ZAPATOS DE LAS ORDENES
    public function readShoesOfOrders(){
        $sql = "SELECT id_detalles_pedido, foto_detalle_zapato,
        nombre_zapato, nombre_color, num_talla, cantidad_pedido, precio_unitario_zapato,
        precio_unitario_zapato * cantidad_pedido AS precio_total
        FROM tb_detalles_pedidos
        INNER JOIN tb_detalle_zapatos 
        ON tb_detalle_zapatos.id_detalle_zapato = tb_detalles_pedidos.id_detalle_zapato
        INNER JOIN tb_zapatos
        ON tb_detalle_zapatos.id_zapato = tb_zapatos.id_zapato
        INNER JOIN tb_colores
        ON tb_colores.id_color = tb_detalle_zapatos.id_color
        INNER JOIN tb_tallas
        ON tb_tallas.id_talla = tb_detalle_zapatos.id_talla
        WHERE id_pedido_cliente = ?";
        $params = array($this->id_pedido_cliente);
        return Database::getRows($sql, $params);
    }

    //SELECT DE LOS TRABAJADORES PARA SABER LAS CLASES DE PEDIDOS QUE TIENEN O REALIZARON
    public function readAllOrdersWorkers()
    {
        $sql = "SELECT id_trabajador, nombre_trabajador, 
        apellido_trabajador, 
        dui_trabajador, 
        telefono_trabajador, 
        correo_trabajador, 
        SUM(CASE WHEN estado_pedido = ? THEN 1 ELSE 0 END) AS entregado,
        SUM(CASE WHEN estado_pedido = ? THEN 1 ELSE 0 END) AS en_proceso,
        SUM(CASE WHEN estado_pedido = ? THEN 1 ELSE 0 END) AS pendiente
        FROM tb_trabajadores 
        INNER JOIN tb_pedidos_clientes 
        ON tb_pedidos_clientes.id_repartidor = tb_trabajadores.id_trabajador
        GROUP BY 
        id_trabajador, nombre_trabajador, apellido_trabajador, dui_trabajador, telefono_trabajador, correo_trabajador";

        $params = array('Entregado', 'En Proceso', 'Pendiente');
        return Database::getRows($sql, $params);
    }

    //SELECT PARA MOSTRAR LOS DIFERENTES workers 
    public function readOrdersOfWorkerCategories(){
        $sql = "SELECT 
        tb_pedidos_clientes.id_pedido_cliente, 
        CONCAT(tb_clientes.nombre_cliente,' ', tb_clientes.apellido_cliente) AS nombre_cliente,
        correo_cliente,
        telefono_cliente,
        direccion_cliente,
        estado_pedido,
        fecha_de_inicio,
        fecha_de_entrega,
        precio_total,
        costo_de_envio,
        precio_total + costo_de_envio AS total_cobrar
        FROM tb_pedidos_clientes 
        INNER JOIN tb_trabajadores ON tb_trabajadores.id_trabajador = tb_pedidos_clientes.id_repartidor
        INNER JOIN tb_clientes ON tb_clientes.id_cliente = tb_pedidos_clientes.id_cliente
        INNER JOIN tb_costos_de_envio_por_departamento ON tb_pedidos_clientes.id_costo_de_envio_por_departamento = tb_costos_de_envio_por_departamento.id_costo_de_envio_por_departamento
        WHERE id_trabajador = ? AND estado_pedido = ?";
        $params = array($this->id_repartidor, $this->estado_pedido);
        return Database::getRows($sql, $params);
    }

    //!CREATE UPDATE DELETE
    //CUD DE TBPEDIDOSCLIENTES
    
    public function createRowPedidos()
    {
        $sql = 'INSERT INTO tb_pedidos_clientes (id_cliente, id_repartidor, estado_pedido, precio_total, fecha_de_inicio, fecha_de_entrega, id_costo_de_envio_por_departamento)
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->id_cliente, $this->id_repartidor, $this->estado_pedido, $this->precio_total, $this->fecha_de_inicio, $this->fecha_de_entrega, $this->id_costo_de_envio_por_departamento);
        return Database::executeRow($sql, $params);
    }

    public function updateRowPedidos()
    {
        $sql = 'UPDATE tb_pedidos_clientes
                SET id_cliente = ?, id_repartidor = ?, estado_pedido = ?, precio_total = ?, fecha_de_inicio = ?, fecha_de_entrega = ?, id_costo_de_envio_por_departamento = ?
                WHERE id_pedido_cliente = ?';
        $params = array($this->id_cliente, $this->id_repartidor, $this->estado_pedido, $this->precio_total, $this->fecha_de_inicio, $this->fecha_de_entrega, $this->id_costo_de_envio_por_departamento, $this->id_pedido_cliente);
        return Database::executeRow($sql, $params);
    }

    public function updateStatus()
    {
        $sql = 'UPDATE tb_pedidos_clientes
                SET estado_pedido = ?
                WHERE id_pedido_cliente = ?';
        $params = array($this->estado_pedido, $this->id_pedido_cliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowPedidos()
    {
        $sql = 'DELETE FROM tb_pedidos_clientes
                WHERE id_pedido_cliente = ?';
        $params = array($this->id_pedido_cliente);
        return Database::executeRow($sql, $params);
    }

    //CUD DE TBDETALLES
    public function createRowDetalle()
    {
        $sql = 'INSERT INTO tb_detalles_pedidos (id_pedido_cliente, id_detalle_zapato, cantidad_pedido, precio_del_zapato)
                VALUES (?, ?, ?, ?)';
        $params = array($this->id_pedido_cliente, $this->id_detalle_zapato, $this->cantidad_pedido, $this->precio_del_zapato);
        return Database::executeRow($sql, $params);
    }

    public function updateRowDetalle()
    {
        $sql = 'UPDATE tb_detalles_pedidos
                SET id_pedido_cliente = ?, id_detalle_zapato = ?, cantidad_pedido = ?, precio_del_zapato = ?
                WHERE id_detalles_pedido = ?';
        $params = array($this->id_pedido_cliente, $this->id_detalle_zapato, $this->cantidad_pedido, $this->precio_del_zapato, $this->id_detalles_pedido);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowDetalle()
    {
        $sql = 'DELETE FROM tb_detalles_pedidos
                WHERE id_detalles_pedido = ?';
        $params = array($this->id_detalles_pedido);
        return Database::executeRow($sql, $params);
    }

}