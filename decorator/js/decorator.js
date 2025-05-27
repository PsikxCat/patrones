// Implementacion base sobre la que se implementara el patron decorator
class CafeSimple {
  constructor() {
    this.descripcion = "Cafe Simple";
  }

  getDescripcion() {
    return this.descripcion;
  }

  costo() {
    return 2.00;
  }
}

// Decorador para agregar leche
class LecheDecorator {
  constructor(cafe) {
    this.cafe = cafe;
  }

  getDescripcion() {
    return `${this.cafe.getDescripcion()}, con leche`;
  }

  costo() {
    return this.cafe.costo() + 0.50;
  }
}

// Decorador para agregar chocolate
class ChocolateDecorator {
  constructor(cafe) {
    this.cafe = cafe;
  }

  getDescripcion() {
    return `${this.cafe.getDescripcion()}, con chocolate`;
  }

  costo() {
    return this.cafe.costo() + 0.75;
  }
}

// | Uso del patron decorator
const cafe = new CafeSimple();
console.log(`Descripcion: ${cafe.getDescripcion()}. Costo: $${cafe.costo()}`);
const cafeConLeche = new LecheDecorator(cafe);
console.log(`Descripcion: ${cafeConLeche.getDescripcion()}. Costo: $${cafeConLeche.costo()}`);
const cafeConChocolate = new ChocolateDecorator(cafe);
console.log(`Descripcion: ${cafeConChocolate.getDescripcion()}. Costo: $${cafeConChocolate.costo()}`);
