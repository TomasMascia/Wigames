const contenedor = document.getElementById('contenedor-juegos');


async function cargarJuegos() {
    try {
        const respuesta = await fetch('data/database.json');
        
        const datos = await respuesta.json();
        renderizarJuegos(datos.juegos);
    } catch (error) {
        console.error("Error al cargar la base de datos:", error);
        contenedor.innerHTML = "<p>Hubo un error al cargar los juegos.</p>";
    }
}

// Función para generar el HTML de cada juego
function renderizarJuegos(listaJuegos) {
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = '';

    // Iteramos sobre cada juego en la lista
    listaJuegos.forEach(juego => {
        // Creamos un div para la tarjeta del juego
        const tarjeta = document.createElement('div');
        tarjeta.className = 'juego-card';

        // Estructura básica del juego
        let contenidoHTML = `
            <h2 class="juego-titulo">${juego.nombre}</h2>
            <p class="categoria">Categoría: ${juego.categoria}</p>
        `;

        // Extraemos las reseñas del juego
        const resenas = juego.reseñas;

        // Bucle para iterar sobre los usuarios (tomi y pipe)
        for (const usuario in resenas) {
            const infoUsuario = resenas[usuario];
            
            // Solo mostramos la opinión si el usuario jugó el juego
            if (infoUsuario.jugado) {
                contenidoHTML += `
                    <div class="resena">
                        <span class="usuario">${usuario}</span>: 
                        ⭐ ${infoUsuario.puntaje}/10 <br>
                        <em>"${infoUsuario.opinion}"</em>
                    </div>
                `;
            } else {
                contenidoHTML += `
                    <div class="resena">
                        <span class="usuario">${usuario}</span>: No lo ha jugado aún.
                    </div>
                `;
            }
        }

        // Insertamos el contenido HTML generado dentro del div de la tarjeta
        tarjeta.innerHTML = contenidoHTML;
        
        // Agregamos la tarjeta terminada al contenedor principal en la pantalla
        contenedor.appendChild(tarjeta);
    });
}

// Ejecutamos la función principal al cargar el archivo
cargarJuegos();