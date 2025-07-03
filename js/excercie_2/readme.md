# Ejercicio 2, Hoisting

Que devuelve por consola cada uno de los siguientes `console.log`

---

```js
console.log(a);
var a = "hola";
```

---

```js
console.log(b);
let b = "hola";
```

---

```js
console.log(c);
const c = "hola";
```

---

```js
sayHi();

function sayHi() {
  console.log("Hola desde sayHi!");
}
```

---

```js
function sayBye() {
  console.log("Adios desde sayBye!");
}

sayBye();
```