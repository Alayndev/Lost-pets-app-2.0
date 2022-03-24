import React from "react";

// Page para Editar o SignUp
function UserDataPage() {
  const userToken = localStorage.getItem("token");

  if (userToken === "null") {
    // SignUp - Nuevo user
    console.log("NOOOOO tiene Token");
  } else {
    // Editar
    console.log("Tiene Token");
  }

  return (
    <>
      <h1>Mis Datos</h1>
      <p>Soy un user</p>
    </>
  );
}

export { UserDataPage };
