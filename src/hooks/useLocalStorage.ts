import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(initialValue);
    localStorage.setItem(key, JSON.stringify(initialValue));
  }, [initialValue]);

  return email;
}

function getLocalStorageItem(item: string) {
  const itemLS = localStorage.getItem(item);
  const itemLSparsed = JSON.parse(itemLS);

  return itemLSparsed;
}

export { useLocalStorage, getLocalStorageItem };
