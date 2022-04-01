import React, { useEffect } from "react";
import { PetCard } from "components/pet-card/PetCard";
import css from "./userPetsPage.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { pullUserPets } from "lib/api";
import { petDataState, userPetsState } from "lib/atoms";

// TODO: Abstraer de lógica a la Page (algo más si se puede)
function UserPetsPage() {
  // userPets
  const [userPets, setUserPets] = useRecoilState(userPetsState);

  const pullData = async () => {
    const userPetsAPI = await pullUserPets();
    console.log(userPetsAPI, "/user-pets page");
    setUserPets(userPetsAPI);
  };

  useEffect(() => {
    pullData();
  }, []);

  // petData
  const [petData, setPetData] = useRecoilState(petDataState);

  const navigate = useNavigate();

  const handleClick = (pet) => {
    console.log(pet, "guardando petData en Atom");
    setPetData(pet);
    navigate("/pet-data", { replace: true });
  };

  return (
    <>
      <h1 className={css.title}>Mis mascotas reportadas</h1>
      <div className={css.petsContainer}>
        {/* TODO: Componente UserPets y llevo toda la lógica allá */}
        {userPets.length > 0 ? (
          userPets.map((pet) => (
            <div
              key={pet.id}
              className="petContainer"
              onClick={() => handleClick(pet)}
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
