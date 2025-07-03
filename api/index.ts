import Pokemon from "./types/Pokemon";


async function getPokemonData(): Promise<Pokemon> {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Ocurrio un error al obtener los datos del Pokémon: " + response.statusText);
    }
    
    if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Ocurrio un error al obtener los datos del Pokémon: la respuesta no es JSON");
    }


    const data: Pokemon = await response.json() as Pokemon;
    if (!data) {
        throw new Error("Ocurrio un error al obtener los datos del Pokémon: la respuesta es nula o indefinida");
    }
    return data;
}


export default async function listPokemon() {
    const data: Pokemon = await getPokemonData();

    if (!data) {
        throw new Error("No se pudo obtener la información del Pokémon.");
    }

    // console.log("Pokemon caracteristicas:");
    // console.log("Nombre:", data.name);
    // console.log("Altura:", data.height);
    // console.log("Peso:", data.weight);
    // console.log("Habilidades:", data.abilities.map(ability => ability.ability.name).join(", "));
    // console.log("Tipos:", data.types.map(type => type.type.name).join(", "));
    // console.log("Experiencia Base:", data.base_experience);
    // console.log("Sprites:", data.sprites.front_default);
    // console.log("Movimientos:", data.moves.map(move => move.move.name).join(", "));

    console.log(data)

}

// Call the function
listPokemon().catch(console.error);

