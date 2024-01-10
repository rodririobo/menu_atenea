function obtenerContenido() {
  const url = 'https://docs.google.com/document/d/e/2PACX-1vSBp2u6ZFsG4bA6WO1HIKDGWy4mRSBh5XESwO95DU9VeezCf_bbW61a7aigJKKWGPtPmr5EAVtM6sUz/pub';

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.text();
    })
    .then(data => {
      const contenidoEspecifico = extraerContenidoEspecifico(data);

      if (contenidoEspecifico) {
        manipularContenido(contenidoEspecifico);
      } else {
        console.error('No se encontró el contenido específico.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function extraerContenidoEspecifico(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  return doc.querySelector('#contents > div');
}

function manipularContenido(contenidoEspecifico) {
  const textos = Array.from(contenidoEspecifico.querySelectorAll('p span')).map(span => span.textContent);

  const lista = document.getElementById('resultado');
  const menu = document.getElementById('precio');

  textos.forEach(texto => {
    const textoSinComillas = texto.replace(/["']/g, " ").trim();

    if (textoSinComillas.trim() !== '') {
      if (resaltarElemento(textoSinComillas)) {
        agregarResaltado(textoSinComillas);
      } else if (esLineaPrecio(textoSinComillas)) {
        agregarLineaPrecio(menu, textoSinComillas);
      } else if (!esLineaExcluida(textoSinComillas)) {
        agregarElementoLista(lista, textoSinComillas);
      }
    }
  });

  agregarImagenesALista(url);
}

// ... funciones adicionales ...

if (window.addEventListener) {
  window.addEventListener('load', obtenerContenido, false); //W3C
} else {
  window.attachEvent('onload', obtenerContenido); //IE
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