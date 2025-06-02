// Elemento Final: En esta clase se define el comportamiento que tendra el objeto construido con el Builder
class Auto {
  mostrarDetalles() {
    console.log(`
      Auto:
      Marca: ${this.marca}
      Modelo: ${this.modelo}
      Año: ${this.anio}
      Color: ${this.color}
      Número de Puertas: ${this.numPuertas}
      Tiene GPS: ${this.tieneGPS ? 'Sí' : 'No'}
      Tiene Techo Corredizo: ${this.tieneTechoCorredizo ? 'Sí' : 'No'}
    `)
  }
}

// Elemento Builder: En esta clase se define el proceso de construcción del objeto Auto
class AutoBuilder {
  constructor() {
    this.auto = new Auto();
  }

  setMarca(marca) {
    this.auto.marca = marca;
    return this;
  }

  setModelo(modelo) {
    this.auto.modelo = modelo;
    return this;
  }

  setAnio(anio) {
    this.auto.anio = anio;
    return this;
  }

  setColor(color) {
    this.auto.color = color;
    return this;
  }

  setNumPuertas(numPuertas) {
    this.auto.numPuertas = numPuertas;
    return this;
  }

  setTieneGPS(tieneGPS) {
    this.auto.tieneGPS = tieneGPS;
    return this;
  }

  setTieneTechoCorredizo(tieneTechoCorredizo) {
    this.auto.tieneTechoCorredizo = tieneTechoCorredizo;
    return this;
  }

  build() {
    return this.auto;
  }
}

// Elemento Cliente: Aquí se utiliza el Builder para crear un objeto Auto
(() => {
  const autoBuilder = new AutoBuilder();
  const auto = autoBuilder
    .setMarca('Toyota')
    .setModelo('Corolla')
    .setAnio(2022)
    .setColor('Rojo')
    .setNumPuertas(4)
    .setTieneGPS(true)
    .setTieneTechoCorredizo(false)
    .build();

  auto.mostrarDetalles();
})()
