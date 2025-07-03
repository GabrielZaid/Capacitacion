interface Animal {
    name: string;
    canEat: boolean;
    canDrink: boolean;
    canSleep: boolean;
    canFly: boolean;
}

interface Dog extends Animal {
    race: string;
    age: number;
}

interface Bird extends Animal {}


const bird: Bird = {
    name: "Bird",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: true
};


const dog: Dog = {
    name: "Dog baby",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: false,
    race: "Golden Retriever",
    age: 3
};

// Ejemplo de uso
console.log("Bird:", bird);
console.log("Dog:", dog);

