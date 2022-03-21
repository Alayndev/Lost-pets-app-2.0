import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

// Algoritmo: SearchResultItem.tsx -  router.tsx - ItemPage.tsx - useSearchItem.tsx - Recoil (atom - selector)
const idState = atom({
  key: "idState",
  default: "",
});

const itemState = selector({
  key: "itemState",

  get: async ({ get }) => {
    const idAtomValue = get(idState);
    console.log({ idAtomValue }, "idAtomValue");

    if (idAtomValue) {
      const res = await fetch(
        "https://api.mercadolibre.com/items/" + idAtomValue
      );
      const results = await res.json();
      console.log(results, "json");

      const productData = [
        {
          id: results.id,
          title: results.title,
          price: results.price,
          pictures: results.pictures,
          link: results.permalink,
          warranty: results.warranty,
        },
      ];

      return productData;
    } else {
      return [];
    }
  },
});

function useSearchItem() {
  const { id } = useParams();
  console.log(id, "id en custom hook useSearchItem");

  const setIdState = useSetRecoilState(idState); // --> Solo devuelve el setter, a dif. de  useRecoilState() que devuelve la tupla con value y setter

  const results = useRecoilValue(itemState);

  useEffect(() => {
    setIdState(id);
  }, [id]);

  return results;
}

export { useSearchItem };
