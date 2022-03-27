import React from "react";
import { PrimaryButton } from "ui/buttons";
import css from "./locationButton.css";

import { setPetsAround, pullPetsAround } from "hooks/usePets";
import { setLSItem } from "hooks/useUserPets";

function LocationButton() {
  const setPets = setPetsAround();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(async (geo) => {
      const { latitude, longitude } = geo.coords;

      const userLoc = [longitude, latitude];
      setLSItem("userLoc", userLoc);

      const results = await pullPetsAround(latitude, longitude);

      setPets(results);
    });
  };

  return (
    <div onClick={handleClick}>
      <PrimaryButton>
        <span>Dar mi ubicación</span>
      </PrimaryButton>
    </div>
  );
}

export { LocationButton };
