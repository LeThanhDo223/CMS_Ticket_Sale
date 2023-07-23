import React from "react";
import { Layout, Row, Col, DatePicker } from "antd";
import type { DatePickerProps } from 'antd';

import "../css/Style.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";
import DemoArea from "../ThongKe/Demo";
import { Footer } from "antd/es/layout/layout";
import DemoPie from '../ThongKe/TronSK';
import DemoPieDG from "../ThongKe/TronGD";

const { Header, Content, Sider } = Layout;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};


const ThongKe: React.FC = () => {
 

  return (
    <Layout >
      <Sider >
        <MenuSider />
      </Sider>

      <Layout className="col_back">
        <Header className="header"  style={{background:"none"}}>
         <MenuHeader />
        </Header>


        <Content style={{ margin: '24px 16px 0' }}>
          <div className="col_content" style={{ padding: 24, minHeight: 360 }}>
            <Row>
              <Col span={24}>
                <h2 className="col_texth2">Thống kê</h2>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <h4>Doanh thu</h4>
              </Col>
              <Col  span={4}>
              <DatePicker  onChange={onChange} picker="month" />
              </Col>
            </Row>
            <Row>
              <Col style={{height:"250px"}} span={24}>
              <DemoArea />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
              <p>Tổng doanh thu theo tuần</p>
              <h5>525.145.000/đồng</h5>
              <p></p>
              </Col>
            </Row>
            
            <Row>
              <Col span={6}>
                <DatePicker></DatePicker>
              </Col>
              <Col span={7}>
              <DemoPieDG />
              </Col>
              <Col span={7}>
              <DemoPie />
              </Col>
              
            </Row>
          </div>
          
        </Content>
      </Layout>
      
    </Layout>
  );
};

export default ThongKe;
