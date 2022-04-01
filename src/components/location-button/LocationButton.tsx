import React from "react";
import { PrimaryButton } from "ui/buttons";

import { setPetsAround } from "hooks/usePetsAround";
import { pullPetsAround } from "lib/api";
import { setLSItem } from "lib/localStorage";

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
