import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: null,
});

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

    const response = true;
    return { response, token };
  } else {
    return { response: false };
  }
}

export { createOrFindUser };
