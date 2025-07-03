// Ejercicio 1.

// Convenciones de nomenclatura
let userName; // Declaración usando camelCase
let UserName; // Declaración usando PascalCase
let user_name; // Declaración usando snake_case
let user-name; // Declaración usando kebab-case (no recomendado en JavaScript, ya que no es válido para nombres de variables)

// Declaración de variables
let descriptionLet = {
    description: "Se declara let para variables que pueden cambiar su valor",
    caracteristicas: {
        scope: "No puede ser redeclarada en el mismo scope",
        hoisting: "No se eleva al inicio del bloque",
        reassignable: "Se puede reasignar un nuevo valor"
    }
};


const descriptionConst = {
    description: "Se declara const para variables que no cambian su valor",
    caracteristicas: {
        scope: "No puede ser redeclarada en el mismo scope",
        hoisting: "No se eleva al inicio del bloque",
        reassignable: "No se puede reasignar un nuevo valor"
    }
};

var descriptionVar = {
    description: "Se declara var para variables que pueden cambiar su valor, pero no es recomendable usarla en versiones (ES6+)",
    caracteristicas: {
        scope: "Puede ser redeclarada en el mismo scope",
        hoisting: "Se eleva al inicio del contexto",
        reassignable: "Se puede reasignar un nuevo valor"
    }
};


// ¿Qué es el scope?
let scopeDescription = {
    description: "El scope se refiere al alcance o visibilidad de una variable en el código.",
    tipos: {
        global: "Variables declaradas fuera de cualquier función, accesibles en cualquier parte del código.",
        local: "Variables declaradas dentro de una función, solo accesibles dentro de esa función.",
        bloque: "Variables declaradas dentro de un bloque (if, for, etc.), solo accesibles dentro de ese bloque."
    }
};

// ¿Cual forma de declarar variables utilizaria?
let preferredDeclaration = {
    description: "Utilizaría 'const' para variables que no cambiarían como configuraciones, arrays de referencia funciones etc... y utilizaría 'let' para variables que pueden cambiar su valor. como contadores en bucles o variables que dependen de condiciones.",
    reason: "Me ayudaría a mantener un código más limpio y predecible, evitando errores de redeclaración y mejorando la legibilidad del código. además que es lo recomendado en las versiones más recientes de JavaScript (ES6+)"
};