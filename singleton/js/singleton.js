/**
  class Singleton {
    constructor() {
      console.log('entra a constructor')

      this.random = Math.random();

      // | Es esta validacion dentro del contructor la que asegura que solo se cree una instancia de la clase
      // | /////////////////////////////////
      if (Singleton.instance) {
        console.log('ya existe')
        // biome-ignore lint/correctness/noConstructorReturn: <explanation>
        return Singleton.instance;
      }

      console.log('no existe y se crea')
      Singleton.instance = this;
      // | ////////////////////////////////
    }

    getRandom() {
      return this.random;
    }
  }

  const instance1 = new Singleton();
  const instance2 = new Singleton();
  console.log(instance1.getRandom());
  console.log(instance2.getRandom());
  console.log(instance1 === instance2); // true
*/


class WeekDays {
  daysEs = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];
  daysEn = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(lang) {
    this.lang = lang;

    if (WeekDays.instance) {
      // biome-ignore lint/correctness/noConstructorReturn: <explanation>
      return WeekDays.instance;
    }

    WeekDays.instance = this;
  }

  getDays() {
    return this.lang === 'es' ? this.daysEs : this.daysEn;
  }
}

const weekDaysEs = new WeekDays('es');
const weekDaysEn = new WeekDays('en'); // El singleton ignora el parametro 'en' y DEVUELVE LA INSTANCIA YA CREADA con 'es'

console.log(weekDaysEs.getDays());
console.log(weekDaysEn.getDays());
console.log(weekDaysEs === weekDaysEn); // true
