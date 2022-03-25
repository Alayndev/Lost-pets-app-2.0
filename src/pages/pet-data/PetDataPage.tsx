import React from "react";
import { useRecoilState } from "recoil";
import { petIdState } from "hooks/useUserPets";
import { getLocalStorageItem, useLocalStorage } from "hooks/useLocalStorage";

// Dependiendo de si tenemos petId o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)

function PetDataPage() {
  // petId
  const [petId, setPetId] = useRecoilState(petIdState);
  console.log(petId, "petId Atom");

  petId ? console.log("Editar") : console.log("Reportar");

  return (
    <>
      <h1>{petId ? <span>Editar</span> : <span>Reportar</span>}</h1>
    </>
  );
}

export { PetDataPage };
