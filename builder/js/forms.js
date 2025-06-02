class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  // > Metodos que daran funcionalidad al objeto Form, estos metodos no hacen parte del patron Builder, pero son necesarios para el funcionamiento del formulario.
  getContent() {
    let content = `<form method="post" action="${this.action}">\n`;

    for (const control of this.controls) {
      content += `  <div class="form-group">\n`;
      content += `    ${this.getLabel(control)}\n`;
      content += `    ${this.getInput(control)}\n`;
      content += '  </div>\n';
    }

    content += '</form>';
    content += '<button type="submit">Enviar</button>\n';

    return content;
  }

  getLabel(control) {
    return `<label for="${control.name}">${control.name}</label>`;
  }

  getInput(control) {
    switch (control.type) {
      case 'text':
        return `<input type="text" id="${control.name}" name="${control.name}" value="${control.value}">`;
      case 'password':
        return `<input type="password" id="${control.name}" name="${control.name}" value="${control.value}">`;
      case 'email':
        return `<input type="email" id="${control.name}" name="${control.name}" value="${control.value}">`;
      case 'number':
        return `<input type="number" id="${control.name}" name="${control.name}" value="${control.value}">`;
      default:
        throw new Error(`Tipo de control no soportado: ${control.type}`);
    }
  }
}

class FormBuilder {
  constructor() {
    this.controls = [];
    this.action = '';
    this.reset();
  }

  reset() {
    this.controls = [];
    this.action = '';
  }

  // A donde se va a dirigir el formulario en el submit
  setAction(action) { this.action = action; return this; }

  setTextInput(name, value = '') {
    this.controls.push({
      type: 'text',
      name: name,
      value: value
    });
    return this;
  }

  setPasswordInput(name, value = '') {
    this.controls.push({
      type: 'password',
      name: name,
      value: value
    });
    return this;
  }
  setEmailInput(name, value = '') {
    this.controls.push({
      type: 'email',
      name: name,
      value: value
    });
    return this;
  }
  setNumberInput(name, value = '') {
    this.controls.push({
      type: 'number',
      name: name,
      value: value
    });
    return this;
  }

  build() {
    if (this.controls.length === 0) {
      throw new Error('El formulario debe tener al menos un control.');
    }

    const frm = new Form(this.controls, this.action);

    this.reset(); // > Este reset es opcional, y en este caso fucniona porque la instancia (frm) ya fue creada y se puede limpiar el builder para un nuevo formulario.

    return frm;
  }
}

// | El elemento Director nos permite crear formularios de manera mas sencilla, ya que nos permite asignar un builder y luego crear el formulario sin tener que preocuparse por los detalles de la construccion.
class FormDirector {
  /*
  // Esta es la forma en donde se asigna el builder directamente en el constructor
  constructor(builder) {
    this.builder = builder;
  }
  */

  // Esta es la forma en donde se asigna el builder a traves de un setter, lo cual nos permite agregar codigo adicional como validaciones o logs.
  constructor(builder) {
    this.setBuilder(builder);
  }
  setBuilder(builder) {
    console.log('Asignando un nuevo builder al director de formularios');
    this.builder = builder;
  }

  createPeopleForm() {
    this.builder.reset();

    const form = this.builder
      .setAction('/submit')
      .setTextInput('Nombre', 'Director')
      .setTextInput('Apellido', 'Last')
      .build();

    // Inserta el formulario en el DOM
    const form3 = document.getElementById('form3');
    if (form3) form3.innerHTML = form.getContent();
  }

  createLoginForm() {
    this.builder.reset();

    const form = this.builder
      .setAction('/login')
      .setTextInput('Username', 'user')
      .setPasswordInput('Password', 'pass')
      .build();
    // Inserta el formulario en el DOM
    const form4 = document.getElementById('form4');
    if (form4) form4.innerHTML = form.getContent();
  }
}

const formBuilder = new FormBuilder();

function createForm1() {
  try {
    const form = formBuilder
      .setAction('/submit')
      .setTextInput('Nombre', 'defaultUser')
      .setTextInput('Apellido', 'defaultPass')
      .setEmailInput('Email', 'darx@drax.com')
      .setNumberInput('Edad', 30)
      .setPasswordInput('Contraseña', 'defaultPass')
      .build();

    const form1 = document.getElementById('form1');
    form1.innerHTML = form.getContent();

    console.log('Formulario creado:', form);
  }
  catch (error) {
    console.error('Error al crear el formulario:', error.message);
  }
}

function createForm2() {
  try {
    const form = formBuilder
      .setAction('/submit2')
      .setTextInput('Username', 'user123')
      .setPasswordInput('Password', 'pass123')
      .build();

    const form2 = document.getElementById('form2');
    form2.innerHTML = form.getContent();

    console.log('Formulario 2 creado:', form);
  }
  catch (error) {
    console.error('Error al crear el formulario 2:', error.message);
  }
}

createForm1();
createForm2();

const director = new FormDirector(formBuilder);
director.createPeopleForm();
director.createLoginForm();
