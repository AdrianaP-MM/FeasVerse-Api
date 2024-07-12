<?php
require_once('../../libraries/fpdf185/fpdf.php');

class Report extends FPDF
{
    const CURRENT_URL = 'http://localhost/FeasVerse/vistas/privado';
    private $title = null;
    private $minLetter = null;
    private $letterUnderline = null;
    private $userName = null;

    public function startReport($title, $minLetter, $letterUnderline)
    {
        session_start();
        if (isset($_SESSION['idTrabajador'])) {
            $this->title = $title;
            $this->minLetter = $minLetter;
            $this->letterUnderline = $letterUnderline;
            $this->userName = $_SESSION['nombreTrabajador'];
            $this->setTitle('FeasVerse - Reporte', true);
            $this->setMargins(0, 2, 0);
            $this->addPage('P', 'Letter');
            $this->putImages();
            $this->aliasNbPages();
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
        // Se establece el logo.
        $this->ln(3);
        $this->cell(10);
        $this->addText($this->encodeString($this->minLetter), 11, [91, 91, 91], '');
        $imagePath = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse/api/helpers/images/FeasVerseLogo.png';
        $this->image($imagePath, 95, 13, 17);
        $this->ln(28);
        $this->addText('Fecha/Hora: ' . date('d-m-Y H:i:s'), 12, [0, 0, 0], 'I', 'C');
        $this->ln(5);
        $this->addText(
            $this->encodeString($this->title),
            18,
            [0, 0, 0],
            '',
            'C'
        );
        $this->ln(2);
        $this->addText($this->encodeString($this->letterUnderline), 22, [0, 0, 0], 'U', 'C');
        $this->cell(25);
        $this->addText('Nombre de usuario: '.$this->encodeString($this->userName), 12, [0, 0, 0], '', 'L');
        $this->ln(10);
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
    }

    private function putImages()
    {
        $imagePathLeft = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse/api/helpers/images/BorderLeft.png';
        $imagePathRight = $_SERVER['DOCUMENT_ROOT'] . '/FeasVerse/api/helpers/images/BorderRight.png';
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

    public function addText($text, $size = 12, $color = [0, 0, 0], $style = '', $align = 'L')
    {
        $this->setFont('Arial', $style, $size);
        $this->setTextColor($color[0], $color[1], $color[2]);

        // Ajustar alineación
        $alignments = ['L' => 'L', 'C' => 'C', 'R' => 'R'];
        $alignment = isset($alignments[$align]) ? $alignments[$align] : 'L';

        if ($alignment == 'C') {
            // Centrar texto
            $this->cell(0, 1, $this->encodeString($text), 0, 1, $alignment);
        } elseif ($alignment == 'R') {
            // Alinear texto a la derecha
            $this->cell(0, 1, $this->encodeString($text), 0, 1, $alignment);
        } else {
            // Alinear texto a la izquierda (por defecto)
            $this->multiCell(0, 1, $this->encodeString($text), 0, $alignment);
        }

        $this->ln(5); // Salto de línea después del texto
    }
}
