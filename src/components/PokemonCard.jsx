export default function PokemonCard({ pokemon }) {
  return (
    <article>
      <h3>{pokemon.nombre}</h3>
      <p>#{pokemon.id}</p>
    </article>
  );
}