export const getStoredName = () => {
  const storedName = localStorage.getItem("name");

  return storedName && storedName !== "undefined" && storedName !== "null"
    ? storedName
    : "User";
};
