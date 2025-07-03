// Comparaciones con booleanos
console.log(false + false); // false + false = 0 porque false es 0
console.log(false + true); // false + true = 1 porque false es 0 y true es 1
console.log(true + true); // true + true = 2 porque true es 1

console.log("Comparaciones con arrays")

// // Comparaciones con arrays
console.log([] === []); // false porque son dos instancias diferentes
console.log([] + []); // "" porque al concatenar dos arrays vacíos se convierte en una cadena vacía
console.log([1, 2] + [3, 4]); // "1,23,4" porque se concatenan las representaciones en cadena de los arrays
console.log([1,3] + [2,4]); // "1,32,4" porque se concatenan las representaciones en cadena de los arrays, es decir se unen los elementos de ambos arrays en una cadena


console.log([1] + 1); // "11" porque se concatena la representación en cadena del array con el número
console.log([1] - 1); // 0 porque se convierte el array en un número

// El operador + puede concatenar strings, por eso convierte a string. El operador - solo suma, fuerza conversión numérica.


console.log("Comparaciones con objetos")

// // Comparaciones con objetos
console.log({} + {}); // {} + {} = "[object Object][object Object]" porque convierte los objetos a su representación en cadena
console.log({} === {}); // false porque son dos instancias diferentes
console.log([] === {}); // false porque un array no es un objeto vacío, son dos tipos de datos diferentes


console.log("Comparaciones especiales")
// // Comparaciones especiales
console.log(null + 1); // 1 porque null se convierte en 0 y 0 + 1 = 1
console.log(undefined + 1); // NaN porque undefined se convierte en NaN y NaN + 1 = NaN
console.log(null == 0); // false porque null solo es igual a undefined
console.log(null <= 0); // true porque null se convierte en 0
console.log(undefined == null); // true porque son considerados iguales

console.log("Operaciones con NaN")
// // Operaciones con NaN
console.log(NaN + 1); // NaN porque NaN + 1 = NaN
console.log(NaN == NaN); // false porque NaN no es igual a sí mismo
console.log(NaN === NaN); // false porque NaN no es igual a sí mismo