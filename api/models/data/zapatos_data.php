<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/zapatos_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
 */
class ZapatosData extends ZapatosHandler{

    private $data_error = null;
    private $filename = null;

    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_zapato = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del zapato es incorrecto';
            return false;
        }
    }
    
    public function setIdColor($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_color = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del zapato es incorrecto';
            return false;
        }
    }

    public function setFotoZapato($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 150)) {
            $this->foto_detalle_zapato = Validator::getFileName();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->foto_detalle_zapato = $filename;
            return true;
        } else {
            $this->foto_detalle_zapato = 'default.png';
            return true;
        }
    }
    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

    public function setNombreColor($value, $min = 2, $max = 20)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } elseif($this->checkDuplicate($value)) {
            $this->data_error = 'El nombre ingresado ya existe';
            return false;
        } else {    
            $this->nombre_color = $value;
            return true;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['foto_detalle_zapato'];
            return true;
        } else {
            $this->data_error = 'Zapato inexistente';
            return false;
        }
    }

    public function getFilename()
    {
        return $this->filename;
    }
}