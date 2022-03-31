import React, { useState } from "react";
import css from "./home.css";
import { LocationButton } from "components/location-button/LocationButton";
import { PetCard } from "components/pet-card/PetCard";
import { getPetsAround } from "hooks/usePets";
import { ReportModal } from "components/report-modal/ReportModal";

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
                <div key={pet.objectID}>
                  <ReportModal pet={pet}>
                    <PetCard
                      key={pet.objectID}
                      picture={pet.pictureURL}
                      name={pet.fullName}
                      description={pet.description}
                      loc={pet.loc}
                      type={"Reportar"}
                    />
                  </ReportModal>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export { Home };
