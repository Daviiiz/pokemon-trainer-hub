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
      <div className="pokemon-search__header">
        <div>
          <p className="pokemon-search__eyebrow">
            Buscador
          </p>

          <h2 className="pokemon-search__title">
            Buscar Pokémon
          </h2>
        </div>

        <span className="pokemon-search__counter">
          {hayBusqueda
            ? `${pokemonsFiltrados.length} resultados`
            : "1351 disponibles"}
        </span>
      </div>

      <div className="pokemon-search__control">
        <span
          className="pokemon-search__icon"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          className="pokemon-search__input"
          type="search"
          placeholder="Escribe un Pokémon..."
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          aria-label="Buscar Pokémon por nombre"
        />

        {hayBusqueda && (
          <button
            className="pokemon-search__clear"
            type="button"
            onClick={() => setBusqueda("")}
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="pokemon-search__status">
        {cargando ? (
          <div className="pokemon-search__message">
            <span
              className="pokemon-search__loader"
              aria-hidden="true"
            ></span>

            <p>Cargando Pokémon...</p>
          </div>
        ) : error ? (
          <div className="pokemon-search__message pokemon-search__message--error">
            <span aria-hidden="true">!</span>

            <p>{error}</p>
          </div>
        ) : !hayBusqueda ? (
          <div className="pokemon-search__message">
            <span
              className="pokemon-search__message-icon"
              aria-hidden="true"
            >
              ◉
            </span>

            <div>
              <strong>Empieza a buscar</strong>

              <p>
                Escribe el nombre de un Pokémon para consultar
                sus datos y estrategias.
              </p>
            </div>
          </div>
        ) : hayResultados ? (
          <div className="pokemon-search__results">
            <div className="pokemon-search__results-header">
              <p>
                Resultados para
                <strong> “{busqueda}”</strong>
              </p>

              <span>
                {pokemonsFiltrados.length}
              </span>
            </div>

            <div className="pokemon-grid">
              {pokemonsFiltrados.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="pokemon-search__message pokemon-search__message--empty">
            <span
              className="pokemon-search__message-icon"
              aria-hidden="true"
            >
              ?
            </span>

            <div>
              <strong>No encontramos ese Pokémon</strong>

              <p>
                Prueba con otro nombre o revisa la búsqueda.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
