import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import { Divider, Grid, Menu, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../../../assets/images/es.svg";
import { logoutUser } from "../../../redux/actions/authActions";
import { findOpenKeys } from "../utils/find-open-keys";
import RenderMenuItems from "./RenderMenuItems";

const { Title } = Typography;

const Sidenav = ({ setName, routes }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  const { authData } = useSelector((state) => state.currentUser);

  useEffect(() => {
    setOpenKeys([]);
    if (!screens.xs) {
      const path = location.pathname;
      const keys = findOpenKeys(routes, path);
      setOpenKeys(keys);
    }
  }, [location.pathname, routes, screens]);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="sidenav">
      <div className="brand">
        <img src={logo} alt="" />
        <span>Sistema Evalucion</span>
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Title level={5}>{authData?.name + " " + authData?.lastName}</Title>
      </div>
      <div style={{ height: "100%" }}>
        <Divider />
        <Menu
          theme="light"
          mode="inline"
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          items={RenderMenuItems(routes, setName)}
        />
      </div>
      <div>
        <Divider />
        <Menu
          theme="light"
          mode="inline"
          items={[
            {
              key: "logout",
              label: (
                <NavLink to="/sign-in" onClick={logout}>
                  <span className="icon">
                    <LogoutOutlined />
                  </span>
                  <span className="label">Cerrar Sesión</span>
                </NavLink>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Sidenav;
