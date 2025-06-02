// El patrón State permite a un objeto modificar su comportamiento cuando su estado interno cambia .
// Esto se logra mediante una familia de clases (estados) que encapsulan el comportamiento específico para cada estado.

// | Estados : Clases que representan los diferentes estados del objeto.
class SinMoneda {
  constructor(maquina) {
    this.maquina = maquina;
  }

  insertarMoneda() {
    console.log("Moneda insertada. Por favor, seleccione un producto.");
    this.maquina.setEstado(new ConMoneda(this.maquina));
  }

  seleccionarProducto() {
    console.log("Por favor, inserte una moneda primero.");
  }

  entregarProducto() {
    console.log("Por favor, inserte una moneda y seleccione un producto.");
  }
}

class ConMoneda {
  constructor(maquina) {
    this.maquina = maquina;
  }

  insertarMoneda() {
    console.log("Ya se ha insertado una moneda. Por favor, seleccione un producto.");
  }

  seleccionarProducto() {
    if (this.maquina.hayStock()) {
      console.log("Producto seleccionado. Entregando producto...");
      this.maquina.reducirStock();
      this.maquina.setEstado(new SinMoneda(this.maquina));
      this.maquina.entregarProducto();
    } else {
      console.log("No hay stock disponible. Por favor, elija otro producto.");
      this.maquina.setEstado(new SinMoneda(this.maquina));
    }
  }

  entregarProducto() {
    console.log("Entregando producto...");
  }
}

class Vendido {
  constructor(maquina) {
    this.maquina = maquina;
  }

  insertarMoneda() {
    console.log("Espera, ya estamos procesando tu compra.");
  }

  seleccionarProducto() {
    console.log("Espera, ya seleccionaste un producto.");
  }

  entregarProducto() {
    console.log("Producto dispensado. Gracias por tu compra.");
    if (this.maquina.hayStock()) {
      this.maquina.disminuirStock();
      this.maquina.cambiarEstado(new SinMoneda(this.maquina));
    } else {
      console.log("Lo sentimos, el producto está agotado.");
      this.maquina.cambiarEstado(new Agotado(this.maquina));
    }
  }
}

class Agotado {
  constructor(maquina) {
    this.maquina = maquina;
  }

  insertarMoneda() {
    console.log("Lo sentimos, el producto está agotado. No se puede insertar moneda.");
  }

  seleccionarProducto() {
    console.log("No hay productos disponibles. Por favor, espere a que se reponga el stock.");
  }

  entregarProducto() {
    console.log("No se puede entregar producto, ya que está agotado.");
  }
}

// | Contexto : El objeto cuyo comportamiento cambia.
class MaquinaExpendedora {
  constructor(stockInicial) {
    this.stock = stockInicial;
    this.estado = new SinMoneda(this); // Estado inicial
  }

  setEstado(nuevoEstado) { this.estado = nuevoEstado; }
  insertarMoneda() { this.estado.insertarMoneda(); }
  seleccionarProducto() { this.estado.seleccionarProducto(); }
  entregarProducto() { this.estado.entregarProducto(); }

  hayStock() { return this.stock > 0; }
  reducirStock() {
    if (this.hayStock()) {
      this.stock--;
    } else {
      console.log("No hay stock disponible.");
    }
  }
  mostrarStock() {
    console.log(`Stock actual: ${this.stock}`);
  }
}

// | Uso del patrón State
const maquina = new MaquinaExpendedora(3); // Inicializa la máquina con 3 productos
maquina.mostrarStock();
maquina.insertarMoneda(); // Inserta una moneda
maquina.seleccionarProducto(); // Selecciona un producto

maquina.mostrarStock(); // Muestra el stock restante
maquina.insertarMoneda(); // Intenta insertar otra moneda
maquina.seleccionarProducto(); // Selecciona otro producto
