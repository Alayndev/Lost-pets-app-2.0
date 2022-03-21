import React from "react";
import css from "./textfield.css";

function TextField(props: { name: string; type: string; placeholder: string }) {
  return (
    <>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={css["search-input"]}
        required
      />
    </>
  );
}

export { TextField };
