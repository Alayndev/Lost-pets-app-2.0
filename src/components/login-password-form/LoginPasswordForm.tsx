import React, { useState } from "react";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import Alert from "@mui/material/Alert";
import { useLocalStorage } from "hooks/useLocalStorage";
import { createOrFindUser, tokenState } from "hooks/useCreateOrFindUser";
import css from "./loginPasswordForm.css";

// Generar Token: Guardar Token para hacer validaciones en Atom y/o en Local Storage
function LoginPasswordForm() {
  const [correctPassword, setCorrectPassword] = useState(true);

  const [token, setToken] = useRecoilState(tokenState);

  const navigate = useNavigate();

  const [emailStateValue, setEmailState] = useRecoilState(emailState);
  console.log(emailStateValue, "email en /login/password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    const userData = { email: emailStateValue, password };

    const { response, token } = await createOrFindUser(userData);

    console.log(response, "res");

    response ? null : setCorrectPassword(false);

    setToken(token);

    response ? navigate("/edit-profile", { replace: true }) : null;
  };

  useLocalStorage("token", token);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <div> CONTRASEÑA </div>
          <input type="password" name="password" required />
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
