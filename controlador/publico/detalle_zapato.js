// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    readColores();
});

const readColores = () => {
    // Mapeo de nombres de colores a valores hexadecimales 
    const colorMapping = {
        "rojo": "#FF0000",
        "verde": "#00FF00",
        "azul": "#0000FF",
    };

    for (const nombreColor in colorMapping) { //(aqui se preguntaria a la base)
        if (colorMapping.hasOwnProperty(nombreColor)) {
            const colorHex = colorMapping[nombreColor];

            // Se crea un nuevo div para cada color y aplica el estilo
            const nuevoCirculo = document.createElement("div");
            nuevoCirculo.className = "circuloColor";
            nuevoCirculo.style.backgroundColor = colorHex;

            // Se obtiene el contenedor de los colores
            var contenedorColores = document.getElementById("contenedorColores");
            contenedorColores.appendChild(nuevoCirculo);
        }
    }
}


