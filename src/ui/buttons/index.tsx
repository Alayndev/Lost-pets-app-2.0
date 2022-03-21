import React from "react";
import css from "./button.css";

function Button(props: { children: any }) {
  return (
    <>
      <button className={css["search-button"]}>{props.children}</button>
    </>
  );
}

function SecondaryButton(props: { children: any }) {
  return (
    <>
      <button className={css["secondaryButton"]}>{props.children}</button>
    </>
  );
}

export { Button, SecondaryButton };
