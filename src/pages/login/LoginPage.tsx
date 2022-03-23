import React from "react";
import css from "./loginPage.css";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import { useCheckUser } from "hooks/useCheckUser";

// ? Posible error linea 27
// TODO: Vamos a tener que cambiar el ruteo del Header ya que para TODO tiene que estar logeado el user. Header.tsx --> linea 35
function LoginPage() {
  const [emailStateValue, setEmailState] = useRecoilState(emailState);
  console.log(emailStateValue, "email inicial");

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    // TODO: Guardar email en localStorage con useLocalStorage Custom Hook, para así hacer el Header y LoginPasswordPage (la otra es con el atom pero al hacer refresh se resetea y por eso es mejor localStorage). Quiza NO pueda usar Custom Hook acá adentro, usar useState interno de este Comp: const [email, setEmail] = useState("") --> setEmail(emailInput)

    setEmailState(email);
  };

  const navigate = useNavigate();
  const exist = useCheckUser();
  console.log(exist, "boolean, decidir navigate");

  // ! Decidir navegacion - FUNCIONA pero me devuelve un error en la consola: Cannot update a component (`BrowserRouter`) while rendering a different component (`LoginPage`)
  if (exist === true) {
    navigate("/login/password", { replace: true });
  } else if (exist === false) {
    navigate("/user-data", { replace: true });
  }

  return (
    <>
      <div className={css.mainContainer}>
        <h1 className={css.title}>Ingresar</h1>

        {/* Hacerlo un Componente */}
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
