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
               if (textoSinComillas.trim().toLowerCase() === 'domingo' || textoSinComillas.trim().toLowerCase() === 'primeros' || textoSinComillas.trim().toLowerCase() === 'segundos' || textoSinComillas.trim().toLowerCase() === 'postre') {
				listItem.classList.add('resaltado');
				}

				
			 // Verificar si es la última iteración
		
			if (index === textos.length - 1) {
			// Agregar el último texto al cuerpo como un elemento <p>
			    //const linea = document.createElement('hr');
				//const linea1 = document.createElement('hr');
				
				//document.body.appendChild(linea);
				const menu = document.getElementById("precio");
				const ultimoParrafo = document.createElement('p');
				ultimoParrafo.textContent = textoSinComillas;
				menu.appendChild(ultimoParrafo);
				//document.body.appendChild(linea1);
          }else { 
		        listItem.textContent = textoSinComillas;
				lista.appendChild(listItem);	
				}			
              }
            });
	
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