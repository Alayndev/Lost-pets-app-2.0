import { getLocalStorageItem } from "./localStorage";

// Login Page and Login Password Page
async function getToken(email, password) {
  const { token } = await (
    await fetch("https://lost-pet-finder-app.herokuapp.com/auth/token", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log(token, "token");

  if (token.token) {
    // guardarlo en un atom, agarrar ese atom en Form y guardarlo en LS
    return token.token;
  } else {
    return "NO hay token";
  }
}

async function createOrFindUser(userData: {
  fullName?: string;
  email: string;
  password: string;
}) {
  const res = await (
    await fetch("https://lost-pet-finder-app.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
  ).json();

  console.log(res, "createOrFindUser");

  if (res.authCreated === true || res.passwordValideted.exist === true) {
    // token
    const token = await getToken(userData.email, userData.password);

    const userName = res.user?.fullName || null;

    const response = true;
    return { response, token, userName };
  } else {
    return { response: false };
  }
}

async function updateUser(userData, token) {
  const res = await (
    await fetch("https://lost-pet-finder-app.herokuapp.com/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
  ).json();

  console.log(res, "res API - updateUser()");

  return res;
}

export { createOrFindUser, updateUser };

// Pet-data Page

const editPet = async ({ id, fullName, loc, description }) => {
  // ? Lo saco de LS o Atom?
  const lng = getLocalStorageItem("petLng");
  const lat = getLocalStorageItem("petLat");
  const dataURL = getLocalStorageItem("dataURL");
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
  const dataURL = getLocalStorageItem("dataURL");
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

// Home Page - LocationButton
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

export { pullPetsAround };

// Home Page - ReportModal
async function sendReport(report, token) {
  console.log(report, "report data en sendReport()");

  const res = await (
    await fetch(
      `https://lost-pet-finder-app.herokuapp.com/pets/reports?petId=${report.petId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(report),
      }
    )
  ).json();

  console.log(res, "res sendReport()");

  return res;
}

export { sendReport };

// User-Pets Page

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
