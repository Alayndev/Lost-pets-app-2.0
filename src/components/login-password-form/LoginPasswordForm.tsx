import React, { useState } from "react";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import Alert from "@mui/material/Alert";
import css from "./loginPasswordForm.css";
import { createOrFindUser } from "lib/api";
import { setLSItem } from "lib/localStorage";
import { tokenState } from "lib/atoms";

// Generar Token: Guardar Token para hacer validaciones en Atom y/o en Local Storage
function LoginPasswordForm() {
  const [correctPassword, setCorrectPassword] = useState(true);

  const [token, setToken] = useRecoilState(tokenState);

  const navigate = useNavigate();

  // TODO: Quiza usar el email de LS como en SignUpForm.tsx. Es el email que acaba de ingresar el user pero por las dudas de que haga refresh. Sino obtenerlo de ambos lados y usar ||
  const [emailStateValue, setEmailState] = useRecoilState(emailState);
  console.log(emailStateValue, "email en /login/password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    const userData = { email: emailStateValue, password };

    const { response, token } = await createOrFindUser(userData);

    console.log(response, "res");

    response ? null : setCorrectPassword(false);

    if (token) {
      setToken(token);
    }

    response ? navigate("/user-data", { replace: true }) : null;
  };

  if (token) {
    setLSItem("token", token);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <div> CONTRASEÑA </div>
          <input
            type="password"
            name="password"
            required
            onChange={() => setCorrectPassword(true)}
          />
        </label>

        <div className={css.buttonSection}>
          <PrimaryButton> Ingresar </PrimaryButton>
        </div>
      </form>

      {correctPassword === false ? (
        <Alert severity="error"> CONTRASEÑA INCORRECTA </Alert>
      ) : null}
    </>
  );
}

export { LoginPasswordForm };
