import React, { useState } from "react";
import { PrimaryButton } from "ui/buttons";
import Alert from "@mui/material/Alert";

// TODO: Terminar esta page, dejar la lógica acá y mañana la limpiamos (igual que LoginPasswordForm.tsx)
function EditProfilePage() {
  // TODO: Crear getLocalStorage(item: string) en useLocalStorage.tsx y que simplemente haga esto. Estar atento a si React lo tomo como Custom Hook por estar dentro de useLocalStorage.tsx, aprender de eso. Si es asi ponerlo en carpeta utils o algo asi
  const userToken = localStorage.getItem("token");
  const tokenParsed = JSON.parse(userToken);
  console.log(tokenParsed, "token en /edit-profile");

  const [correctPassword, setCorrectPassword] = useState(true);

  const [updatedUser, setupdatedUser] = useState(false);

  const handleSubmit = async (e) => {
    setCorrectPassword(true);

    e.preventDefault();

    const password = e.target.password.value;
    const repeatedPassword = e.target.repeatedPassword.value;

    if (password === repeatedPassword) {
      const userData = {
        fullName: e.target.name.value,
        password,
      };

      console.log(userData, "data para la API");

      const updated = await (
        await fetch("https://lost-pet-finder-app.herokuapp.com/users/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${tokenParsed}`,
          },
          body: JSON.stringify(userData),
        })
      ).json();

      console.log(updated, "res");

      if (updated.usersUpdated.userUpdated.length === 1) {
        setupdatedUser(true);
      }
    } else {
      setCorrectPassword(false);
    }
  };

  return (
    <>
      <h1>Mis Datos</h1>
      <p>
        Editá tu información personal. No es necesario que edites tu información
        personal para poder reportar, ya podés hacerlo.
      </p>

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

      {updatedUser ? (
        <Alert severity="success">Usuario actualizado correctamente.</Alert>
      ) : null}
    </>
  );
}

export { EditProfilePage };
