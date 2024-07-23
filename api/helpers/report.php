<?php
require_once('../../libraries/fpdf185/fpdf.php');

class Report extends FPDF
{
    const CURRENT_URL = 'http://localhost/FeasVerse-Web/vistas/privado';
    private $title = null;
    private $minLetter = null;
    private $letterUnderline = null;
    private $userName = null;
    private $regular = null;
    private $black = null;
    private $regular2 = null;
    private $anchoDemas = null;
    private $espaciado = null;
    private $celdaNegritaW = null;

    public function startReport($title, $minLetter, $letterUnderline, $anchoDemas, $espaciado, $celdaNegritaW = 35)
    {
        if (isset($_SESSION['idTrabajador']) || isset($_SESSION['idCliente'])) {
            $this->title = $title;
            $this->minLetter = $minLetter;
            $this->letterUnderline = $letterUnderline;
            $this->anchoDemas = $anchoDemas;
            $this->espaciado = $espaciado;
            $this->celdaNegritaW = $celdaNegritaW;
            if (isset($_SESSION['idTrabajador']))
                $this->userName = $_SESSION['nombreTrabajador'];
            else
                $this->userName = $_SESSION['nombreCliente'];

            // Dividir el título en tres partes
            $titleParts = explode(' ', $title, 3);
            if (count($titleParts) >= 3) {
                $this->regular = $titleParts[0];     // Zapatos
                $this->black = $titleParts[1];       // FEASVERSE
                $this->regular2 = $titleParts[2];    // de la marca
            }

            $this->setTitle('FeasVerse - Reporte', true);
            $this->setMargins(0, 2, 0);
            $this->setMargins(15, 0, 15);
            $this->addPage('P', 'Letter');
            $this->aliasNbPages();
            $this->onlyFrstPage();
        } else {
            header('location:' . self::CURRENT_URL);
        }
    }

    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf-8');
    }

    public function header()
    {
        $this->putImages();
        // Se establece el logo.
        $this->ln(3);
        $this->addText(0, $this->encodeString($this->minLetter), 11, [91, 91, 91], '');
        $this->ln(5);
    }
    
    public function onlyFrstPage(){
        $imagePath = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse-Api/api/helpers/images/FeasVerseLogo.png';
        $this->image($imagePath, 95, 13, 17);
        $this->ln(23);
        $this->addText(0, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 12, [0, 0, 0], 'I', 'C');
        $this->ln(2);

        $this->Cell($this->espaciado);
        // Agregar las partes del título con diferentes estilos y control de línea
        $this->setFont('Arial', '', 18);
        $this->Cell(30, 10, $this->encodeString($this->regular), 0, 0, 'C', 0); // 'C' para centrar y '1' para dibujar el borde
        $this->setFont('Arial', 'B', 18);
        $this->Cell($this->celdaNegritaW, 10, $this->encodeString($this->black), 0, 0, 'C', 0);
        $this->setFont('Arial', '', 18);
        $this->Cell($this->anchoDemas, 10, $this->encodeString($this->regular2), 0, 1, 'C', 0);
        $this->Cell(45);

        $this->ln(2);
        $this->addText(0, $this->encodeString($this->letterUnderline), 22, [0, 0, 0], 'U', 'C');
        $this->ln(9);
        $this->cell(7);
        $this->addText(0, 'Nombre de usuario: ' . $this->encodeString($this->userName), 12, [0, 0, 0], '', 'L');
        $this->ln(5);
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
    }

    private function putImages()
    {
        $imagePathLeft = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse-Api/api/helpers/images/BorderLeft.png';
        $imagePathRight = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse-Api/api/helpers/images/BorderRight.png';
        if (file_exists($imagePathLeft) && file_exists($imagePathRight)) {
            $this->Image($imagePathLeft, 0, 0, 0, 0);
            $this->Image($imagePathRight, 200, 0, 0, 0);
        } else {
            throw new Exception("No se encontró la imagen en la ruta especificada: $imagePathLeft");
            throw new Exception("No se encontró la imagen en la ruta especificada: $imagePathRight");
        }
    }

    public function footer()
    {
        $this->setY(-15);
        $this->setFont('Arial', 'I', 8);
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');
    }

    public function addText($w, $text, $size = 12, $color = [0, 0, 0], $style = '', $align = 'L', $nextInline = true)
    {
        $this->setFont('Arial', $style, $size);
        $this->setTextColor($color[0], $color[1], $color[2]);

        // Ajustar alineación
        $alignments = ['L' => 'L', 'C' => 'C', 'R' => 'R'];
        $alignment = isset($alignments[$align]) ? $alignments[$align] : 'L';

        if ($nextInline) {
            // Imprimir en la misma línea
            $this->cell($w, 5, $this->encodeString($text), 0, 0, $alignment, 0);
        } else {
            // Imprimir con salto de línea
            $this->multiCell($w, 5, $this->encodeString($text), 0, $alignment);
        }

        $this->ln(5); // Salto de línea después del texto
    }
}
