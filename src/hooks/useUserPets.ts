import { atom } from "recoil";

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

// TODO: Crear getLocalStorage(item: string) en useLocalStorage.tsx y que simplemente haga esto. Estar atento a si React lo tomo como Custom Hook por estar dentro de useLocalStorage.tsx, aprender de eso. Si es asi ponerlo en carpeta utils o algo asi
const userToken = localStorage.getItem("token");
const tokenParsed = JSON.parse(userToken);

const pullUserPets = async () => {
  const { userPets } = await (
    await fetch("https://lost-pet-finder-app.herokuapp.com/users/pets", {
      method: "GET",
      headers: {
        Authorization: `bearer ${tokenParsed}`,
      },
    })
  ).json();

  console.log(userPets, "json res");

  return userPets;
};

export { pullUserPets };
