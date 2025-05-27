class Subject {
  constructor() {
    this.observers = [];
  }

  // Este método permite a los observadores suscribirse a los cambios
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Este método permite a los observadores cancelar su suscripción
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // Este método notifica a todos los observadores suscritos con los datos proporcionados
  notify(data) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class ItemsSubject extends Subject {
  constructor() {
    super(); // invoca el constructor de la clase padre (la inicializacion de observers en vacio)
    this.items = []; // inicializa la lista de items en vacio para la clase ItemsSubject
  }

  // Este método permite agregar un nuevo item a la lista de items y notificar (suscribir) a los observadores
  addItem(item) {
    this.items.push(item);
    this.notify(this.items);
  }

  // Este método permite eliminar un item de la lista de items y pausar la notificación a los observadores
  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
    this.notify(this.items);
  }
}

class HtmlElementObserver {
  constructor(element) {
    this.element = element; // elemento HTML al que se le asignara el observer
  }

  // Este método es llamado por el sujeto para notificar cambios
  update(data) {
    // this.element.innerHTML = data.reduce((acc, item) => `${acc}<p>${item}</p>`, '');
    this.element.innerHTML = data.map(item => `<p>${item}</p>`).join('');  // actualiza el contenido del elemento HTML con la lista de items
  }
}

// | Ejemplo de uso HtmlElementObserver //////////////////

// Creamos una instancia del sujeto
const itemsSubject = new ItemsSubject();

// Creamos los elementos HTML que serán observados
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const div3 = document.getElementById('div3');

// Creamos los observadores para cada elemento HTML
const observer1 = new HtmlElementObserver(div1);
const observer2 = new HtmlElementObserver(div2);
const observer3 = new HtmlElementObserver(div3);

function addItem() {
  const item = document.getElementById('itemInput').value; // obtenemos el valor del input
  itemsSubject.addItem(item); // agregamos el item al sujeto
  document.getElementById('itemInput').value = ''; // limpiamos el input
}
function removeItem() {
  const item = document.getElementById('itemInput').value; // obtenemos el valor del input
  itemsSubject.removeItem(item); // removemos el item del sujeto
  document.getElementById('itemInput').value = ''; // limpiamos el input
}

// Agregamos los observadores al sujeto
itemsSubject.addObserver(observer1);
itemsSubject.addObserver(observer2);

////////////////////////////////////////////////////

class Observer {
  constructor(fn) {
    this.fn = fn; // función que se ejecutará al recibir la notificación
  }

  update(data) {
    this.fn(data); // ejecuta la función con los datos recibidos
  }
}

// | Ejemplo de uso Observer /////////////////////////
// En este ejempplo se quiere mostrar como el observador puede recibir una funcion con lo cual se puede generar un comportamiento diferente en cada instancia

// Creamos una instancia del sujeto
const subject = new Subject();

// Creamos algunos observadores
const observer01 = new Observer(data => console.log(`Observador 1 ha sido notificado con los datos: ${data}`));
const observer02 = new Observer(data => console.log(`Observador 2 ha sido notificado con los datos: ${data}`));
// Creamos un tercer observador que tiene un comportamiento diferente a los anteriores ya que estamos setenado la funcion desde la instancia
const observer03 = new Observer(data => { div3.innerHTML = `Observador 3 ha sido notificado con los datos: ${data}` });

// Agregamos los observadores al sujeto
subject.addObserver(observer01);
subject.addObserver(observer02);
subject.addObserver(observer03);

// Notificamos a los observadores con un mensaje
subject.notify('¡Hola, Observadores!');

// Cancelamos la suscripción de uno de los observadores
subject.removeObserver(observer02);
console.log('Observador 2 ha sido eliminado de la lista de observadores.');

// Notificamos nuevamente a los observadores
subject.notify('¡Hola de nuevo, Observadores!');
// El Observador 2 no recibirá esta notificación
//////////////////////////////////////////////////////
