import { useState } from "react";

export default function Contador() {
    const [contador, setContador] = useState(0);

    return (
        <section>
            <h2>Contador React</h2>

            <p>Has puslado {contador} veces</p>

            <button onClick={() => setContador(contador + 1)}>
                Sumar
                </button>
                

        </section>
    );
}