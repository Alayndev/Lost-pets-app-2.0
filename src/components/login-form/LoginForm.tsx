import React from "react";
import css from "./loginForm.css";
import { PrimaryButton } from "ui/buttons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailState } from "hooks/useCheckUser";
import { useCheckUser } from "hooks/useCheckUser";
import { setLSItem } from "lib/localStorage";

function LoginForm() {
  const [emailStateValue, setEmailState] = useRecoilState(emailState);
  console.log(emailStateValue, "email inicial");

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    setEmailState(email);
  };

  setLSItem("email", emailStateValue);

  // Solamente esto dejar - O quizas tampoco
  const navigate = useNavigate();
  const exist = useCheckUser();
  console.log(exist, "boolean, decidir navigate");

  // Decidir navegacion
  if (exist === true) {
    navigate("/login/password", { replace: true });
  } else if (exist === false) {
    navigate("/user-data", { replace: true });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <div> EMAIL </div>
          <input type="email" name="email" required />
        </label>

        <div className={css.buttonSection}>
          <PrimaryButton> Siguiente </PrimaryButton>
        </div>
      </form>
    </>
  );
}

export { LoginForm };
