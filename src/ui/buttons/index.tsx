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

function DropzoneButton(props: { children: any }) {
  return (
    <>
      <div className={css.primaryButton}>{props.children}</div>
    </>
  );
}

export { PrimaryButton, SecondaryButton, DropzoneButton };
