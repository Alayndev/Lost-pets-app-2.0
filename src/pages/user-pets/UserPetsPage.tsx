import React from "react";
import css from "./userPetsPage.css";
import { ShowUserPets } from "components/show-user-pets/ShowUserPets";

function UserPetsPage() {
  return (
    <>
      <h1 className={css.title}>Mis mascotas reportadas</h1>
      <div className={css.petsContainer}>
        <ShowUserPets />
      </div>
    </>
  );
}

export { UserPetsPage };
