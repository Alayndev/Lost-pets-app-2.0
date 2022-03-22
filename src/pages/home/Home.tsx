import React, { useEffect, useRef, useState } from "react";
import css from "./home.css";

import { PetCard } from "components/pet-card/PetCard";

// ACA - Abstraer a la Page de lógica, sacar llamada API - Sacar ternarios de return en lo posible
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

  return (
    <>
      <div className={css.mainContainer}>
        {showButton ? (
          <button onClick={handleClick}>Dar mi ubicación</button>
        ) : null}

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
