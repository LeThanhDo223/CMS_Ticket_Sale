import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";

import "../css/ThongKe.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const DoiSoat: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <MenuSider />
      </Sider>

      <Layout className="col_back">
        <Header className="header" style={{ background: "none" }}>
          <MenuHeader />
        </Header>
        <Content>
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="col_content" style={{ padding: 24, minHeight: 360 }}>
                <Row>
                  <Col span={24}>
                    <h2 className="col_texth2">Đổi soát vé</h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <Search className="timkiem2" placeholder="Tìm bằng vé số" />
                  </Col>
                  <Col span={4}>
                    <Button>Chốt đổi soát</Button>
                  </Col>
                </Row>
              </div>
            </Content>
            <Sider style={{ ...contentStyle, background: "#fff" }}>
              <div style={{ padding: 24, minHeight: 360 }}>Sider Content</div>
            </Sider>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

// CSS style for Content
const contentStyle = {
  margin: "24px 16px 0",
};

export default DoiSoat;
