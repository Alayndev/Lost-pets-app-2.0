import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// Algoritmo: SearchForm.tsx - router.tsx - SearchResultPage.tsx - useSearchResults.tsx - Recoil (atom - selector)
const queryState = atom({
  key: "querystate",
  default: "",
});

const resultsState = selector({
  key: "resultsState",

  get: async ({ get }) => {
    const queryAtomValue = get(queryState);
    console.log({ queryAtomValue }, "queryAtomValue ");

    if (queryAtomValue) {
      const res = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + queryAtomValue
      );
      const { results } = await res.json();

      return results;
    } else {
      return []; // Devolvemos un [] para cuando queryAtomValue = "" (default - valor inicial linea 8 - hasta que lo cambiamos con el valor dinámico de useParams() linea 43 para, ahora sí hacer la llamada a la API)
    }
  },
});

function useSearchResults() {
  // * 1- Escuchar la URL (params)
  const { query } = useParams();

  const [queryValue, setQueryValue] = useRecoilState(queryState);
  console.log("El valor de query en recoil: ", queryValue);

  // * 3- Llamar a la API usando la data del Atom de Recoil
  const results = useRecoilValue(resultsState);
  console.log(results, "results en custom hook");

  // * 2- Avisarle a Recoil, guardar la data en el Atom
  useEffect(() => {
    console.log("soy query en useEffect: ", query);

    setQueryValue(query);
  }, [query]);

  return results;
}

export { useSearchResults };
