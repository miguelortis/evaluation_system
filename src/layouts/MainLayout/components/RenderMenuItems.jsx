import { AppstoreOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";

const RenderMenuItems = (routes, setName, parentKey = "") => {
  return routes.map((route, index) => {
    if (route.isHidden) {
      return null;
    }
    const Icon = route.icon;
    const currentKey = parentKey ? `${parentKey}-${index}` : `${index}`;
    if (route.items) {
      return {
        key: currentKey,
        label: (
          <div style={{ margin: "0px -13px" }}>
            <span className="icon">
              {route.icon ? <Icon /> : <AppstoreOutlined />}
            </span>
            <span className="label-sidenav">{route.name}</span>
          </div>
        ),
        children: RenderMenuItems(route.items, setName, currentKey),
      };
    } else {
      return {
        key: currentKey,
        label: (
          <NavLink to={route.path} onClick={() => setName(route.name)}>
            <span className="icon">
              {route.icon ? <Icon /> : <AppstoreOutlined />}
            </span>
            <span className="label-sidenav">{route.name}</span>
          </NavLink>
        ),
      };
    }
  });
};

export default RenderMenuItems;
