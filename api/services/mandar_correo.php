<?php

require_once('../../libraries/phpmailer651/src/PHPMailer.php');
require_once('../../libraries/phpmailer651/src/SMTP.php');
require_once('../../libraries/phpmailer651/src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class mandarCorreo
{

    function enviarCorreoPassword($correoDestino, $nombreDestinatario, $asunto, $codigoRecuperacion)
    {
        // Instanciar la clase PHPMailer
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP (en este caso, Gmail)
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com'; // Servidor SMTP de Gmail
            $mail->SMTPAuth   = true;
            $mail->Username   = 'emiliano26jacobo@gmail.com'; // Tu dirección de correo electrónico de Gmail
            $mail->Password   = 'lkzmlkqlhxnbdvxh'; // Tu contraseña de Gmail
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            // Configuración del correo electrónico
            $mail->setFrom('emiliano26jacobo@gmail.com', 'FEASVERSE.SV');
            $mail->addAddress($correoDestino, $nombreDestinatario);
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8'; // Establecer la codificación de caracteres
            $mail->Subject = '=?UTF-8?B?' . base64_encode($asunto) . '?='; // Asunto codificado en base64

            // Diseño del cuerpo del correo electrónico
            $cuerpo = '
            <html>
            <head>
                <style>
                    .container {
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                    .header {
                        background-color: #1A89BD; /* Color principal */
                        padding: 10px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        background-color: #FFFFFF; /* Fondo blanco */
                        color: #000000; /* Texto negro */
                    }
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .logo img {
                        max-width: 150px;
                    }
                    .company-name {
                        color: #FFFFFF; /* Nombre de la empresa en blanco */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="company-name">FEASVERSE . SV</h1>
                    </div>
                    <div class="content">
                        <p>Hola ' . $nombreDestinatario . ',</p>
                        <p>Recibiste este correo electrónico porque solicitaste un código de recuperación para restablecer tu contraseña en FEASVERSE.SV.</p>
                        <p>Tu código de recuperación es: <strong>' . $codigoRecuperacion . '</strong></p>
                        <p>Por favor, guarda este código de forma segura y no lo compartas con nadie.</p>
                        <p>Si no solicitaste este código, puedes ignorar este correo electrónico de manera segura.</p>
                        <p>¡Gracias!</p>
                    </div>
                </div>
            </body>
            </html>
        ';

            $mail->Body = $cuerpo;

            // Enviar correo
            $mail->send();

            // Devolver verdadero si el correo se envió correctamente
            return true;
        } catch (Exception $e) {
            // Devolver el mensaje de error si hubo un problema
            return $mail->ErrorInfo;
        }
    }



    function generarCodigoRecuperacion($longitud = 8)
    {
        // Caracteres permitidos para el código de recuperación
        $caracteresPermitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=<>?';

        // Longitud del conjunto de caracteres permitidos
        $longitudCaracteres = strlen($caracteresPermitidos);

        // Inicializar la variable que almacenará el código de recuperación
        $codigoRecuperacion = '';

        // Generar el código de recuperación aleatorio
        for ($i = 0; $i < $longitud; $i++) {
            // Obtener un carácter aleatorio del conjunto permitido
            $caracterAleatorio = $caracteresPermitidos[rand(0, $longitudCaracteres - 1)];

            // Agregar el carácter al código de recuperación
            $codigoRecuperacion .= $caracterAleatorio;
        }

        // Devolver el código de recuperación generado
        return $codigoRecuperacion;
    }
}
