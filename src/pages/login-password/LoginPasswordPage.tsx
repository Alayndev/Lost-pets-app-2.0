import React, { useState } from "react";
import css from "./loginPasswordPage.css";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import Alert from "@mui/material/Alert";

// TODO: Abstraer a la Page de la lógica
function LoginPasswordPage() {
  const [correctPassword, setCorrectPassword] = useState(true);

  const navigate = useNavigate();

  const [emailStateValue, setEmailState] = useRecoilState(emailState); // TODO: Necesito el email para hacer la llamda a la API y verificar que la contraseña coincida con ese email. Para obtener el email estoy usando el Atom de Recoil pero al hacer refresh se pierde el email ingresado en la page /login, por eso hacer Custom Hook useLocalStorage como explico en LoginPage.tsx. Guardar en localStorage y recuperarlo de ahí para obtenerlo aquí y llamar a la API
  console.log(emailStateValue, "email en /login/password");

  // TODO: Abstraer a la Page de la lógica
  const createOrFindUser = async (userData: {
    email: string;
    password: string;
  }) => {
    const res = await (
      await fetch("https://lost-pet-finder-app.herokuapp.com/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    ).json();

    console.log(res);

    if (res.passwordValideted.exist === true) {
      navigate("/user-data", { replace: true });
    } else {
      setCorrectPassword(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    const userData = { email: emailStateValue, password };

    createOrFindUser(userData);
  };

  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Ingresar</h1>

        {/* Hacerlo un Componente */}
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
      </div>
    </>
  );
}

export { LoginPasswordPage };
