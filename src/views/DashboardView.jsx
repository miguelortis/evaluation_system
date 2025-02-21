import { Row, Col, Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

function Dashboard() {
  return (
    <>
      <div className="layout-content">
        <Row gutter={16}>
          <Col xs={{ flex: "100%" }} md={{ flex: "33%" }}>
            <Card>
              <Statistic
                title="Active Users"
                value={1128}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col xs={{ flex: "100%" }} md={{ flex: "33%" }}>
            <Card>
              <Statistic
                title="New Users"
                value={93}
                precision={0}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col xs={{ flex: "100%" }} md={{ flex: "33%" }}>
            <Card>
              <Statistic
                title="Total Sales"
                value={112893}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
