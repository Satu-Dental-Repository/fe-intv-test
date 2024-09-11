import PokemonStoreProvider from "../store/pokemon-store.tsx";
import Header from "./header.tsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <PokemonStoreProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </PokemonStoreProvider>
  );
}
