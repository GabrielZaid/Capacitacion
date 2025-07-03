function findAnimal(animal) {
    const animals = {
        perro: "Perro",
        gato: "Gato",
        loro: "Loro"
    };
    return animals[animal] || "Animal no encontrado";
}

// Objetos de usuario para usar en el Map
const user = {
    nombre: "Álvaro",
    apellido: "Morón",
    edad: 30,
    nacionalidad: "Marruecos"
};

const userEspanol = {
    nombre: "Álvaro",
    apellido: "Morón",
    edad: 30,
    nacionalidad: "España"
};

const user2 = {
    nombre: "Álvaro",
    apellido: "Morón",
    edad: 30,
    nacionalidad: "Marruecos"
};

// 1. Crear un mapa llamado myMap
const myMap = new Map();

// 2. Añadir los siguientes key-valor al map
myMap.set('moroso', user);
myMap.set('agarrado', user);
myMap.set('generoso', user2);
myMap.set('funcion', findAnimal);
myMap.set('color', 'Azul');



// 3. Mostrar por consola todo el map
console.log('3. Mostrando todo el map:');
function mostrarMap(map) {
    for (const [key, value] of map.entries()) {
        if (typeof value === 'object' && value !== null) {
            console.log(`${key}:`);
            for (const [objKey, objValue] of Object.entries(value)) {
                console.log(`  ${objKey}: ${objValue}`);
            }
        } else if (typeof value === 'function') {
            console.log(`${key}: [Función: ${value.name}]`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }
}
mostrarMap(myMap);

// 4. Mostrar por consola el key 'moroso'
console.log('\n4. Mostrando el key "moroso":');
console.log('moroso:', myMap.get('moroso'));

// 5. Comprobar si existe la key 'hola'
console.log('\n5. Comprobando si existe la key "hola":');
console.log('¿Existe la key "hola"?', myMap.has('hola'));

// 6. Mostrar por consola el tamaño total del map
console.log('\n6. Tamaño total del map:');
console.log('Tamaño del map:', myMap.size);

// 7. Recorrer el map con un forEach
console.log('\n7. Recorriendo el map con forEach:');
myMap.forEach((value, key) => {
    if (typeof value === 'object' && value !== null) {
        console.log(`${key}: [Objeto con propiedades: ${Object.keys(value).join(', ')}]`);
    } else if (typeof value === 'function') {
        console.log(`${key}: [Función: ${value.name}]`);
    } else {
        console.log(`${key}: ${value}`);
    }
});

// 8. Eliminar el elemento 'agarrado' del map
console.log('\n8. Eliminando el elemento "agarrado":');
console.log('¿Se eliminó "agarrado"?', myMap.delete('agarrado'));
console.log('Tamaño después de eliminar:', myMap.size);
console.log('Elementos restantes:', Array.from(myMap.keys()));

// 9. Limpiar el mapa por completo
console.log('\n9. Limpiando el mapa por completo:');
myMap.clear();
console.log('Tamaño después de limpiar:', myMap.size);
console.log('¿Está vacío?', myMap.size === 0);

console.log('\n=== FIN DEL EJERCICIO ===');