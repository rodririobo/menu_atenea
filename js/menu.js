function obtenerContenido() {
  // Reemplaza la URL dentro de las comillas con la URL que deseas obtener
  const url = 'https://docs.google.com/document/d/e/2PACX-1vSBp2u6ZFsG4bA6WO1HIKDGWy4mRSBh5XESwO95DU9VeezCf_bbW61a7aigJKKWGPtPmr5EAVtM6sUz/pub';

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
          lista.appendChild(listItem).toUpperCase(); //Fuerza mayusculas todo
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
	fetch(url)
	  .then(response => response.text())
	  .then(data => {
		const parser = new DOMParser();
		const htmlDocument = parser.parseFromString(data, 'text/html');
		const imagenes = htmlDocument.querySelectorAll('img');
		const lista = document.getElementById('resultado');
		const listItem = document.createElement('li');
		imagenes.forEach(imagen => {
		  const src = imagen.getAttribute('src'); // Obtener el valor del atributo src
		  const nuevaImagen = document.createElement('img'); // Crear un nuevo elemento img
		  nuevaImagen.src = src; // Asignar el origen recuperado a la nueva imagen
		  listItem.appendChild(nuevaImagen); // Agregar la nueva imagen al elemento li
		  lista.appendChild(listItem); // Agregar el elemento li a la lista
		});
	  })
	  .catch(error => {
		console.error('Hubo un error al obtener o procesar la página:', error);
	  });
}