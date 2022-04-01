import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const petsAroundState = atom({
  key: "petsAroundState",
  default: [],
});

// Para consumir desde el LocationButton
function setPetsAround() {
  const setPets = useSetRecoilState(petsAroundState);
  return setPets;
}

// Para consumir desde Home Page
function getPetsAround() {
  const [petValue, setPetValue] = useRecoilState(petsAroundState);

  console.log(petValue, "petValue");

  return petValue;
}

export { setPetsAround, getPetsAround };
