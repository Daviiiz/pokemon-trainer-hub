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
      .then((datos) => {
        setBuilds(datos);
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
          <div className="build-card__header">
            <p className="build-card__pokemon">
              Pokémon #{build.pokemon_id}
            </p>

            <h2 className="build-card__title">
              {build.titulo}
            </h2>

            <p className="build-card__role">
              {build.rol}
            </p>
          </div>

          <div className="build-card__content">
            <p>
              <strong>Objeto:</strong> {build.objeto}
            </p>

            <h3>Movimientos</h3>

            <ul className="build-card__moves">
              <li>{build.movimiento_1}</li>
              <li>{build.movimiento_2}</li>
              <li>{build.movimiento_3}</li>
              <li>{build.movimiento_4}</li>
            </ul>

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
