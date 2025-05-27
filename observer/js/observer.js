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

  notify(data) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  // Este método es llamado por el sujeto para notificar cambios
  update(data) {
    console.log(`${this.name} ha sido notificado con los datos: ${data}`);
  }
}

// | Ejemplo de uso
// Creamos una instancia del sujeto
const subject = new Subject();
// Creamos algunos observadores
const observer1 = new Observer('Observador 1');
const observer2 = new Observer('Observador 2');
const observer3 = new Observer('Observador 3');

// Agregamos los observadores al sujeto
subject.addObserver(observer1);
subject.addObserver(observer2);
subject.addObserver(observer3);

// Notificamos a los observadores con un mensaje
subject.notify('¡Hola, Observadores!');

// Cancelamos la suscripción de uno de los observadores
subject.removeObserver(observer2);
console.log('Observador 2 ha sido eliminado de la lista de observadores.');

// Notificamos nuevamente a los observadores
subject.notify('¡Hola de nuevo, Observadores!');
// El Observador 2 no recibirá esta notificación
