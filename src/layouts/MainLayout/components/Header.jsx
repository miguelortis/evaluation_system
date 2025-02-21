import { useEffect } from "react";
import { Row, Col, Button, Input } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

function Header({ name, onPress }) {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {name}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            <MenuOutlined />
          </Button>
          <Input
            className="header-search"
            placeholder="Buscar..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
