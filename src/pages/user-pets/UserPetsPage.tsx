import React, { useEffect, useState } from "react";
import { PetCard } from "components/pet-card/PetCard";
import css from "./userPetsPage.css";
import { useRecoilState } from "recoil";
import { petIdState, pullUserPets, userPetsState } from "hooks/useUserPets";
import { useLocalStorage } from "hooks/useLocalStorage";

// TODO: Navigate 30 dependiendo si 1/2 pages - Abstraer de lógica a la Page
function UserPetsPage() {
  // userPets
  const [userPets, setUserPets] = useRecoilState(userPetsState);

  const pullData = async () => {
    const userPetsAPI = await pullUserPets();
    console.log(userPetsAPI, "user-pets");
    setUserPets(userPetsAPI);
  };

  useEffect(() => {
    pullData();
  }, []);


  // petId
  const [petId, setPetId] = useRecoilState(petIdState);

  const handleClick = (id: number) => {
    console.log(id, "pet number");
    setPetId(id);
    // navigate
    // Dependiendo de si tenemos petId o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id). Podemos crear dos paginas como hicimos con el perfil: edit-pet o create-report
  };

  useLocalStorage("petId", petId);

  return (
    <>
      <h1 className={css.title}>Mis mascotas reportadas</h1>
      <div className={css.petsContainer}>
        {userPets.length > 0 ? (
          userPets.map((pet) => (
            <div
              key={pet.id}
              className="petContainer"
              onClick={() => handleClick(pet.id)}
            >
              <PetCard
                key={pet.id}
                picture={pet.pictureURL}
                name={pet.fullName}
                description={pet.description}
                loc={pet.loc}
                type={"Editar"}
              />
            </div>
          ))
        ) : (
          // TODO: Mismo problema que en Home.tsx con length, en la espera a la API length es 0 y muestra esto (en Home muestra 0 mascotas perdidas)
          <p>Aun no reportaste mascotas perdidas</p>
        )}
      </div>
    </>
  );
}

export { UserPetsPage };
