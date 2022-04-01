import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: null,
});

// petData
export const petDataState = atom({
  key: "petDataState",
  default: null,
});

// userPets
export const userPetsState = atom({
  key: "userPetsState",
  default: [],
});

// pet-data
export const petLngState = atom({
  key: "petLatState",
  default: null,
});

export const petLatState = atom({
  key: "petLatState",
  default: null,
});
