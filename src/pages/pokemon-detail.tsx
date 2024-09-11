import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios.ts";

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemonDetail = async (name: string) => {
      return axios.get(`/pokemon/${name}`);
    };

    if (name) {
      fetchPokemonDetail(name).then(({ data }) => {
        setPokemon(data);
      });
    }
  }, [name]);

  return (
    <>
      {pokemon ? (
        <div className="p-6 flex gap-12">
          <img
            className={"w-[300px] h-[300px]"}
            src={pokemon.sprites.front_default}
            alt=""
          />
          <pre className={"break-all whitespace-pre-wrap"}>
            {JSON.stringify(pokemon)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
