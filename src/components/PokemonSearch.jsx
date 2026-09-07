import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

export default function PokemonSearch() {
  const [busqueda, setBusqueda] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1351")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los Pokémon.");
        }

        return respuesta.json();
      })
      .then((datos) => {
        const pokemonsAdaptados = datos.results.map((pokemon) => {
          const partesUrl = pokemon.url.split("/").filter(Boolean);
          const id = Number(partesUrl[partesUrl.length - 1]);

          return {
            id,
            nombre: pokemon.name,
          };
        });

        setPokemons(pokemonsAdaptados);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudieron cargar los Pokémon.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const pokemonsFiltrados = busqueda.trim()
    ? pokemons.filter((pokemon) => {
        return pokemon.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    : [];

  const hayResultados = pokemonsFiltrados.length > 0;
  const hayBusqueda = busqueda.trim().length > 0;

  return (
    <section className="pokemon-search">
      <h2>Buscar Pokémon</h2>

      <input
        className="pokemon-search__input"
        type="text"
        placeholder="Escribe un Pokémon..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
      />

      {cargando ? (
        <p>Cargando Pokémon...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !hayBusqueda ? (
        <p>Escribe el nombre de un Pokémon para comenzar.</p>
      ) : hayResultados ? (
        <div className="pokemon-grid">
          {pokemonsFiltrados.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron Pokémon.</p>
      )}
    </section>
  );
}
