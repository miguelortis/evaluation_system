import { Layout, Row, Col } from "antd";
import signinbg from "../../assets/images/img-signin.svg";
import PropTypes from "prop-types";
import { Outlet } from "react-router";

const { Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} className="signin-row" justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Outlet />
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
