
// | Funcion de Primer Orden

function sum(a, b) {
  return a + b
};

let res = sum(1, 2);
console.log(res); // 3

const fSum = sum; // podemos guardar la funcion en una variable (sin los parentesis)
res = fSum(5, 6);
console.log(res); // 11

// | Funcion de Orden Superior
// Reciben funciones de primer orden como parametros

function operation(fn, a, b) {
  console.log('operation hace algo');

  const x = fn(a, b)
  console.log(`${x} desde operation`);
};

operation(sum, 10, 20);

// | Funcion de Orden Superior con arrow func como parametro

// Ejemplo 1
operation((x, y) => x * y, 5, 5);

// Ejemplo 2
operation((x, y) => {
  const z = x + y;
  return z * 2;
}, 1, 2);

// | forEach y sort (mutabilidad e inmutabilidad)
// biome sugiere utilizar for of en lugar de forEach por temas de rendimiento, aunque la diferencia en rendimiento en la mayoria de los casos es inperceptible para el usuario final

const names = ['Rick', 'Jinx', 'Kisaki'];
console.log(names, 'array original')
// names.forEach((name) => console.log(name))
for (const name of names) console.log(name);

// Ojo al concepto de mutabilidad de los metodos como forEach, ya que en el caso de este ultimo es inmutable, esto es, que no modifica el array original.
// A diferencia de otros metodos como sort que modificaran la data del array original
names.sort();
console.log(names, 'modificado por el sort');


// | map (inmutable, crea un nuevo array sin modificar el original)

const namesUpper = names.map((name) => name.toUpperCase());
console.log(names, 'sin modificar por el map');
console.log(namesUpper);

// | reduce (inmutable, crea un nuevo array sin modificar el original)

const numbers = [5, 4, 7, 1, 10];
const sumNumbers = numbers.reduce((acc, curr) => {
  console.log(acc, curr);
  return acc + curr;
}, 0); // el segundo argumento es el valor inicial del acumulador
console.log(sumNumbers); // 27


// ! PROGRAMACION ORIENTADA A OBJETOS ////////////////////////////////////////////////////////////////////

// | CLASES //////////////////////////////

// Sintaxis introducida en ECMAScript 2015 (ES6) // # Declasracion de clase en paradigma POO
class Drink {
  constructor(name) {
    this.name = name;
  };

  info() {
    console.log(`La bebida es: ${this.name}`);
    return this.name // Sin este return el valor no sera capturado en las clases hijas con el super
  }
};

const drink = new Drink('Agua')
console.log(drink.name);
drink.info();

// Sintaxis tradicional (anterior a ES6) // # Funcion constructora en paradigma POO
function Drink2(name) {
  this.name = name;
  this.info = function () {
    console.log(`La bebida es: ${this.name}`);
  };
}

const drink2 = new Drink2('Agua')
drink2.info();

// A pesar de la diferencia en la sintaxis, ambos enfoques permiten crear objetos con propiedades y métodos.

// | HERENCIA //////////////////////////////

class Beer extends Drink {
  constructor(name, alcohol) {
    super(name); // Llama al contructor de la clase padre
    this.alcohol = alcohol;
  };

  info() {
    console.log(`La cerveza es ${super.info()} y tiene ${this.alcohol} grados de alcohol`);
  }
};

const beer = new Beer('Erdinger', 8.5);
beer.info(); // Ejecuta el metodo que hereda de la clase padre (si se crea un metodo info en la clase Beer, este sobreescribira el del padre)
