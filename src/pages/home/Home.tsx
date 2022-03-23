import React, { useState } from "react";
import css from "./home.css";
import { PrimaryButton } from "ui/buttons";

import { PetCard } from "components/pet-card/PetCard";
import { useLocalStorage } from "hooks/useLocalStorage";

// TODO: ACA - Abstraer a la Page de lógica, sacar llamada API - Sacar ternarios de return en lo posible
function Home() {
  const [showButton, setShowButton] = useState(true);

  const [pets, setPets] = useState([]);

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(async (geo) => {
      const { latitude, longitude } = geo.coords;

      const res = await fetch(
        `https://lost-pet-finder-app.herokuapp.com/pets/around?lat=${latitude}&lng=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = await res.json();

      setPets(results.petsAround.hits);

      setShowButton(false);

      console.log(results.petsAround.hits, "mascotas cerca");
    });
  };

  useLocalStorage("email", null); // Lo inicializamos como null para poder hacer el router en el Header, dirigiendo siempre a /login al no tener un email ingresado

  return (
    <>
      {showButton ? (
        <div onClick={handleClick} className={css.homeContainer}>
          <PrimaryButton>
            <span>Dar mi ubicación</span>
          </PrimaryButton>
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
