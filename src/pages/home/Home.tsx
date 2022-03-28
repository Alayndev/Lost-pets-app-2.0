import React, { useState } from "react";
import css from "./home.css";
import { LocationButton } from "components/location-button/LocationButton";
import { PetCard } from "components/pet-card/PetCard";
import { useLocalStorage } from "hooks/useLocalStorage";
import { getPetsAround } from "hooks/usePets";

function Home() {
  const [showButton, setShowButton] = useState(true);

  const pets = getPetsAround();
  console.log(pets, "pets home");

  const handleClick = () => {
    setShowButton(false);
  };

  return (
    <>
      {showButton ? (
        <div onClick={handleClick} className={css.homeContainer}>
          <LocationButton />
        </div>
      ) : null}

      <div className={css.mainContainer}>
        {!showButton ? (
          <>
            <h1>Mascotas perdidas cerca tuyo: {pets.length} </h1>
            <div className={css.petsContainer}>
              {pets.map((pet) => (
                <PetCard
                  key={pet.objectID}
                  picture={pet.pictureURL}
                  name={pet.fullName}
                  description={pet.description}
                  loc={pet.loc}
                  type={"Reportar"}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export { Home };
