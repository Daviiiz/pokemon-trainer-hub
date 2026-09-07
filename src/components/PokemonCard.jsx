export default function PokemonCard({ pokemon }) {
  const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const nombreFormateado =
    pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);

  return (
    <article className="pokemon-card">
      <a
        className="pokemon-card__link"
        href={`/pokemon/${pokemon.id}`}
      >
        <img
          className="pokemon-card__image"
          src={imagenUrl}
          alt={`Imagen de ${pokemon.nombre}`}
          width="180"
          height="180"
          loading="lazy"
        />

        <h3 className="pokemon-card__name">
          {nombreFormateado}
        </h3>

        <p className="pokemon-card__id">
          #{pokemon.id}
        </p>
      </a>
    </article>
  );
}
