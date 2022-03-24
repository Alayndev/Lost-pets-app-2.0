import { createOrFindUser, tokenState } from "hooks/useCreateOrFindUser";
import { useLocalStorage } from "hooks/useLocalStorage";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { PrimaryButton } from "ui/buttons";
import Alert from "@mui/material/Alert";

// TODO: Terminar esta page, dejar la lógica acá y mañana la limpiamos (igual que LoginPasswordForm.tsx)
function SignUpPage() {
  // TODO: Crear getLocalStorage(item: string) en useLocalStorage.tsx y que simplemente haga esto. Estar atento a si React lo tomo como Custom Hook por estar dentro de useLocalStorage.tsx, aprender de eso. Si es asi ponerlo en carpeta utils o algo asi
  const userEmail = localStorage.getItem("email");
  const email = JSON.parse(userEmail);

  const [token, setToken] = useRecoilState(tokenState);

  const [correctPassword, setCorrectPassword] = useState(true);

  const [newUser, setNewUser] = useState(false);

  const handleSubmit = async (e) => {
    setCorrectPassword(true);
    e.preventDefault();

    const password = e.target.password.value;
    const repeatedPassword = e.target.repeatedPassword.value;

    if (password === repeatedPassword) {
      const userData = {
        fullName: e.target.name.value,
        email,
        password,
      };

      console.log(userData, "data para la API");

      const { response, token } = await createOrFindUser(userData);

      console.log(response, "res /sign-up");

      if (response) {
        setToken(token);
        setNewUser(true);
      }
    } else {
      setCorrectPassword(false);
    }
  };

  useLocalStorage("token", token);

  return (
    <>
      <h1>Mis Datos</h1>
      <p>Guardá tu información personal, una vez resgitrado podrás reportar.</p>

      {/* Componentizar - UI Comp text-field*/}
      <form onSubmit={handleSubmit}>
        <label>
          <div> NOMBRE </div>
          <input type="name" name="name" required />
        </label>

        <label>
          <div> CONTRASEÑA </div>
          <input type="password" name="password" required />
        </label>

        <label>
          <div> REPETIR CONTRASEÑA </div>
          <input type="password" name="repeatedPassword" required />
        </label>

        <div>
          <PrimaryButton> Guardar </PrimaryButton>
        </div>
      </form>

      {correctPassword === false ? (
        <Alert severity="error">LAS CONTRASEÑAS INGRESADAS NO COINCIDEN</Alert>
      ) : null}

      {newUser ? (
        <Alert severity="success">
          Usuario creado correctamente. Bienvenido! Ya puedes reportar.
        </Alert>
      ) : null}
    </>
  );
}

export { SignUpPage };
