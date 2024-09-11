import { useContext } from "react";
export default function CaughtListPage() {
  const { pokemon: storedPokemons } = useContext(PokemonStore);

  return (
    <section className={"mt-6 p-6 flex flex-col gap-3 items-center"}>
      <h1 className={"text-2xl text-center font-semibold"}>
        Caught List ({storedPokemons.length})
      </h1>
      <ul className={"list-disc"}>
        {storedPokemons.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </section>
  );
}

import { PokemonStore } from "../store/pokemon-store.tsx";
