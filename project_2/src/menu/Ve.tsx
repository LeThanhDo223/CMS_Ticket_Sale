import React from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';

import "../css/ThongKe.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";
import LocVe from "../component/LocVe";
import DemoTable from "../demo/DemoTable";

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const Ve: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <MenuSider />
      </Sider>

      <Layout className="col_back">
        <Header className="header" style={{ background: "none" }}>
          <MenuHeader />
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div className="col_content" style={{ padding: 24, minHeight: 360 }}>
            <Row>
              <Col span={24}>
                <h2>Danh sách vé</h2>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Search className="timkiem2" placeholder="Tìm bằng vé số" prefix={<SearchOutlined />} />
              </Col>
              <Col span={4}>
                <LocVe />
                <Button>Xuất file (.csv)</Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DemoTable />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Ve;
