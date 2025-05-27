interface Component {
  getDetail(): string;
}

class ProductComponent implements Component {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  public getDetail(): string {
    return `Product: ${this.name}`;
  }
}

// Creamos una clase abstracta, esto es, una clase que no se puede instanciar directamente, y que sirve como base (plantilla) para otras clases que sí se pueden instanciar.
abstract class ProductDecorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  // Al igual que ProductDecorator, este metodo es abstracto, lo que significa que aunque no se cree la logica de la funcion, se debe implementar en las clases que hereden de ProductDecorator.
  // Esto permite que las clases que hereden de ProductDecorator puedan definir su propia logica para este metodo.
  public abstract getDetail(): string;
}

class CommercialInfoProductDecorator extends ProductDecorator {
  private tradename: string;
  private brand: string;

  constructor(component: Component, tradename: string, brand: string) {
    super(component);

    this.tradename = tradename
    this.brand = brand;
  }

  public getDetail(): string {
    return `${this.component.getDetail()} - Tradename: ${this.tradename}, Brand: ${this.brand}`;
  }
}

class PriceProductDecorator extends ProductDecorator {
  private price: number;

  constructor(component: Component, price: number) {
    super(component);

    this.price = price;
  }

  public getDetail(): string {
    return `${this.component.getDetail()} - Price: $${this.price.toFixed(2)}`;
    // return `${super.getDetail()} - Price: $${this.price.toFixed(2)}`;
  }
}

// Ejemplo de uso
const product = new ProductComponent("Laptop");
const commercialInfoProduct = new CommercialInfoProductDecorator(product, "XPS 13", "Dell");
console.log(commercialInfoProduct.getDetail()); // Output: Product: Laptop - Tradename: XPS 13, Brand: Dell

const priceProduct = new PriceProductDecorator(product, 999.99);
console.log(priceProduct.getDetail()); // Output: Product: Laptop - Price: $999.99

const commercialPriceProduct = new PriceProductDecorator(commercialInfoProduct, 999.99);
console.log(commercialPriceProduct.getDetail()); // Output: Product: Laptop - Tradename: XPS 13, Brand: Dell - Price: $999.99
