# Ejercicio 4, refactoriza el código

Dado los siguientes códigos, refactorízalos como consideres, si consideras que está bien, explica el motivo.

### Primer código

- Tenemos una función que saca el nombre completo del usuario con el nombre y apellido

```js
var usuario = {
  nombre: "Pedro",
  apellido: "Sánchez",
  edad: 45,
  profesion: "Barro man",
};

console.log(nombreUsuario(usuario));

function nombreUsuario(user) {
  const nombrCompleto = "Me llamo " + user.nombre + " " + user.apellido;

  return nombrCompleto;
}
```

### Segundo código

- Tenemos una función que calcula el salario anual y el nombre del usuario

```js
const user = {
  name: "Pedro",
  last: "Sánchez",
  age: 45,
  salary: 1000,
  profesion: "Barro man",
};

function userData(user) {
  const annualSalary = user.salary * 12;
  const fullName = `${user.name} ${user.last}`;

  return `Me llamo ${fullName} y cobro ${annualSalary}€ al año`;
}

console.log(userData(user));
```

### Tercer código

- Si el usuario tiene 30 años y no es español, recibirá una ayuda del gobierno de 2000€

```js
const user = {
  name: "Álvaro",
  last: "Morón",
  age: 30,
  nationality: "Morocco",
};

function esExtrangero(user) {
  if (user.nationality != "España") {
    if (user.age == "30") {
      return "Apto para la ayuda del gobierno";
    } else {
      return "No es apto para la ayuda del gobierno";
    }
  } else {
    return "No es apto para la ayuda del gobierno";
  }
}

console.log(esExtrangero(user));
```