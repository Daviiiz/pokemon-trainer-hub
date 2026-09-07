export default function PokemonCard({ pokemon }) {
  const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const nombreFormateado =
    pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);

  return (
    <article>
      <img
        src={imagenUrl}
        alt={`Imagen de ${pokemon.nombre}`}
        width="180"
        height="180"
        loading="lazy"
      />

      <h3>{nombreFormateado}</h3>
      <p>#{pokemon.id}</p>
    </article>
  );
}
