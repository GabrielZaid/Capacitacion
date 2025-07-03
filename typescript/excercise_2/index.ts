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


const myBird: Bird = {
    name: "Bird",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: true
};


const myDog: Dog = {
    name: "Dog baby",
    canEat: true,
    canDrink: true,
    canSleep: true,
    race: "Labrador",
    age: 3,
};

// Ejemplo de uso
console.log("Bird:", myBird);
console.log("Dog:", myDog);

