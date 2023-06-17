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
  constructor() {
    this.buckets = {};
  }

  // Función hash (djb2)
  hash(key) {
    let hash = 0.6183;
    let paso1 = key * hash;
    let paso2 = Math.trunc((paso1 - Math.trunc(paso1)) * 100);
    return paso2.toString();
  }

  // Insertar un par clave-valor en la tabla hash
  insert(key, value) {
    const hashKey = this.hash(key);
    let clave = key;
    this.buckets[hashKey] = { value, clave };
  }

  // Obtener el valor asociado a una clave
  get(key) {
    const hashKey = this.hash(key);
    const valores = this.buckets[hashKey] || null;
    return {
      valores,
      hashKey,
    };

    // return this.buckets[hashKey] || null;
  }
}

// Crear una instancia de la tabla hash
const myHashTable = new HashTable();

// Manejar el envío del formulario
hashForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se recargue la página

  const key = keyInput.value;
  const value = valueInput.value;

  myHashTable.insert(key, value);

  keyInput.value = "";
  valueInput.value = "";

  showOutput();
});

// Mostrar la salida actual de la tabla hash
function showOutput() {
  llenarDatos.innerHTML = "";

  for (let key in myHashTable.buckets) {
    const { value, clave } = myHashTable.buckets[key];
    const fila = document.createElement("tr");

    fila.innerHTML = `
    <td>${key}</td>
    <td>${clave}</td>
    <td>${value}</td>
    
  `;

    llenarDatos.appendChild(fila);
  }
}

// Manejar el buscador del formulario
formularioBuscar.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se recargue la página

  const key = keyClave.value;
  const { valores, hashKey } = myHashTable.get(key);
  const { value, clave } = valores;
  keyClave.value = "";

  const fila = document.createElement("tr");
  fila.innerHTML += `
                      <td>${hashKey}</td>
                      <td>${clave}</td>
                      <td>${value}</td>
                    `;
  llenaBuscar.appendChild(fila);
});
