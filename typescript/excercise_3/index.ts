interface Animal {
    name: string;
    canEat: boolean;
    canDrink: boolean;
    canSleep: boolean;
}

interface Dog extends Animal {
    race: "Husky" | "Labrador" | "Chucho";
    age: number;
}

interface Bird extends Animal {
    canFly: boolean;
}

interface Cat extends Animal {
    color: string;
}

interface Snake extends Animal {}

const bird1: Bird = {
    name: "Bird",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: true
};

const dog1: Dog = {
    name: "Dog baby",
    canEat: true,
    canDrink: true,
    canSleep: true,
    race: "Labrador",
    age: 3
};

const cat = {
    name: "Cat",
    color: "Black",
    canSleep: true
};

const snake = {
    canEat: true,
    canDrink: true,
    canSleep: true
};

// Ejemplo de uso
console.log("Bird:", bird1);
console.log("Dog:", dog1);
console.log("Cat:", cat);
console.log("Snake:", snake);
