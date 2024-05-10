<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/pedidos_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de la tabla CLIENTE.
*/
class PedidosData extends PedidosHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;

    /*
    *   Métodos para validar y establecer los datos.
    */
    public function setIdPedidoCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_pedido_cliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del pedido del cliente es incorrecto';
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto';
            return false;
        }
    }

    public function setIdRepartidor($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_repartidor = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del repartidor es incorrecto';
            return false;
        }
    }

    public function setEstadoPedido($value)
    {
        if (Validator::validateAlphabetic($value)) {
            $this->estado_pedido = $value;
            return true;
        } else{    
            // Si la validación falla o el valor no coincide con 1 o 2
            $this->data_error = 'Ha ocurrido un error: El valor proporcionado no es válido';
            return false;
        }
    }

    public function setPrecioTotal($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precio_total = $value;
            return true;
        } else {
            $this->data_error = 'El precio total debe ser un número válido';
            return false;
        }
    }

    public function setFechaDeInicio($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha_de_inicio = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de inicio es incorrecta';
            return false;
        }
    }

    public function setFechaDeEntrega($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha_de_entrega = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de entrega es incorrecta';
            return false;
        }
    }

    public function setIdCostoDeEnvioPorDepartamento($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_costo_de_envio_por_departamento = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del costo de envío por departamento es incorrecto';
            return false;
        }
    }

    public function setIdDetallesPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_detalles_pedido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de los detalles del pedido es incorrecto';
            return false;
        }
    }

    public function setIdDetalleZapato($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_detalle_zapato = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle del zapato es incorrecto';
            return false;
        }
    }

    public function setCantidadPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad_pedido = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad del pedido es incorrecta';
            return false;
        }
    }

    public function setPrecioDelZapato($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precio_del_zapato = $value;
            return true;
        } else {
            $this->data_error = 'El precio del zapato debe ser un número válido';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}