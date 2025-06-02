// | Estados : Clases que representan los diferentes estados del objeto.
class State1 {
  print(ball) {
    ball.ctx.clearRect(0, 0, ball.canvas.width, ball.canvas.height); // Limpiar el canvas
    // ball.ctx.beginPath(); // Iniciar un nuevo camino
    ball.ctx.arc(ball.x, ball.y, ball.ballSize / 2, 0, Math.PI * 2); // Dibujar un círculo
    ball.ctx.fill(); // Rellenar el círculo

    if (ball.canvas.positionX < (ball.canvas.width - ball.ballSize)) {
      ball.canvas.positionX += 5; // Mover la bola a la derecha
    }

    console.log(`Ball is in State1 at position (${ball.x}, ${ball.y})`);
  }
}

// | Contexto : El objeto cuyo comportamiento cambia.
class Ball {
  constructor(ctx, canvas, ballSize) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.ballSize = ballSize;
    this.x = 0;
    this.y = 0;

    this.state = new State1()
  }

  setState(state) {
    this.state = state;
  }
  print() {
    this.state.print(this);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

const ball = new Ball(ctx, canvas, 20);
ball.x = canvas.width / 2; // Posición inicial en el centro del canvas
ball.y = canvas.height / 2; // Posición inicial en el centro del canvas
console.log(`Ball created at position (${ball.x}, ${ball.y}) with size ${ball.ballSize} `);

ball.print(); // Imprime el estado inicial de la bola
