// Primer codigo:

// Codigo original
// var usuario = {
//   nombre: "Pedro",
//    apellido: "Sánchez",
//   edad: 45,
//   profesion: "Barro man",
// };

// console.log(nombreUsuario(usuario));

// function nombreUsuario(user) {
//   const nombreCompleto = "Me llamo " + user.nombre + " " + user.apellido;
//   return nombreCompleto;
// }


// Mi versión del Código 1 ----------------------------------

const usuario = { //Cambiamos la delcaración de la variable a const para evitar que se pueda modificar el objeto
    nombre: "Pedro",
    apellido: "Sánchez",
    edad: 45,
    profesion: "Barro man"
};


function obtenerNombreCompleto(usuario) {
    if (usuario && usuario.nombre && usuario.apellido) {
        return "Me llamo " + usuario.nombre.trim() + " " + usuario.apellido.trim(); // Usamos trim() para eliminar espacios en blanco al inicio y al final de los nombres.
    }
    return "Información incompleta falta alguna propiedad, por favor verifica el objeto usuario";
}

try {
    console.log(obtenerNombreCompleto(usuario)); // Llamamos a la función con el objeto usuario al final para mejorar la legibilidad del código y evitar errores de referencia.
} catch (error) {
    console.error("Error al obtener el nombre completo:", error);
}


// Explicación de mi versión: en el codigo principal se declara un objeto de usuario con propiedades que deberían existir,
// pero si no existen, la función `obtenerNombreCompleto` maneja el caso de que el objeto no tenga las propiedades `nombre` y `apellido`
// devolviendo un mensaje de error en lugar de intentar acceder a propiedades que no existen, lo que podría causar un error en tiempo de ejecución.
// Esto mejora la robustez del código y evita errores inesperados al acceder a propiedades que podrían no estar definidas.
// Estoy considerando unicamente de forma general que alguna propiedad del objeto usuario no exista, pero se puede mejorar aún más. para que sea más específico
// y verificar si existe alguna propiedad en específico, como `nombre` o `apellido`, y devolver un mensaje de error más específico si alguna de ellas no existe.

// Además estoy cambiando el nombre de la función a `obtenerNombreCompleto` para que sea más descriptiva y clara en su propósito.
// Tambien estoy colocando el parametro como `usuario` en lugar de `user` para que sea más claro y consistente con el objeto que se está pasando. si estamos manejando
// variables en español, es mejor que los nombres de las variables sean en español también.

// Por lo general estoy acostumbrado a usar try catch en mis codigos para manejar errores.


// Segundo código: 
// Código original
// const user = {
//     name: "Pedro",
//     last: "Sánchez",
//     age: 45,
//     salary: 1000,
//     profesion: "Barro man",
// };

// function userData(user) {
//     const annualSalary = user.salary * 12;
//     const fullName = `${user.name} ${user.last}`;

//     return `Me llamo ${fullName} y cobro ${annualSalary}€ al año`;
// }

// console.log(userData(user));

// Mi versión del Código 2 ----------------------------------
const usuarioEjemplo = {
    nombre: "Pedro",
    apellido: "Sánchez",
    edad: 45,
    salario: 1000,
    profesion: "Barro man"
};

function obtenerDatosUsuarioYSalario(usuario) {
    if (!usuario.nombre || !usuario.apellido) {
        return 'El usuario debe tener nombre y apellido';
    }

    if (typeof usuario.salario !== 'number' || usuario.salario < 0) {
        return 'El salario debe ser un número positivo';
    }

    const salarioAnual = usuario.salario * 12;
    const nombreCompleto = `${usuario.nombre.trim()} ${usuario.apellido.trim()}`;

    return `Me llamo ${nombreCompleto} y cobro ${salarioAnual.toLocaleString('es-ES')}€ al año`;
}


try {
    console.log(obtenerDatosUsuarioYSalario(usuarioEjemplo));
} catch (error) {
    console.error('Error al obtener datos del usuario:', error.message);
}
// Explicación:
// En este código, decidi implementar convenciones similares a las del primer código, solo que estoy siendo más específico en la validación de las propiedades del objeto `usuario`.
// Estoy verificando si el objeto `usuario` tiene las propiedades `nombre` y `apellido`, y si el `salario` es un número positivo. ya que es importante validar que el salario sea un número positivo para evitar errores en el cálculo del salario anual.
// Si alguna de estas condiciones no se cumple, la función devuelve un mensaje de error específico.
// También al igual que en el primer código estoy usando trim, para quitar los espacios en blanco. y toLocaleString para formatear el salario anual en formato español.
// esto es bueno si queremos mostrar el salario anual en un formato más legible, como "12.000€" en lugar de "12000€". ó si estamos trabajando con diferentes paises, para poder
// entendernos mejor




// Tercer código:
// Código original
// const user = {
//   name: "Álvaro",
//   last: "Morón",
//   age: 30,
//   nationality: "Morocco",
// };

// function esExtrangero(user) {
//   if (user.nationality != "España") {
//     if (user.age == "30") {
//       return "Apto para la ayuda del gobierno";
//     } else {
//       return "No es apto para la ayuda del gobierno";
//     }
//   } else {
//     return "No es apto para la ayuda del gobierno";
//   }
// }

// console.log(esExtrangero(user));

// Mi versión del Código 3 ----------------------------------

const user = {
    nombre: "Álvaro",
    apellido: "Morón",
    edad: 30,
    nacionalidad: "Marruecos"
};


function validarUsuario(usuario) { //Creamos una función para hacer las validaciones del objeto usuario
    if (!usuario || typeof usuario !== 'object') {
        return "El usuario debe ser un objeto válido";
    }
    if (!usuario.nacionalidad || !usuario.edad) {
        return "Faltan propiedades en el objeto usuario";
    }
    if (typeof usuario.edad !== 'number') {
        return "La edad debe ser un número";
    }
    return true; // Retornamos true si todas las validaciones son correctas
}

function esExtranjero(user) {
    const edadValidaParaAyuda = 30; // Definimos una constante para la edad válida para la ayuda del gobierno

    const validacion = validarUsuario(user); // Validamos el objeto usuario antes de continuar

    if (validacion !== true) return validacion; // Si la validación falla, retornamos el mensaje de error

    if (user.nacionalidad !== "España") {
        return (user.edad === edadValidaParaAyuda) ? 
        `Apto para la ayuda del gobierno es extranjero y tiene ${edadValidaParaAyuda} años` :
        `No es apto para la ayuda del gobierno es extranjero pero no tiene ${edadValidaParaAyuda} años`; //Utilizamos un operador ternario para simplificar la lógica
    }
    return "No es apto para la ayuda del gobierno es español"; // Retornamos un mensaje si el usuario es español
}

try {
    console.log(esExtranjero(user));
} catch (error) {
    console.error('Error al verificar el estado del usuario:', error.message);
}
// Explicación:
// En este código, estoy implementando una función `validarUsuario` para validar el objeto `user` antes de realizar cualquier operación.
// Esta función verifica si el objeto es válido, si tiene las propiedades `nacionalidad` y `edad`, y si la `edad` es un número.
// Si alguna de estas condiciones no se cumple, la función devuelve un mensaje de error específico.
// Si todas las validaciones son correctas, la función `esExtranjero` procede a verificar la nacionalidad y la edad del usuario.
// Estoy utilizando un operador ternario para simplificar la lógica de retorno, y estoy manejando errores con un bloque `try-catch` para capturar cualquier error que pueda ocurrir durante la ejecución.