import React from "react";
import { MyDataForm } from "components/my-data-form/MyDataForm";

// TODO: Crear getLocalStorage(item: string) en useLocalStorage.tsx y que simplemente haga esto. Estar atento a si React lo tomo como Custom Hook por estar dentro de useLocalStorage.tsx, aprender de eso. Si es asi ponerlo en carpeta utils o algo asi
function UserDataPage() {
  const itemLS = localStorage.getItem("token");
  const itemLSparsed = JSON.parse(itemLS);
  console.log(itemLSparsed, "itemLSparsed SignUp.tsx - futuro user-data");

  return (
    <>
      <h1>Mis Datos</h1>
      {itemLSparsed ? (
        <p>
          Editá tu información personal. No es necesario que edites tu
          información personal para poder reportar, ya podés hacerlo.
        </p>
      ) : (
        <p>
          Guardá tu información personal, una vez resgitrado podrás reportar.
        </p>
      )}

      {itemLSparsed ? (
        <MyDataForm function="update" itemLS={itemLSparsed} />
      ) : (
        <MyDataForm function="signup" itemLS="email" />
      )}
    </>
  );
}

export { UserDataPage };
