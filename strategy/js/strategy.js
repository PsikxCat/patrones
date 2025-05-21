/**
// el patron de diseno strategy requiere inicialmente una clase de contexto
class SaleContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  // metodo que usara la estrategia
  calculate(amount) {
    return this.strategy.calculate(amount);
  }

  // metodo para cambiar la estrategia
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // metodo para obtener la estrategia
  getStrategy() {
    return this.strategy;
  }
}

class RegularSaleStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  calculate(amount) {
    const total = amount + (amount * this.tax);
    return total;
  }
}

class PercentageDiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    const total = amount + (amount * this.tax) - (amount * this.discount);
    return total;
  }
}

class FixedDiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    const total = amount + (amount * this.tax) - this.discount;
    return total;
  }
}

// Ejemplo de uso
const regularSale = new RegularSaleStrategy(0.19);
const percentageDiscountSale = new PercentageDiscountSaleStrategy(0.19, 0.1);
const fixedDiscountSale = new FixedDiscountSaleStrategy(0.19, 50000);

// creamos una venta con una estrategia inicial
const sale = new SaleContext(regularSale);

// usamos el contexto con la estrategia inicial (venta regular)
sale.setStrategy(regularSale);
console.log(`Estrategia actual: ${sale.getStrategy().constructor.name}`); // RegularSaleStrategy
console.log(`Venta regular: $${(sale.calculate(100000)).toLocaleString('es-CO')}`); // 119000

// cambiamos la estrategia a venta con descuento porcentual
sale.setStrategy(percentageDiscountSale);
console.log(`Estrategia actual: ${sale.getStrategy().constructor.name}`); // PercentageDiscountSaleStrategy
console.log(`Venta con descuento porcentual: $${(sale.calculate(100000)).toLocaleString('es-CO')}`); // 109000

// cambiamos la estrategia a venta con descuento fijo
sale.setStrategy(fixedDiscountSale);
console.log(`Estrategia actual: ${sale.getStrategy().constructor.name}`); // FixedDiscountSaleStrategy
console.log(`Venta con descuento fijo: $${(sale.calculate(100000)).toLocaleString('es-CO')}`); // 69000
 */

// # EJEMPLO PRACTICO ///////////////////////////////////////////////////////////////////////////
const data = [
  {
    name: 'Erdinger Pikantus',
    country: 'Alemania',
    info: 'Cerveza de trigo oscura con un sabor afrutado y especiado, con notas de plátano y clavo.',
    price: 20000,
    image: 'https://www.cervezasdelmundo.com/wp-content/uploads/2020/01/erdinger-pikantus.jpg',
  },
  {
    name: 'Corona Extra',
    country: 'Mexico',
    info: 'Cerveza clara de sabor suave y refrescante, ideal para disfrutar en la playa.',
    price: 15000,
    image: 'https://www.cervezasdelmundo.com/wp-content/uploads/2020/01/corona-extra.jpg',
  },
  {
    name: 'Guinness',
    country: 'Irlanda',
    info: 'Cerveza negra con un sabor intenso y un toque de café y chocolate.',
    price: 25000,
    image: 'https://www.cervezasdelmundo.com/wp-content/uploads/2020/01/guinness.jpg',
  },
  {
    name: 'Heineken',
    country: 'Holanda',
    info: 'Cerveza clara de sabor ligero y refrescante, con un toque de amargor.',
    price: 18000,
    image: 'https://www.cervezasdelmundo.com/wp-content/uploads/2020/01/heineken.jpg',
  },
]

class InfoContext {
  constructor(strategy, data, element) {
    this.strategy = strategy;
    this.data = data;
    this.element = element;
  }

  showInfo(data) {
    this.strategy.element = this.element;
    return this.strategy.showInfo(data);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

class ListStrategy {
  showInfo(data) {
    this.element.innerHTML = '';

    for (const item of data) {
      const li = document.createElement('li');

      li.innerHTML = `
        <div>
          <h2>${item.name}</h2>
          <p>${item.country}</p>
        </div>
      `;

      this.element.appendChild(li);
    }
  }
}

class DetailedListStrategy {
  showInfo(data) {
    this.element.innerHTML = '';

    for (const item of data) {
      const li = document.createElement('li');

      li.innerHTML = `
        <div>
          <h2>${item.name}</h2>
          <p>${item.country}</p>
          <p>${item.info}</p>
          <p>$${item.price.toLocaleString('es-CO')}</p>
          <img src="${item.image}" alt="${item.name}">
        </div>
      `;

      this.element.appendChild(li);
    }
  }
}

const strategies = [
  new ListStrategy(),
  new DetailedListStrategy(),
]


const listStrategy = new ListStrategy();
const listElement = document.getElementById('content');

const beerInfo = new InfoContext(listStrategy, data, listElement);
beerInfo.showInfo(data, listElement);

// Asignamos comportamiento al select, de manera que al cambiar la estrategia, se actualice la lista
slcOptions.addEventListener('change', (e) => {
  const selectedOption = e.target.value;
  const strategy = strategies[selectedOption];

  beerInfo.setStrategy(strategy);
  beerInfo.showInfo(data, listElement);
});
