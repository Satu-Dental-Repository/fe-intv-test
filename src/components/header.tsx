import { useContext } from "react";
import { PokemonStore } from "../store/pokemon-store.tsx";
import { Link } from "react-router-dom";

export default function Header() {
  const { pokemon: storedPokemons } = useContext(PokemonStore);

  return (
    <header
      className={"px-5 h-16 flex items-center bg-yellow-50 justify-between"}
    >
      <Link to={"/"}>
        <h1 className="text-2xl text-yellow-700 font-semibold">Pokedex</h1>
      </Link>
      <Link to={"/caught-list"}>
        <span className={"text-yellow-700 font-semibold underline"}>
          Caught: {storedPokemons.length}
        </span>
      </Link>
    </header>
  );
}
