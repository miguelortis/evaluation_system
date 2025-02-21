import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Drawer, Layout } from "antd";
import { Navigate, Outlet } from "react-router";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";

const { Header: AntHeader, Content, Sider } = Layout;

const MainLayout = ({ routes }) => {
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();

  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(!visible);

  useEffect(() => {
    setName(getRouteName(routes, pathname));
  }, [routes, pathname]);

  const getRouteName = (routes, pathname) => {
    let result = null;
    routes?.forEach((route) => {
      if (route?.path === pathname) {
        result = route;
        return;
      }
      const item = route?.items?.find((item) => item.path === pathname);
      if (item) {
        result = item;
        return;
      }
    });
    return result?.name;
  };

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Layout className="layout-dashboard">
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key="left"
        width={250}
        className="drawer-sidebar"
      >
        <Layout className="layout-dashboard">
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className="sider-primary ant-layout-sider-primary"
          >
            <Sidenav setName={setName} routes={routes} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
        className="sider-primary ant-layout-sider-primary"
      >
        <Sidenav setName={setName} routes={routes} />
      </Sider>
      <Layout>
        <AntHeader style={{ background: "#ffffff" }}>
          <Header onPress={openDrawer} name={name} />
        </AntHeader>
        <Content className="content-ant">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
