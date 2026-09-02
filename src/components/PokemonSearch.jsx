import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

export default function PokemonSearch() {
  const [busqueda, setBusqueda] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/pokemon`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los Pokémon.");
        }

        return respuesta.json();
      })
      .then((datos) => {
        setPokemons(datos);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudieron cargar los Pokémon.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const pokemonsFiltrados = pokemons.filter((pokemon) => {
    return pokemon.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
  });

  const hayResultados = pokemonsFiltrados.length > 0;

  return (
    <section>
      <h2>Buscar Pokémon</h2>

      <input
        type="text"
        placeholder="Escribe un Pokémon..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
      />

      {cargando ? (
        <p>Cargando Pokémon...</p>
      ) : error ? (
        <p>{error}</p>
      ) : hayResultados ? (
        <div>
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
