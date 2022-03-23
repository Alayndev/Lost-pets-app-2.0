import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(initialValue);
    localStorage.setItem(key, JSON.stringify(initialValue));
  }, [initialValue]);

  return email;
}

export { useLocalStorage };
