# Ejercicio 3, Acierta los console.log

¿Qué salida tendrán los siguientes `console.log`?

```js
// Comparaciones con booleanos
console.log(false + false);
console.log(false + true);
console.log(true + true);

// Comparaciones con arrays
console.log([] === []);
console.log([] + []);
console.log([1, 2] + [3, 4]);
console.log([1] + 1);
console.log([1] - 1);

// Comparaciones con objetos
console.log({} + {});
console.log({} === {});
console.log([] === {});

// Comparaciones especiales
console.log(null + 1);
console.log(undefined + 1);
console.log(null == 0);
console.log(null <= 0);
console.log(undefined == null);

// Operaciones con NaN
console.log(NaN + 1);
console.log(NaN == NaN);
console.log(NaN === NaN);
```