import { useEffect, useState } from "react";

export default function BuildList() {
  const [builds, setBuilds] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/builds`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las Builds.");
        }

        return respuesta.json();
      })
      .then(async (datos) => {
        const buildsEnriquecidas = await Promise.all(
          datos.map(async (build) => {
            const respuestaPokemon = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${build.pokemon_id}`
            );

            if (!respuestaPokemon.ok) {
              throw new Error(
                "No se pudieron cargar los datos de los Pokémon."
              );
            }

            const pokemon = await respuestaPokemon.json();

            const nombrePokemon =
              pokemon.name.charAt(0).toUpperCase() +
              pokemon.name.slice(1);

            const tiposPokemon = pokemon.types.map(
              (tipo) => tipo.type.name
            );

            const imagenPokemon =
              pokemon.sprites.other["official-artwork"].front_default;

            return {
              ...build,
              pokemon_nombre: nombrePokemon,
              pokemon_tipos: tiposPokemon,
              pokemon_imagen: imagenPokemon,
            };
          })
        );

        setBuilds(buildsEnriquecidas);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudieron cargar las Builds.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando Builds...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (builds.length === 0) {
    return <p>Todavía no hay Builds destacadas.</p>;
  }

  return (
    <section className="build-grid">
      {builds.map((build) => (
        <article
          className="build-card"
          key={build.id}
        >
          <div className="build-card__visual">
            <img
              className="build-card__image"
              src={build.pokemon_imagen}
              alt={`Artwork oficial de ${build.pokemon_nombre}`}
              width="220"
              height="220"
              loading="lazy"
            />

            <span className="build-card__pokemon-id">
              #{build.pokemon_id}
            </span>
          </div>

          <div className="build-card__content">
            <div className="build-card__types">
              {build.pokemon_tipos.map((tipo) => (
                <span
                  className={`pokemon-type pokemon-type--${tipo}`}
                  key={tipo}
                >
                  {tipo}
                </span>
              ))}
            </div>

            <p className="build-card__pokemon">
              {build.pokemon_nombre}
            </p>

            <h2 className="build-card__title">
              {build.titulo}
            </h2>

            <p className="build-card__role">
              {build.rol}
            </p>

            <div className="build-card__item">
              <span>Objeto</span>

              <strong>
                {build.objeto}
              </strong>
            </div>

            {build.descripcion && (
              <p className="build-card__description">
                {build.descripcion}
              </p>
            )}
          </div>

          <div className="build-card__actions">
            <a
              className="build-card__button"
              href={`/builds/${build.id}`}
            >
              Ver Build
            </a>

            <a
              className="build-card__secondary"
              href={`/pokemon/${build.pokemon_id}`}
            >
              Ver Pokémon
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
