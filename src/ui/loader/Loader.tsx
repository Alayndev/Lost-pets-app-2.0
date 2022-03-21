import React from "react";
import css from "./loader.css";

function Loader() {
  return (
    <div className={css["loader-container"]}>
      <div className={css.loader}></div>
    </div>
  );
}

export { Loader };
