import React from "react";
import {  Row, Col, Input, Badge, Avatar } from "antd";
import {
  
  MailOutlined,
  BellOutlined,
} from "@ant-design/icons";

import "../css/MenuHeader.css";


const { Search } = Input;


const MenuHeader: React.FC = () => {
 

  return (
    
      
          <Row justify="space-between" align="middle">
            <Col span={12}>
                <Search className="timkiem" placeholder="Search" />
              </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Badge>
                <MailOutlined style={{ fontSize: "20px", marginRight: "20px" }} />
              </Badge>
              <Badge >
                <BellOutlined  style={{ fontSize: "20px", marginRight: "20px" }} />
              </Badge>
              <Avatar size={50} src="https://pepsilan.com/wp-content/uploads/2022/02/Hinh-Gau-Truc-Cute-Chibi-nghe-dien-thoai.jpg" />
            </Col>
          </Row>
        
  
  );
};

export default MenuHeader;
