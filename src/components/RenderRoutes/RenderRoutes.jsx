import { Route } from "react-router";

export const RenderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { component: Component, path, items } = route;

    if (items) {
      return (
        <Route key={index} path={path}>
          {RenderRoutes(items)}
        </Route>
      );
    }

    return <Route key={index} path={path} element={<Component />} />;
  });
};
