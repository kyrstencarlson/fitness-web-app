export const getScope = (scopes: string[]) => {
  if (scopes.includes("admin")) {
    return "admin";
  }

  return "engine";
};
