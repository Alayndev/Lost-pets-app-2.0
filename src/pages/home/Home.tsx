import React from "react";
import css from "./home.css";

// Solo para deploy Initial Version
import { Link } from "react-router-dom";

function Home() {
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
