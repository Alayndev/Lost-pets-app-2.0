import React from "react";
import { MyDataForm } from "components/my-data-form/MyDataForm";
import { getLocalStorageItem } from "hooks/useLocalStorage";

function UserDataPage() {
  const tokenParsed = getLocalStorageItem("token");

  console.log(tokenParsed, "tokenParsed /user-data page");

  return (
    <>
      <h1>Mis Datos</h1>
      {tokenParsed ? (
        <p>
          Editá tu información personal. No es necesario que edites tu
          información personal para poder reportar, ya podés hacerlo.
        </p>
      ) : (
        <p>
          Guardá tu información personal, una vez resgitrado podrás reportar.
        </p>
      )}

      {tokenParsed ? (
        <MyDataForm function="update" itemLS={tokenParsed} />
      ) : (
        <MyDataForm function="signup" itemLS="email" />
      )}
    </>
  );
}

export { UserDataPage };
