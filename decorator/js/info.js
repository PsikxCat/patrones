// | Componente: ClientComponent
// Descripción: Este componente realiza una solicitud HTTP GET a una URL proporcionada
class ClientComponent {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    const response = await fetch(this.url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
  }
}

// | Decorador: ClientDecorator
class ClientDecorator {
  constructor(ClientComponent) {
    this.ClientComponent = ClientComponent;
  }

  async getData() {
    return await this.ClientComponent.getData(); // Llama al método getData del componente base y retorna los datos obtenidos
  }
}

// | Decorador: UpperCaseClientDecorator (Hereda de ClientDecorator)
class UpperCaseClientDecorator extends ClientDecorator {
  // No es necesario un constructor aquí, ya que no se añaden propiedades nuevas y hereda el constructor de ClientDecorator

  async getData() {
    const data = await super.getData(); // Obtiene los datos del componente ClientDecorator, que a su vez los obtiene del ClientComponent
    const upperCaseTitleData = data.map(item => ({ ...item, title: item.title.toUpperCase() })); // Convierte el título de cada objeto a mayúsculas
    return upperCaseTitleData;
  }
}

// | Decorador: HtmlClientDecorator (Hereda de ClientDecorator)
class HtmlClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const htmlData = data.map(item => {
      return {
        ...item, // Copia todas las propiedades del objeto original
        title: `<h1>${item.title}</h1>`, // Convierte el título a un elemento HTML <h1>
        thumbnailUrl: `<img src="${item.thumbnailUrl}" alt="${item.title}">` // Convierte la URL de la miniatura a un elemento HTML <img>
      }
    })

    return htmlData;
  }
}

// | Función autoinvocada (IIFE) para crear scope con async para el uso de await, (aunque este no es necesario en ES6, ya que cuenta con top-level await)
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/photos';
  const clientComponent = new ClientComponent(url);

  const data = await clientComponent.getData();
  console.log('Datos originales:', data.slice(0, 5)); // Muestra los primeros 5 elementos de los datos originales

  const upperCaseClientDecorator = new UpperCaseClientDecorator(clientComponent);
  const upperCaseData = await upperCaseClientDecorator.getData();
  console.log('Datos con títulos en mayúsculas:', upperCaseData.slice(0, 5)); // Muestra los primeros 5 elementos de los datos con títulos en mayúsculas

  // > Creamos la instancia del decorador HtmlClientDecorator, pasando el decorador UpperCaseClientDecorator como argumento, con lo cual se aplica el patrón decorator en cascada
  const htmlClientDecorator = new HtmlClientDecorator(upperCaseClientDecorator);
  const htmlData = await htmlClientDecorator.getData();
  const div1 = document.getElementById('divContent1');
  // en el div1 mostrar el titulo y la miniatura de los primeros 5 elementos de los datos en formato HTML
  div1.innerHTML = htmlData.slice(0, 5).map(item => item.title + item.thumbnailUrl).join('<br>');

  // > En esta segunda instancia del decorador HtmlClientDecorator, pasamos el componente base ClientComponent, sin aplicar el decorador UpperCaseClientDecorator
  const htmlClientDecorator2 = new HtmlClientDecorator(clientComponent);
  const htmlData2 = await htmlClientDecorator2.getData();
  const div2 = document.getElementById('divContent2');
  // en el div2 mostrar el titulo y la miniatura de los primeros 5 elementos de los datos en formato HTML
  div2.innerHTML = htmlData2.slice(0, 5).map(item => item.title + item.thumbnailUrl).join('<br>');
})()

// ! Las imagenes no se muestran porque las urls ya no son válidas, pero el código funciona correctamente.
