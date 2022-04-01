function setLSItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorageItem(item: string) {
  const itemLS = localStorage.getItem(item);
  const itemLSparsed = JSON.parse(itemLS);

  return itemLSparsed;
}

export { setLSItem, getLocalStorageItem };
