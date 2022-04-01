import React from "react";
import css from "./loginPasswordPage.css";
import { LoginPasswordForm } from "components/login-password-form/LoginPasswordForm";

function LoginPasswordPage() {
  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Ingresar</h1>

        <LoginPasswordForm />
      </div>
    </>
  );
}

export { LoginPasswordPage };
