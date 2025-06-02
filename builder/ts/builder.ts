class Person {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor(name: string, lastName: string, age: number, country: string, city: string, hobbies: string[]) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  getFullName = (): string => `${this.name} ${this.lastName}`;
}

interface PersonBuilder {
  setName(name: string): PersonBuilder;
  setLastName(lastName: string): PersonBuilder;
  setAge(age: number): PersonBuilder;
  setCountry(country: string): PersonBuilder;
  setCity(city: string): PersonBuilder;
  setHobbies(hobbies: string[]): PersonBuilder;
  build(): Person;
}

class NormalPersonBuilder implements PersonBuilder {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor() {
    this.name = '';
    this.lastName = '';
    this.age = 0;
    this.country = '';
    this.city = '';
    this.hobbies = [];
  }

  reset(): void {
    this.name = '';
    this.lastName = '';
    this.age = 0;
    this.country = '';
    this.city = '';
    this.hobbies = [];
  }

  setName(name: string): PersonBuilder {
    this.name = name;
    return this;
  }

  setLastName(lastName: string): PersonBuilder {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }

  setCountry(country: string): PersonBuilder {
    this.country = country;
    return this;
  }

  setCity(city: string): PersonBuilder {
    this.city = city;
    return this;
  }

  addHobby(hobby: string): PersonBuilder {
    this.hobbies.push(hobby);
    return this;
  }
  setHobbies(hobbies: string[]): PersonBuilder {
    this.hobbies = hobbies;
    return this;
  }

  build(): Person {
    return new Person(this.name, this.lastName, this.age, this.country, this.city, this.hobbies);
  }
}

class PersonDirector {
  private builder: PersonBuilder;

  constructor(builder: PersonBuilder) {
    this.builder = builder;
  }

  constructPerson(): Person {
    return this.builder
      .setName('John')
      .setLastName('Doe')
      .setAge(30)
      .setCountry('USA')
      .setCity('New York')
      .setHobbies(['Reading', 'Traveling'])
      .build();
  }
}

// Example usage
const builder = new NormalPersonBuilder();
const director = new PersonDirector(builder);
const person = director.constructPerson();
console.log(person.getFullName()); // Output: John Doe
console.log(person); // Output: Person { name: 'John', lastName: 'Doe', age: 30, country: 'USA', city: 'New York', hobbies: [ 'Reading', 'Traveling' ] }
