import React from "react";
import css from "./loginPage.css";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import { useCheckUser } from "hooks/useCheckUser";
import { useLocalStorage } from "hooks/useLocalStorage";

// ? Posible error linea 27
function LoginPage() {
  const [emailStateValue, setEmailState] = useRecoilState(emailState);
  console.log(emailStateValue, "email inicial");

  // Componentizar y llevar al componente 
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    setEmailState(email);
  };

  useLocalStorage("email", emailStateValue);

  // Solamente esto dejar - O quizas tampoco
  const navigate = useNavigate();
  const exist = useCheckUser();
  console.log(exist, "boolean, decidir navigate");

  // ? Decidir navegacion - FUNCIONA pero me devuelve un error en la consola: Cannot update a component (`BrowserRouter`) while rendering a different component (`LoginPage`) --> EN PRODUCCIÓN NO MUESTRA EL ERROR
  if (exist === true) {
    navigate("/login/password", { replace: true });
  } else if (exist === false) {
    navigate("/user-data", { replace: true });
  }

  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Ingresar</h1>

        {/* Componentizar y llevar al componente */}
        <form onSubmit={handleSubmit}>
          <label>
            <div> EMAIL </div>
            <input type="email" name="email" required />
          </label>

          <div className={css.buttonSection}>
            <PrimaryButton> Siguiente </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
}

export { LoginPage };
