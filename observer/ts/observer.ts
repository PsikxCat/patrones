interface IObserver<T> {
  update(value: T): void;
}

interface ISubject<T> {
  observers: IObserver<T>[];
  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(value: T): void;
}

class Subject<T> implements ISubject<T> {
  observers: IObserver<T>[] = [];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: IObserver<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver<T>): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(value: T): void {
    for (const observer of this.observers) {
      observer.update(value);
    }
  }
}

class Observer<T> implements IObserver<T> {
  private fn : (value: T) => void;
  constructor(fn: (value: T) => void) {
    this.fn = fn;
  }
  update(value: T): void {
    this.fn(value);
  }
}

// Example usage
const subjectNum = new Subject<number>();
const observer1 = new Observer<number>((value) => console.log(`Observer 1: ${value}`));
subjectNum.subscribe(observer1);
subjectNum.notify(100); // Observer 1: 100

const subjectString = new Subject<string>();
const observer2 = new Observer<string>((value) => console.log(`Observer 2: ${value}`));
subjectString.subscribe(observer2);
subjectString.notify("Hello"); // Observer 2: Hello
