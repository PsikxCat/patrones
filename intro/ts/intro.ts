console.log('Hola desde Ts')

class Drink {
  // private name: string;
  protected name: string; // protected a diferencia de private permite que las clases hijas (Beer) accedan a la propiedad

  constructor(name: string) {
    this.name = name;
  }

  info(): string {
    console.log(`La bebida es: ${this.name}`)
    return this.name
  }
}

const drink = new Drink("Agua");
drink.info()

// | INTERFACES //////////////////////////////////
interface IProduct {
  price: number;
  getPrice(): string
}

// | HERENCIA ///////////////////////////////////
class Beer extends Drink implements IProduct {
  private alcohol: number;
  public price: number;

  constructor(name: string, alcohol: number, price = 0) {
    super(name);
    this.alcohol = alcohol;
    this.price = price;
  }

  getPrice(): string {
    return `El precio de la cerveza ${this.name} es $${this.price}`
  }

  info(): string {
    // console.log(`La cerveza es ${(super.info()).toLowerCase()} y tiene ${this.alcohol} grados de alcohol`)
    return `La cerveza es ${super.info()} y tiene ${this.alcohol} grados de alcohol`
  }
}

const beer = new Beer('Larger', 4.5);
console.log(beer.info())

// nueva clase Snack
class Snack implements IProduct {
  private name: string;
  public price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getPrice(): string {
    return `El precio del snack ${this.name} es $${this.price}`
  }
}

const products: IProduct[] = [
  new Beer('Corona', 4.5, 3.5),
  new Beer('Heineken', 5, 4.3),
  new Snack('Papas',1.5),
  new Snack('Galletas', 2.0)
]

function getPrices(items: IProduct[]): string[] {
  return items.map(item => item.getPrice())
}

console.log(getPrices(products))
