export const getScope = (scopes: string[]) => {
  if (scopes.includes("admin") || scopes.includes("super_admin")) {
    return "admin";
  }

  return "engine";
};
