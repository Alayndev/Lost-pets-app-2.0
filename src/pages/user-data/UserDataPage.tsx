import React from "react";
import { MyDataForm } from "components/my-data-form/MyDataForm";
import css from "./userData.css";
import { getLocalStorageItem } from "lib/localStorage";

function UserDataPage() {
  const tokenParsed = getLocalStorageItem("token");

  console.log(tokenParsed, "tokenParsed /user-data page");

  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Mis Datos</h1>
        {tokenParsed ? (
          <p className={css.subtitle}>
            Editá tu información personal. No es necesario que edites tu
            información personal para poder reportar, ya podés hacerlo.
          </p>
        ) : (
          <p className={css.subtitle}>
            Guardá tu información personal, una vez resgitrado podrás reportar.
          </p>
        )}

        {tokenParsed ? (
          <MyDataForm function="update" itemLS={tokenParsed} />
        ) : (
          <MyDataForm function="signup" itemLS="email" />
        )}
      </div>
    </>
  );
}

export { UserDataPage };
