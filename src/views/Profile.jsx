import { Row, Col, Typography } from "antd";

const { Title } = Typography;
function Profile() {
  return (
    <>
      <div className="layout-content">
        <Row gutter={16}>
          <Col xs={{ flex: "100%" }} md={{ flex: "33%" }}>
            <Title nivel={6}>Ejemplo de perfil</Title>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Profile;
