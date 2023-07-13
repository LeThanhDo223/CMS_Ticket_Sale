import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import "../css/Style.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";
import DataList from "../QuanLyVe/TableQuanLy";

const { Header, Content, Sider } = Layout;

const MenuQuanLy: React.FC = () => {
  const [activeButton, setActiveButton] = useState("giaDinh");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

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
                <h2 className="col_texth2">Danh sách vé</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className={`btn-b1 ${activeButton === "giaDinh" ? "active" : ""}`}
                  type="link"
                  onClick={() => handleButtonClick("giaDinh")}
                >
                  Gói gia đình
                </Button>
              </Col>
              <Col>
                <Button
                  className={`btn-b1 ${activeButton === "suKien" ? "active" : ""}`}
                  type="link"
                  onClick={() => handleButtonClick("suKien")}
                >
                  Gói Sự kiện
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DataList activeButton={activeButton} />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuQuanLy;
