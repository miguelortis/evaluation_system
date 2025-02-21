import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import routes from "./routes/routes";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SignIn from "./views/SignInView";
import SignUp from "./views/SignUpView";
import Dashboard from "./views/DashboardView";
import { RenderRoutes } from "./components/RenderRoutes/RenderRoutes";
import { CURRENT_USER_SUCCESS } from "./redux/constants/authConstants";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const dispatch = useDispatch();

  const [allowedRoutes, setAllowedRoutes] = useState([]);

  const { authData } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const decoded = authData ?? token ? jwtDecode(token) : null;
    if (decoded) {
      const decoded = jwtDecode(token);
      decoded.token = token;
      dispatch({ type: CURRENT_USER_SUCCESS, payload: decoded });

      const userRole = decoded.role;
      const filteredRoutes = routes.reduce((acc, item) => {
        const filteredItems =
          item.items?.filter((subItem) => subItem.roles.includes(userRole)) ||
          [];

        if (item.roles.includes(userRole) || filteredItems.length > 0) {
          const result = item;
          if (filteredItems.length) {
            result.items = filteredItems;
          }
          acc.push(result);
        }

        return acc;
      }, []);
      setAllowedRoutes(filteredRoutes);
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="sign-in"
            element={isLoggedIn ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="sign-up"
            element={isLoggedIn ? <Navigate to="/" replace /> : <SignUp />}
          />
        </Route>
        <Route element={<MainLayout routes={allowedRoutes} />}>
          {RenderRoutes(allowedRoutes)}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return <AppRoutes />;
};

export default App;
