import React from "react";
import "../css/Style.css";
import {Row,Col, Layout,Input,Button } from "antd";
import MenuSider from "../component/MenuSider";
import MenuHeader from "../component/MenuHeader";
const { Header, Content, Sider } = Layout;
//search
const { Search } = Input;
const MenuDichVu: React.FC = () => {
    return(
        <Layout >
        <Sider >
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
                  <h2 className="col_texth2">Danh sách gói vé</h2>
                </Col>
            </Row>
            <Row className="col_mt1">
                <Col span={19}>
                  <Search className="timkiem2" placeholder="Tìm bằng vé số"  />
                </Col>
                <Col span={5}>
                  <Button className="col_b1">Xuất file (.csv)</Button>
                  <Button  className="col_b2">Thêm gói vé</Button>
                </Col>
              </Row>
          </div>
          </Content>
        </Layout>
      </Layout>
    );
};
export default MenuDichVu;