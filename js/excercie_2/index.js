// Lo que devuelve la consola
console.log(a); // esto devolvera undefined porque la variable a no ha sido declarada antes de ser llamada
var a = 10;

console.log(b); // esto devolvera reference error porque la variable b no ha sido declarada antes de ser llamada
let b = "hola";

console.log(c); // esto devolver referenceEror: cannot access 'c' before initialization
const c = "hola";

// ¿Cuál es la diferencia entre var, let y const para que nos de errores diferentes?
// Respuesta:
// La diferencia entre var, let y const radica en su ámbito y comportamiento de hoisting.
// - `var` es una declaración de variable que se eleva (hoisting) al inicio del contexto de ejecución, lo que significa que se puede acceder a ella antes de su declaración, pero su valor será `undefined`.
// - `let` y `const` también son elevadas, pero no se pueden acceder a ellas antes de su declaración, lo que resulta en un error de referencia si se intenta acceder a ellas antes de su inicialización.

// ¿Qué es el hoisting?
// Respuesta:
// Hoisting eleva declaraciones al inicio del contexto. Variables var devuelven undefined, let/const lanzan error antes de inicialización.
// es decir: las declaraciones de variables son "elevadas" a la parte superior de su contexto de ejecución, pero las asignaciones no lo son.


// Parte 2 ---------------------------------------------------------------
sayHi();  //esto devuelve "Hola desde sayHi!"
// Llamada a la función sayHi antes de su declaración, esto es posible debido al hoisting de funciones
// Las funciones son como el sentido arácnido de Spider-Man: siempre están disponibles desde el inicio.
// Puedes llamar a una función antes de declararla porque JavaScript las "eleva" al principio del código.

function sayHi() {
  console.log("Hola desde sayHi!");
}


function sayBye() {
  console.log("Adios desde sayBye!");
}

sayBye(); // Llamada a la función sayBye después de su declaración, esto es posible porque las funciones son elevadas al inicio del contexto de ejecución.
// devuelve "Adios desde sayBye!"