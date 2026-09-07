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
    <section>
      {builds.map((build) => (
        <article key={build.id}>
          <h2>{build.titulo}</h2>

          <p>
            <strong>Pokémon:</strong> #{build.pokemon_id}
          </p>

          <p>
            <strong>Rol:</strong> {build.rol}
          </p>

          <p>
            <strong>Objeto:</strong> {build.objeto}
          </p>

          <h3>Movimientos</h3>

          <ul>
            <li>{build.movimiento_1}</li>
            <li>{build.movimiento_2}</li>
            <li>{build.movimiento_3}</li>
            <li>{build.movimiento_4}</li>
          </ul>

          {build.descripcion && <p>{build.descripcion}</p>}

          <a href={`/pokemon/${build.pokemon_id}`}>
            Ver Pokémon
          </a>
        </article>
      ))}
    </section>
  );
}
