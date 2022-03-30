import { getLocalStorageItem } from "./useLocalStorage";

const editPet = async ({ id, fullName, loc, description }) => {
  // ? Lo saco de LS o Atom?
  const lng = getLocalStorageItem("petLng");
  const lat = getLocalStorageItem("petLat");
  const dataURL = getLocalStorageItem("dataURL"); // ! Si el user NO cambia la imagen NO tengo dataURL, posible problema, ver solución en dwf-m7
  const token = getLocalStorageItem("token");

  const bodyToEndpoint = {
    fullName,
    dataURL,
    lat,
    lng,
    loc,
    description,
  };

  console.log(bodyToEndpoint, "bodyToEndpoint");

  const petEdited = await (
    await fetch(
      `https://lost-pet-finder-app.herokuapp.com/users/pets?petId=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToEndpoint),
      }
    )
  ).json();

  // ! Por qué? - Long y Lat se actualizan al igual que dataURL
  // Reset petData
  //   cs.petData = {};
  //   this.setState(cs);

  console.log("res API: ", petEdited);

  if (petEdited.algoliaPetUpdated.error || petEdited.petUpdated.error) {
    console.log(
      "Error :",
      petEdited.petUpdated.error || petEdited.algoliaPetUpdated.error
    );
    return false;
  } else {
    return true;
  }
};

const createPet = async ({ fullName, loc, description }) => {
  // ? Lo saco de LS o Atom?
  const lng = getLocalStorageItem("petLng");
  const lat = getLocalStorageItem("petLat");
  const dataURL = getLocalStorageItem("dataURL"); // ! Si el user NO cambia la imagen NO tengo dataURL, posible problema, ver solución en dwf-m7
  const token = getLocalStorageItem("token");

  const bodyToEndpoint = {
    fullName,
    dataURL,
    lat,
    lng,
    loc,
    description,
  };

  console.log(bodyToEndpoint, "bodyToEndpoint");

  const petCreated = await (
    await fetch(`https://lost-pet-finder-app.herokuapp.com/users/pets`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToEndpoint),
    })
  ).json();

  console.log(petCreated, "res API createPet()");

  if (petCreated.petCreated === false) {
    const error = "Este reporte ya existe";
    return { error };
  } else if (petCreated.message) {
    const inputsIncompleted =
      "El user tiene que completar todos los campos, incluyendo la imagen de la mascota";
    return { inputsIncompleted };
  } else {
    const success =
      "Su mascota ha sido reportada correctamente. Este atento a su casilla de correo, inclusive al spam, ya que por allí le llegarán los reportes de su mascota.";
    return { success };
  }
};

const petFound = async (id) => {
  const token = getLocalStorageItem("token");

  const petFound = await (
    await fetch(`https://lost-pet-finder-app.herokuapp.com/pets?petId=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
  ).json();

  console.log(petFound, "petFound()");

  if (petFound.algoliaPetDeleted?.taskID && petFound.petdeleted?.length === 1) {
    return true;
  } else if (petFound.error) {
    return false;
  }
};

export { editPet, createPet, petFound };
