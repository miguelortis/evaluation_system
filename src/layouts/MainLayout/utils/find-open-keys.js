export const findOpenKeys = (routes, path) => {
  const keys = [];
  routes.forEach((route, index) => {
    const currentKey = `${index}`;
    if (
      route.path === path ||
      (route.items && route.items.some((item) => item.path === path))
    ) {
      keys.push(currentKey);
    }
    if (route.items) {
      findOpenKeys(route.items, path);
    }
  });

  return keys;
};
