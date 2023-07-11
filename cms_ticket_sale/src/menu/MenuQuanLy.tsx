  import React from "react";
  import { Layout, Row, Col, Input, Button } from "antd";
  import "../css/Style.css";
  import MenuHeader from "../component/MenuHeader";
  import MenuSider from "../component/MenuSider";
  import LocVe from "../component/LocVe";
import DataList from "../QuanLyVe/DanhSach";
  


  const { Header, Content, Sider } = Layout;
  const { Search } = Input;
  
  // table
 

  const MenuQuanLy: React.FC = () => {
    
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
                <Button className="btn-b1" type="link">Gói gia đình</Button>
                </Col>
                <Col>
                <Button className="btn-b1" type="link">Gói Sự kiện</Button>
                </Col>
              </Row>
              <Row className="col_mt1">
                <Col span={19}>
                  <Search className="timkiem2" placeholder="Tìm bằng vé số"  />
                </Col>
                <Col span={5}>
                  <LocVe />
                  <Button className="col_t1">Xuất file (.csv)</Button>
                </Col>
              </Row>
              <Row> 
                <Col span={24}>
                  <DataList />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  };

  export default MenuQuanLy;
