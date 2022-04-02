import React from "react";
import css from "./textfield.css";

function TextField(props: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <>
      <label className={css.label}>
        <div>{props.label}</div>
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          className={css.input}
          defaultValue={props.defaultValue}
          required
        />
      </label>
    </>
  );
}

export { TextField };
