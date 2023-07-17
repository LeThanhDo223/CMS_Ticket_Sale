import React, { useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Space,
  Row,
  Col,
  Checkbox,
  Input ,
  TimePicker,
  Select 
} from "antd";
import type { DatePickerProps,TimePickerProps } from "antd";
import "../css/Style.css";

const handleChange = (value: { value: string; label: React.ReactNode }) => {
  console.log(value); 
};

const { Group: CheckboxGroup } = Checkbox;

const ThemGoiVe: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);

  const handleTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
    console.log(timeString);
    setTime(timeString);
  };
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

  const [veLeChecked, setVeLeChecked] = useState(false);
  const [comboChecked, setComboChecked] = useState(false);

  return (
    <>
      <Button onClick={showModal} className="col_b2">Thêm gói vé</Button>
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
            <h2>Thêm gói vé</h2>
          </div>
          <Row>
            <Col span={24}>
              <h4>Tên gói vé*</h4>
              <Input style={{width:'300px'}} placeholder="Nhập tên gói vé"></Input>
            </Col>
          </Row>
        <Space direction="horizontal">
          
          <div >
            <h4>Ngày áp dụng</h4>
            <DatePicker style={{width:'120px'}} onChange={onDateChange} />
            <TimePicker style={{width:'120px',marginLeft:'10px'}} onChange={handleTimeChange} />
            
          </div>
          <div style={{paddingLeft:'50px'}}>
            <h4>Ngày hết hạn</h4> 
            <DatePicker style={{width:'120px'}} onChange={onDateChange} />
            <TimePicker style={{width:'120px',marginLeft:'10px'}} onChange={handleTimeChange} />
          </div>
        </Space>
        <Row>
          <Col>
            <h4>Giá vé áp dụng</h4>
            <CheckboxGroup style={{ width: '100%' }}>
            <Row>
              <Col span={24}>
                <Row>
                  <Col>
                    <Checkbox
                      className="col_tx1"
                      value="ve-le"
                      onChange={(e) => setVeLeChecked(e.target.checked)}
                    >
                      Vé lẻ (vnđ/vé) với giá
                    </Checkbox>
                  </Col>
                  <Col>
                    <Input
                      className="col_i1"
                      placeholder="Giá vé"
                      disabled={!veLeChecked} // Disable the input when checkbox is not checked
                    />
                  </Col>
                  <Col className="col_tx1">/ vé</Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Col>
                    <Checkbox
                      className="col_tx1"
                      value="Combo"
                      onChange={(e) => setComboChecked(e.target.checked)}
                    >
                      Combo vé với giá
                    </Checkbox>
                  </Col>
                  <Col>
                    <Input
                      className="col_i1"
                      placeholder="Giá vé"
                      disabled={!comboChecked} // Disable the input when checkbox is not checked
                    />
                  </Col>
                  <Col className="col_tx1">/</Col>
                  <Col>
                    <Input
                      className="col_i2"
                      placeholder="Vé"
                      disabled={!comboChecked} // Disable the input when checkbox is not checked
                    />
                  </Col>
                  <Col className="col_tx1">vé</Col>
                </Row>
              </Col>
            </Row>
          </CheckboxGroup>
          </Col>
          
        </Row>
        <Row>
          <h4>Tình trạng</h4>
          <Col span={24}>
          <Select

    labelInValue
    defaultValue={{ value: 'dangApDung', label: 'Đang áp dụng' }}
    style={{ width: 140 }}
    onChange={handleChange}
    options={[
      {
        value: 'dangApDung',
        label: 'Đang áp dụng',
      },
      {
        value: 'tat',
        label: 'Tắt',
      },
    ]}
  />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p style={{color: 'var(--text, #1E0D03)', fontSize:'12px', fontStyle:'italic', fontWeight:'400', lineHeight:'normal',opacity: '0.4000000059604645' }}>* là thông tin bắt buộc</p>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ThemGoiVe;
