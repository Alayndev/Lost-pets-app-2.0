import React from "react";
import css from "./loginPage.css";
import { LoginForm } from "components/login-form/LoginForm";

function LoginPage() {
  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Ingresar</h1>

        <LoginForm />
      </div>
    </>
  );
}

export { LoginPage };
