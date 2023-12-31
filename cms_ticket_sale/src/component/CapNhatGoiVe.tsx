import React, { useState } from "react";
import { Button, Modal, DatePicker, Space, Row, Col, Radio, Checkbox } from "antd";
import type { DatePickerProps } from "antd";
import "../css/Style.css";
import { FilterOutlined  } from '@ant-design/icons';
const { Group: CheckboxGroup } = Checkbox;

const CapNhatGoiVe: React.FC = () => {
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

  const onDateChange: DatePickerProps["onChange"] = (dates, dateStrings) => {
    console.log(dates, dateStrings);
  };

 

  return (
    <>
      <Button className="col_t1"  onClick={showModal}><FilterOutlined />Lọc vé </Button>
      <Modal
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button className="col_t2" key="ok" onClick={handleOk}>
              Lọc
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: "center"}}>
            <h2>Cập nhật thông tin gói vé</h2>
          </div>
        <Space direction="horizontal">
          <div>
            <p>Từ ngày</p>
            <DatePicker onChange={onDateChange} />
          </div>
          <div>
            <p>Đến ngày</p>
            <DatePicker onChange={onDateChange} />
          </div>
        </Space>
        <Row>
          <Col>
            <h4>Tình trạng sử dụng</h4>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Tất cả</Radio>
              <Radio value={2}>Đã sử dụng</Radio>
              <Radio value={3}>Chưa sử dụng</Radio>
              <Radio value={4}>Hết hạn</Radio>
            </Radio.Group>
          </Col>
          <Col>
            <h4>Cổng Check - in</h4>
            <CheckboxGroup style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value="all">Tất cả</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="1">Cổng 1</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2">Cổng 2</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="3">Cổng 3</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="4">Cổng 4</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5">Cổng 5</Checkbox>
                </Col>
              </Row>
            </CheckboxGroup>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CapNhatGoiVe;
