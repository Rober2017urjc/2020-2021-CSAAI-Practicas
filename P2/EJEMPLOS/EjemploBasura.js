// Un solo INCREMENTAR Y DECREMENTAR CON OBJETOS

console.log("Ejecutando JS...");

//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo
//-- a otro objeto
const gui = {
  display: document.getElementById("display"),
  boton_inc: document.getElementById("boton_inc"),
  boton_dec: document.getElementById("boton_dec")
}

//-- Objeto contador: Contiene el valor y el método para incrementarse
const counter = {
  valor: 0,
  inc : function(value) {
    this.valor += value;
    gui.display.innerHTML = this.valor;
  }
}

//-------- Accciones:
//-- Incrementar contador
gui.boton_inc.onclick = () => {
  counter.inc(1);
}

//-- Decrementar contador
gui.boton_dec.onclick = () =>{
  counter.inc(-1);
}

// 2 incremetnadores y decrementadores

console.log("Ejecutando JS...");



//-- Clase counter para crear contadores
//-- Hay que pasarle como parámetro en el constructor  
//-- el display usado
class counter {

    //-- Constructor del objeto
    //-- Inicializacion de las propiedades
    constructor(display) {

        //-- Valor del contador
        this.valor = 0;

        //-- Almacenar su display
        this.display = display;
    }

    //-- Método inc para actualizar el contador
    //-- Y mostrarlo en el display
    inc(value) {
        this.valor += value;
        this.display.innerHTML = this.valor;
    }
}


//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo
//-- a otro objeto
const gui = {

  //-- Elementos gui del contador 1
  display1: document.getElementById("display1"),
  boton_inc1: document.getElementById("boton_inc1"),
  boton_dec1: document.getElementById("boton_dec1"),

  //-- Elementos gui del contador 2
  display2: document.getElementById("display2"),
  boton_inc2: document.getElementById("boton_inc2"),
  boton_dec2: document.getElementById("boton_dec2"),
}

//-- Crear los dos objetos contadores
const c1 = new counter(gui.display1);
const c2 = new counter(gui.display2);

//-------- Accciones:
//-- Contador 1: Incrementar contador
gui.boton_inc1.onclick = () => {
  c1.inc(1);
}

//-- Decrementar contador
gui.boton_dec1.onclick = () =>{
  c1.inc(-1);
}

//-- Contador 2: Incrementar contador
gui.boton_inc2.onclick = () => {
  c2.inc(1);
}

//-- Decrementar contador
gui.boton_dec2.onclick = () =>{
  c2.inc(-1);
}

// otro ejemplo 

// codigo generico para que cada vez que pulsamos "digito" se ejecute esto
console.log("Ejecutando JS...");

const botones = document.getElementsByClassName("digito")

//-- Función de retrollamada de los botones
//-- botones de la clase dígito
function digito(value) // unica funcion de retrollamada
{
  console.log("Valor: " + value);
}

for (let boton of botones) {

  //-- Establecer la funcion de llamada del boton i
  //-- El parámetro ev.target contiene el boton
  //-- que ha recibido el click
  boton.onclick = (ev) => {
    digito(ev.target.value)
  }
}