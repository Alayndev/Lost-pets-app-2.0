import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const petsAroundState = atom({
  key: "petsAroundState",
  default: [],
});

// Para consumir desde el Button
function setPetsAround() {
  const setPets = useSetRecoilState(petsAroundState);
  return setPets;
}

async function pullPetsAround(latitude, longitude) {
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
  console.log(results.petsAround.hits, "mascotas cerca");

  return results.petsAround.hits;
}

// Para consumir desde el HOME
function getPetsAround() {
  const [petValue, setPetValue] = useRecoilState(petsAroundState);

  console.log(petValue, "petValue");

  return petValue;
}

export { setPetsAround, getPetsAround, pullPetsAround };
