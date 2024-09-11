import { createContext, ReactNode, useState } from "react";
import { Pokemon } from "../components/poke-list.tsx";

interface PokemonContext {
  pokemon: Pokemon[];
  setPokemon: (pokemon: Pokemon[]) => void;
  addPokemonToStore: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
}

export const PokemonStore = createContext<PokemonContext>({
  pokemon: [],
  setPokemon: () => {},
  addPokemonToStore: () => {},
  removePokemon: () => {},
});

export default function PokemonStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  function addPokemonToStore(pokemon: Pokemon) {
    const found = pokemonList.find((v) => v.name === pokemon.name);
    if (!found) {
      setPokemonList((pokemonList) => [...pokemonList, pokemon]);
    }
  }

  function removePokemon(pokemon: Pokemon) {
    setPokemonList(pokemonList.filter((v) => v.name !== pokemon.name));
  }

  return (
    <PokemonStore.Provider
      value={{
        pokemon: pokemonList,
        setPokemon: setPokemonList,
        addPokemonToStore,
        removePokemon,
      }}
    >
      {children}
    </PokemonStore.Provider>
  );
}
