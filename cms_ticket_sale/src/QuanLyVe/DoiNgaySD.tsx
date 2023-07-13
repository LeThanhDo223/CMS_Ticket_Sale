import React, { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col
} from "antd";
import "../css/Style.css";


const DoiNgaySD: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  }; 

  return (
    <>
      <p onClick={showModal} >Đổi ngày sử dụng</p>
      <Modal 
      width={700}
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button className="col_bt1" key="cancel" onClick={handleCancel}>
              Hủy
            </Button>
            <Button className="col_bt2" key="ok" onClick={handleOk}>
              Lưu
            </Button>
            
          </div>
        }
      >
        <div style={{ textAlign: "center"}}>
            <h2>Đổi ngày sử dụng vé</h2>
          </div>
          <Row>
            <Col span={10}>
            Số vé
            </Col>
            <Col span={14}>
            PKG20210502
            </Col>
          </Row>
          

          <Row>
            <Col span={10}>
            Loại vé
            </Col>
            <Col span={14}>
            Vé cổng-Gói sự kiện
            </Col>
          </Row>

          <Row>
            <Col span={10}>
            Tên sự kiện
            </Col>
            <Col span={14}>
            Hội trợ triển lãm hàng tiêu dùng 2021
            </Col>
          </Row>

          <Row>
            <Col span={10}>
            Hạn sử dụng
            </Col>
            <Col span={14}>
            15/04/2021
            </Col>
          </Row>
      </Modal>
    </>
  );
};

export default DoiNgaySD;
