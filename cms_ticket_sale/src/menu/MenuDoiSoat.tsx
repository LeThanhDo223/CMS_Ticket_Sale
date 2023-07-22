import React, { useState } from "react";
import { Layout, Row, Col, Input, Button, Radio, Space,DatePicker } from "antd";
import dayjs from 'dayjs';
import "../css/Style.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DatePickerProps } from 'antd';
import TableDoiSoat from "../DoiSoatVe/TableDoiSoat";

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const MenuDoiSoat: React.FC = () => {
  const [activeButton, setActiveButton] = useState("giaDinh");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };
  return (
    <Layout className="menu">
      <Sider className="sider">
        <MenuSider />
      </Sider>

      <Layout className="col_back">
        <Header className="header" style={{ background: "none" }}>
          <MenuHeader />
        </Header>
        <Content className="col-bg1">
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="col_content2"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Row>
                  <Col span={24}>
                    <h2 className="col_texth2">Đổi soát vé</h2>
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
                <TableDoiSoat activeButton={activeButton} />
              </Col>
            </Row>
              </div>
            </Content>

            
            {/* sider right */}
            <Sider style={{ margin: "24px 16px 0", background: "none" }}>
              <div
                className="col_sider"
                style={{ padding: 24, minHeight: 360 }}
              >
                <h2>Lọc vé</h2>
                <Row>
                  <Col span={12}>
                    <p>Tình trạng đổi soát</p>
                  </Col>
                  <Col span={12}>
                    <Radio.Group>
                      <Space direction="vertical" >
                        <Radio value={1}>Tất cả</Radio>
                        <Radio value={2}>Đã đổi soát</Radio>
                        <Radio value={3}>Chưa đổi soát</Radio>
                      </Space>
                    </Radio.Group>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <p>Loại vé</p>
                  </Col>
                  <Col span={12}>
                    <p>Vé cổng</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <p>Từ ngày</p>
                  </Col>
                  <Col span={12}>
                  <DatePicker defaultValue={dayjs('2021-05-01', dateFormat)} disabled />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <p>Đến ngày</p>
                  </Col>
                  <Col span={12}>
                  <DatePicker onChange={onChange} />
                  </Col>
                </Row>
                
                <div style={{marginLeft:'170px', marginTop:'50px'}}>
                <Button   className="col_t3">Lọc</Button>
                </div>
                
                
              </div>
              
            </Sider>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuDoiSoat;
