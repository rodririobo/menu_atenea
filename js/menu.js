function obtenerContenido() {
  // Reemplaza la URL dentro de las comillas con la URL que deseas obtener
  const url = 'https://docs.google.com/document/d/1YyetOmG7ak8Zevty7QEA2cZ29G6PgUxWc8eGRlJOb6E/pub';

  // Realizar la solicitud usando fetch
  fetch(url)
    .then(response => {
      // Verificar si la solicitud fue exitosa (código de respuesta 200)
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      // Devolver los datos como texto
      return response.text();
    })
    .then(data => {
      // Utilizar DOMParser para convertir el texto en un documento HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      // Seleccionar el contenido específico usando el selector CSS
      const contenidoEspecifico = doc.querySelector('#contents > div');

      // Verificar si el contenido se encontró antes de manejarlo
      if (contenidoEspecifico) {
        // Seleccionar todos los textos dentro de los span dentro de los p
        const textos = Array.from(contenidoEspecifico.querySelectorAll('p span')).map(span => span.textContent);

        // Crear una lista y agregar cada texto como un elemento de la lista
        const lista = document.getElementById('resultado');
        textos.forEach((texto, index) => {
          // Quitar comillas del texto antes de agregarlo a la lista
          const textoSinComillas = texto.replace(/["']/g, " ").trim();
          // Solo agregar elementos li si el texto no está vacío
          if (textoSinComillas.trim() !== '') {
            const listItem = document.createElement('li');
            // Resaltar elementos específicos y aplicar estilos de padding
          switch (textoSinComillas.trim().toLowerCase()) {
            case 'domingo':
            case 'primeros':
            case 'segundos':
            case 'postre':
            listItem.classList.add('resaltado');
            break;
            default:
                // Resto del código...
            break;
            }


   // Verifica si es la línea que empieza por precio
  if (textoSinComillas.toLowerCase().startsWith("precio")) {
          const menu = document.getElementById("precio");
          const nuevoParrafo = document.createElement('p');
          nuevoParrafo.textContent = textoSinComillas;
          menu.appendChild(nuevoParrafo);

      }else{

        // verifica que no empieze por #, en caso contrario añade el item.
        if (textoSinComillas.trim() !== "" && !textoSinComillas.trim().startsWith("#")) {
          listItem.textContent = textoSinComillas.trim();
          lista.appendChild(listItem)
      }


          }
        }
      });
    agregarImagenesALista(url);

      } else {
        console.error('No se encontró el contenido específico.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

if(window.addEventListener) {
window.addEventListener('load',obtenerContenido,false); //W3C

}else{
  window.attachEvent('onload',obtenerContenido); //IE

}

function agregarImagenesALista(url) {
  fetch(url, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, 'text/html');
      const imagenes = htmlDocument.querySelectorAll('img');
      const lista = document.getElementById('resultado');

      imagenes.forEach(imagen => {
        const src = imagen.getAttribute('src');
        if (!src) return;

        const listItem = document.createElement('li');
        const nuevaImagen = document.createElement('img');

        nuevaImagen.src = src;
        nuevaImagen.alt = imagen.alt || 'Imagen del menú';
        nuevaImagen.loading = 'lazy';
        nuevaImagen.style.maxWidth = '100%';
        nuevaImagen.style.height = 'auto';

        listItem.appendChild(nuevaImagen);
        lista.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error al cargar las imágenes del menú:', error);
    });
}