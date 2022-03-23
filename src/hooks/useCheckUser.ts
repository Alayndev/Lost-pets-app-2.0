import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

export const emailState = atom({
  key: "emailState",
  default: "",
});

const checkEmailState = selector({
  key: "checkEmailState",

  get: async ({ get }) => {
    const email = get(emailState);
    console.log({ email }, "email en selector");

    if (email) {
      const res = await fetch(
        "https://lost-pet-finder-app.herokuapp.com/users/registered?email=" +
          email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { exist } = await res.json();

      return exist.exist;
    } else {
      return null;
    }
  },
});

function useCheckUser() {
  const exist = useRecoilValue(checkEmailState);
  console.log(exist, "exist en useCheckUser Custom Hook");

  // ! Devuelve un boolean y la Page decide la navegacion
  if (exist === true) {
    return true;
  } else if (exist === false) {
    return false;
  } else if (exist === null) {
    return null;
  }
}

export { useCheckUser };
