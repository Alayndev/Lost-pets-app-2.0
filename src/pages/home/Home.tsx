import React, { useEffect } from "react";
import css from "./home.css";

// Solo para deploy Initial Version
import { Link } from "react-router-dom";

function Home() {
  // Solo para deploy Initial Version
  useEffect(() => {
    const exist = fetch(
      "https://lost-pet-finder-app.herokuapp.com/users/registered?email=saezalayn@gmail.com",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  console.log("Hola");

  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>
          Hace tu búsqueda desde la caja de búsqueda
        </h1>

        <Link to="/login">
          <button> Ir a Login </button>
        </Link>
      </div>
    </>
  );
}

export { Home };
