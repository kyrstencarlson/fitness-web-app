export const getScope = (scopes: string[]) => {
  const scope = [];

  if (scopes.includes("admin") || scopes.includes("super_admin")) {
    scope.push("admin");
  }

  if (scopes.includes("skills")) {
    scope.push("skills");
  }

  if (scopes.includes("engine")) {
    scope.push("engine");
  }

  if (scopes.includes("strength")) {
    scope.push("strength");
  }
  return scope;
};
