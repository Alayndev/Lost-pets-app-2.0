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

  useLocalStorage("email", null); // Lo inicializamos como null para poder hacer el router en el Header, dirigiendo siempre a /login al no tener un email ingresado

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
