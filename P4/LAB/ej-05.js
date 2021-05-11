console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso a los 3 deslizadores
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');

//-- Valores de los deslizadores
const value_R = document.getElementById('value_R');
const value_G = document.getElementById('value_G');
const value_B = document.getElementById('value_B');

//Estados de la imagen
const ESTADO = {
  ORIGINAL: 0,
  GRIS: 1,
  BYW: 2
}

// Arrancamos desde el estado inicial
let estado = ESTADO.ORIGINAL;

//Botones
const gray = document.getElementById('gray');
const original = document.getElementById('ori');
const bw = document.getElementById('bw');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

if(estado == ESTADO.ORIGINAL){
  function colors(){
    //-- Mostrar el nuevo valor del deslizador
    value_R.innerHTML = deslizador_R.value;
    value_G.innerHTML = deslizador_G.value;
    value_B.innerHTML = deslizador_B.value;  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
    
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    //-- Obtener el array con todos los píxeles
    let data = imgData.data  
    
    //-- Obtener el umbral de los colores del desliador
    var umbral_R = deslizador_R.value;
    var umbral_G = deslizador_G.value;
    var umbral_B = deslizador_B.value;
    
    //-- Filtrar la imagen según el nuevo umbral
    //triplicamos este for y tenemos ya para color rojo verde azul
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral_R)
        data[i] = umbral_R;
    }
    for (let i = 1; i < data.length; i+=4) {// i=1 verde
        if (data[i] > umbral_G)
        data[i] = umbral_G;
    }
    for (let i = 2; i < data.length; i+=4) {//i=2 azul
      if (data[i] > umbral_B)
        data[i] = umbral_B;
    }
     
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  
  
  //-- Funcion de retrollamada de los deslizadores
  deslizador_R.oninput = () => {
    colors();
  }
  deslizador_G.oninput = () => {
    colors();
  }
  deslizador_B.oninput = () => {
    colors();
  }
}

if( estado == ESTADO.GRIS){
  gray.onclick = () => {
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      var R = data[i];
      var G = data[i+1];
      var B = data[i+2];
      var gris = (3 * R + 4 * G + B)/8;
      gris = data[i] = data[i+1] = data[i+2];
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
}

original.onclick = () => {
  ctx.drawImage(img, 0,0);
  deslizador_R.value = 255;
  value_R.innerHTML = deslizador_R.value;
  deslizador_G.value = 255;
  value_G.innerHTML = deslizador_G.value;
  deslizador_B.value = 255;
  value_B.innerHTML = deslizador_B.value;
}

if( estado == ESTADO.BYW){
  bw.onclick = () => {

    //-- Para hacer esta funcion primero debemos haber pulsado el boton "Grises"
  
    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    //-- Obtener el array con todos los píxeles
    data = imgData.data;
  
    //--Variables
    var pixel = imgData.data;
    var umbral = 110;
    var nuevaImagen = 0;
  
    //-- Bucle para umbralizar la imagen
    for (let i = 0; i < data.length; i+=4) {
  
      pixel = data[i];
  
      //-- Si el valor guardado en 'pixel' es mayor que el umbral decidido
      //-- lo ponemos a intensidad maxima y si no, a intensidad minima
      if (pixel > umbral) {
          nuevaImagen = 255;
      } else {
          nuevaImagen = 0;
      }
  
      data[i] = nuevaImagen;
      data[i + 1] = nuevaImagen;
      data[i + 2] = nuevaImagen;
    }
  
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
}

window.onkeydown = (e) => {
  //-- Según la tecla se hace una cosa u otra
  switch (e.key) {
    case "4":
      estado = ESTADO.GRIS;
    break;
    case "6":
      estado = ESTADO.BYW;
    break;
  }
}


console.log("Fin...");