// Interfaces para estructuras anidadas
interface NamedAPIResource {
    name: string;
    url: string;
}

interface Ability {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

interface Cries {
    latest: string;
    legacy: string;
}

interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
}

interface VersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

interface HeldItem {
    item: NamedAPIResource;
    version_details: VersionDetail[];
}

interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    order: number | null;
    version_group: NamedAPIResource;
}

interface Move {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

interface PastAbility {
    ability: NamedAPIResource | null;
    is_hidden: boolean;
    slot: number;
}

interface PastAbilities {
    abilities: PastAbility[];
    generation: NamedAPIResource;
}

interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        "official-artwork": {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
    versions: {
        [generationKey: string]: {
            [gameKey: string]: {
                [spriteKey: string]: string | null;
            };
        };
    };
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

interface Type {
    slot: number;
    type: NamedAPIResource;
}

// Interfaz principal del Pokémon
export default interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: Cries;
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities: PastAbilities[];
    past_types: any[]; 
    species: NamedAPIResource;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}
