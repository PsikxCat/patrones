class SingletonTS {
  private static instance: SingletonTS;

  private constructor() {
    // Constructor es privado para evitar la creación de instancias externas
  }

  public static getInstance(): SingletonTS {
    if (!SingletonTS.instance) {
      SingletonTS.instance = new SingletonTS(); // Se crea una nueva instancia si no existe (dentro de la clase si es posible crear instancias aunque el constructor sea privado)
    }
    return SingletonTS.instance;
  }

  public someMethod(): void {
    console.log("This is a method in the singleton class.");
  }
}

// Uso
const singletonInstance1 = SingletonTS.getInstance();
const singletonInstance2 = SingletonTS.getInstance();
console.log(singletonInstance1 === singletonInstance2); // true, ambas instancias son la misma
