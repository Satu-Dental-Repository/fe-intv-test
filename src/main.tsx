import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonDetailPage from "./pages/pokemon-detail.tsx";
import Layout from "./components/layout.tsx";
import CaughtListPage from "./pages/caught-list.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/pokemon/:name", element: <PokemonDetailPage /> },
      { path: "/caught-list", element: <CaughtListPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
