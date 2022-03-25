import { atom } from "recoil";
import { getLocalStorageItem } from "./useLocalStorage";

// petId
export const petIdState = atom({
  key: "petIdState",
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

export { pullUserPets };
