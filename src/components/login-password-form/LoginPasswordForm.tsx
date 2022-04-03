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
import { userNameState } from "../../lib/atoms";
import { useSetRecoilState } from "recoil";

// Generar Token: Guardar Token para hacer validaciones en Atom y/o en Local Storage
function LoginPasswordForm() {
  const [correctPassword, setCorrectPassword] = useState(true);

  const [token, setToken] = useRecoilState(tokenState);

  const setUserName = useSetRecoilState(userNameState);

  const navigate = useNavigate();

  const [emailStateValue, setEmailState] = useRecoilState(emailState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    const userData = { email: emailStateValue, password };

    const { response, token, userName } = await createOrFindUser(userData);

    console.log(response, "res");

    response ? null : setCorrectPassword(false);

    if (token) {
      setToken(token);
    }

    setUserName(userName);

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
