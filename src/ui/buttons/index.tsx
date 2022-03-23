import React from "react";
import css from "./button.css";

function PrimaryButton(props: { children: any }) {
  return (
    <>
      <button className={css.primaryButton}>{props.children}</button>
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

export { PrimaryButton, SecondaryButton };
