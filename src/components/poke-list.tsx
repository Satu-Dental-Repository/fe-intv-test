import { useContext, useEffect, useState } from "react";
import axios from "../lib/axios.ts";
import { PokemonStore } from "../store/pokemon-store.tsx";
import { Link } from "react-router-dom";

export type Pokemon = {
  name: string;
  url: string;
};

interface PokemonPaginationResponse {
  count: number;
  next: string;
  previous: boolean;
  results: Pokemon[];
}

const LIMIT = 30;

export default function PokeList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const {
    addPokemonToStore,
    pokemon: storedPokemons,
    removePokemon,
  } = useContext(PokemonStore);

  useEffect(() => {
    const fetchPokemon = async () => {
      return axios.get<PokemonPaginationResponse>(
        `/pokemon?limit=${LIMIT}&offset=${offset}`,
      );
    };

    fetchPokemon().then(({ data }) => {
      setPokemonList([...data.results]);
      setHasPrevious(data.previous);
    });
  }, [offset]);

  function handleCatch(pokemon: Pokemon) {
    addPokemonToStore(pokemon);
  }

  function handleRelease(pokemon: Pokemon) {
    removePokemon(pokemon);
  }

  function handlePreviousPage() {
    setOffset((offset) => offset - LIMIT);
  }

  function handleNextPage() {
    setOffset((offset) => offset + LIMIT);
  }

  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="grid grid-cols-6 gap-6">
        {pokemonList.map((pokemon) => (
          <div
            className="flex flex-col gap-3 shadow px-3 py-4 rounded"
            key={pokemon.name}
          >
            <Link to={`/pokemon/${pokemon.name}`}>
              <h1 className={"text-lg text-yellow-900 font-semibold underline"}>
                {pokemon.name}
              </h1>
            </Link>
            {storedPokemons.find((v) => v.name === pokemon.name) ? (
              <button
                onClick={() => handleRelease(pokemon)}
                className="text-center text-red-700 font-medium bg-yellow-100 rounded-md h-8 px-3"
              >
                Release Me!
              </button>
            ) : (
              <button
                onClick={() => handleCatch(pokemon)}
                className="text-center text-green-700 font-medium bg-yellow-50 rounded-md h-8 px-3"
              >
                Catch Me!
              </button>
            )}
          </div>
        ))}
      </section>

      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPrevious}
          className={
            "disabled:bg-gray-50 disabled:text-gray-500 bg-yellow-50 text-yellow-900 px-5 h-10"
          }
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={"bg-yellow-50 text-yellow-900 px-5 h-10"}
        >
          Next
        </button>
      </div>
    </div>
  );
}
