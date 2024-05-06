<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/comentarios_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */

class ComentariosData extends ComentariosHandler{

    private $data_error = null;

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function setId($value)
    {
        if (Validator::validateNaturalNumber((int)$value)) {
            $this->id_comentario = (int)$value;
            return true;
        } else {
            $this->data_error = 'El identificador del comentario es incorrecto';
            return false;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            if ($value == 1) {
                $this->estado_comentario = 'Activo';
                return true;
            } elseif ($value == 2) {
                $this->estado_comentario = 'Desactivo';
                return true;
            }
            else{    
                // Si la validación falla o el valor no coincide con 1 o 2
                $this->data_error = 'Ha ocurrido un error: El valor proporcionado no es válido';
                return false;
            }
            
        }
        else{    
            // Si la validación falla o el valor no coincide con 1 o 2
            $this->data_error = 'Ha ocurrido un erroaar: El valor proporcionado no es válido';
            return false;
        }
    }
}



