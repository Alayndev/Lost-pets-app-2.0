import { atom } from "recoil";
import { getLocalStorageItem } from "./useLocalStorage";

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

const pullUserPets = async () => {
  const tokenParsed = getLocalStorageItem("token");
  console.log(tokenParsed, "token para API /USERS/PETS");

  const { userPets } = await (
    await fetch("https://lost-pet-finder-app.herokuapp.com/users/pets", {
      method: "GET",
      headers: {
        Authorization: `bearer ${tokenParsed}`,
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log(userPets, "json res");

  if (userPets.length > 0) {
    return userPets;
  } else if (userPets.error) {
    return [];
  }
};

// pet-data
export const petLngLatState = atom({
  key: "petLngLatState",
  default: null,
});

// TODO: Así de ser useLocalStorage(key, value). Eliminar este dsp.
function setLSItem(key, value) {
  console.log("Me ejecutp");

  localStorage.setItem(key, JSON.stringify(value));
}

export { pullUserPets, setLSItem };
