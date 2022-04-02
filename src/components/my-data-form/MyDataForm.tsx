import React from "react";
import { useRecoilState } from "recoil";
import { PrimaryButton } from "ui/buttons";
import css from "./myDataForm.css";
import { createOrFindUser, updateUser } from "lib/api";
import { getLocalStorageItem, setLSItem } from "lib/localStorage";
import { tokenState, userNameState } from "lib/atoms";
import Swal from "sweetalert2";
import { TextField } from "ui/text-field";

type MyDataFormProps = {
  function: string; // update - signup

  itemLS: string; // token - email - En verdad el token ya lo obtengo en la page y aca se lo paso parseado
};

function MyDataForm(props: MyDataFormProps) {
  const [token, setToken] = useRecoilState(tokenState);

  const [userName, setUserName] = useRecoilState(userNameState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const repeatedPassword = e.target.repeatedPassword.value;

    if (password === repeatedPassword) {
      // SignUp user
      if (props.function === "signup") {
        const emailParsed = getLocalStorageItem("email");

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
          Swal.fire({
            icon: "success",
            text: `Usuario creado correctamente. Bienvenido! Ya puedes reportar.`,
          });
        }
      } else if (props.function === "update") {
        // Edit User
        const userData = {
          fullName: e.target.name.value,
          password,
        };

        console.log(userData, "data para la API");

        const updated = await updateUser(userData, props.itemLS);

        console.log(updated, "res page");

        if (updated.usersUpdated.userUpdated.length === 1) {
          console.log(updated.usersUpdated.user.fullName, "new fullName");

          setUserName(updated.usersUpdated.user.fullName);
          Swal.fire({
            icon: "success",
            text: `Usuario actualizado correctamente.`,
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        text: `Las contaseñas ingresadas NO coinciden`,
      });
    }
  };

  if (token) {
    setLSItem("token", token);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={css.subContainer}>
       
        <TextField label="NOMBRE" type="name" name="name" defaultValue={userName} />

        <TextField label="CONTRASEÑA" type="password" name="password"  />

        <TextField label="REPETIR CONTRASEÑA" type="password" name="repeatedPassword"  />

        <div>
          <PrimaryButton> Guardar </PrimaryButton>
        </div>
      </form>
    </>
  );
}

export { MyDataForm };
