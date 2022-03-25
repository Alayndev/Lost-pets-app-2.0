import React, { useState } from "react";
import { createOrFindUser, tokenState } from "hooks/useCreateOrFindUser";
import { getLocalStorageItem, useLocalStorage } from "hooks/useLocalStorage";
import { useRecoilState } from "recoil";
import { PrimaryButton } from "ui/buttons";
import Alert from "@mui/material/Alert";

type MyDataFormProps = {
  function: string; // update - signup

  itemLS: string; // token - email - En verdad el token ya lo obtengo en la page y aca se lo paso parseado
};

// TODO: Buscar TODOS en este archivo - sacar console.log() ya funciona
function MyDataForm(props: MyDataFormProps) {
  console.log(props, "props  MyDataForm");

  const [correctPassword, setCorrectPassword] = useState(true);

  const [token, setToken] = useRecoilState(tokenState);

  const [userState, setUserState] = useState(false);

  const handleSubmit = async (e) => {
    setCorrectPassword(true);
    e.preventDefault();

    const password = e.target.password.value;
    const repeatedPassword = e.target.repeatedPassword.value;

    if (password === repeatedPassword) {
      // SignUp user
      if (props.function === "signup") {
        const emailParsed = getLocalStorageItem("email");
        console.log(emailParsed, "email parseado");

        const userData = {
          fullName: e.target.name.value,
          email: emailParsed,
          password,
        };

        console.log(userData, "data para la API");

        const { response, token } = await createOrFindUser(userData);

        console.log(response, "res /sign-up");

        if (response) {
          setToken(token);
          setUserState(true);
        }
      } else if (props.function === "update") {
        // Edit User
        const userData = {
          fullName: e.target.name.value,
          password,
        };

        console.log(userData, "data para la API");

        // TODO: Abstraer igual que con createOrFindeUser - updateUser en este caso
        const updated = await (
          await fetch(
            "https://lost-pet-finder-app.herokuapp.com/users/profile",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${props.itemLS}`,
              },
              body: JSON.stringify(userData),
            }
          )
        ).json();

        console.log(updated, "res");

        if (updated.usersUpdated.userUpdated.length === 1) {
          setUserState(true);
        }
      }
    } else {
      setCorrectPassword(false);
    }
  };

  useLocalStorage("token", token);

  return (
    <>
      {/* TODO: Componentizar - UI Comp text-field*/}

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

      {userState ? (
        <Alert severity="success">
          {props.function === "signup" ? (
            <span>
              Usuario creado correctamente. Bienvenido! Ya puedes reportar.
            </span>
          ) : (
            <span>Usuario actualizado correctamente.</span>
          )}
        </Alert>
      ) : null}
    </>
  );
}

export { MyDataForm };
