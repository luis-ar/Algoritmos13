// Obtener referencias a los elementos del formulario y la salida
const hashForm = document.getElementById("hashForm");
const keyInput = document.getElementById("keyInput");
const valueInput = document.getElementById("valueInput");
const output = document.getElementById("output");
//
const llenarDatos = document.querySelector(".llenar-datos");
const llenaBuscar = document.querySelector(".llenaBuscar");
const formularioBuscar = document.querySelector(".formularioBuscar");
const keyClave = document.querySelector(".keyClave");
// Definir la clase HashTable
class HashTable {
  //definir el valor constante
  constante = Math.random();
  constructor() {
    this.buckets = {};
  }

  // Función hash: se va a usar el metodo de la multiplicacion para calcular el indice de cada valor introducido
  hash(claveIntroducidaTeclado) {
    console.log(this.constante);
    let paso1 = claveIntroducidaTeclado * this.constante;
    let paso2 = Math.trunc((paso1 - Math.trunc(paso1)) * 100);
    return paso2.toString();
  }

  // Insertar la clave-valor en la tabla hash para luego almacenar en un arreglo en la posicion segun el valor que nos retorna la funcion hash
  insert(claveIntroducidaTeclado, valorIntroducido) {
    const indiceObtenido = this.hash(claveIntroducidaTeclado);
    let clave = claveIntroducidaTeclado;
    this.buckets[indiceObtenido] = { valorIntroducido, clave };
  }

  // Obtener el valor asociado a una clave, se encuentra el valor que relaciona con la clave que se esta buscando
  get(claveIntroducidaTeclado) {
    const indiceObtenido = this.hash(claveIntroducidaTeclado);
    const valores = this.buckets[indiceObtenido] || null;
    return {
      valores,
      indiceObtenido,
    };
  }
}

// Crear una instancia de la tabla hash
const myHashTable = new HashTable();

// Manejar el envío del formulario
hashForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se recargue la página al presionar el boton de insertar

  const claveTeclado = keyInput.value;
  const valorTeclado = valueInput.value;

  myHashTable.insert(claveTeclado, valorTeclado);

  keyInput.value = "";
  valueInput.value = "";
  //mostar lo guardado en la tabla
  showOutput();
});

// funcion para mostrar la salida actual de la tabla hash
function showOutput() {
  llenarDatos.innerHTML = "";

  for (let key in myHashTable.buckets) {
    const { valorIntroducido, clave } = myHashTable.buckets[key];
    const fila = document.createElement("tr");

    fila.innerHTML = `
    <td>${key}</td>
    <td>${clave}</td>
    <td>${valorIntroducido}</td>
    
  `;

    llenarDatos.appendChild(fila);
  }
}

// Manejar el buscador del formulario
formularioBuscar.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se recargue la página

  const claveTeclado = keyClave.value;
  const { valores, indiceObtenido } = myHashTable.get(claveTeclado);
  const { valorIntroducido, clave } = valores;
  keyClave.value = "";

  const fila = document.createElement("tr");
  fila.innerHTML += `
                      <td>${indiceObtenido}</td>
                      <td>${clave}</td>
                      <td>${valorIntroducido}</td>
                    `;
  llenaBuscar.appendChild(fila);
});
