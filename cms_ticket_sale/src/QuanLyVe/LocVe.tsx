import React, { useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Space,
  Row,
  Col,
  Radio,
  Checkbox,
} from "antd";
import type { DatePickerProps, RadioChangeEvent } from "antd";
import "../css/Style.css";
import { FilterOutlined } from "@ant-design/icons";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

interface FilterProps {
  onFilter: (selectedTtsd: string | null) => void;
}
const LocVe: React.FC<FilterProps> = ({ onFilter }) => {
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

  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const onChange = (values: CheckboxValueType[]) => {
    if (values.includes("all")) {
      setCheckedValues(["all"]);
    } else {
      setCheckedValues(values.filter((value) => value !== "all"));
    }
  };
  //filter radio
  const [selectedTtsd, setSelectedTtsd] = useState<string | null>(null);
  
  const handleTtsdChange = (e: RadioChangeEvent) => {
    setSelectedTtsd(e.target.value);
  };

  const handleFilter = () => {
    onFilter(selectedTtsd);
  };

  // 

  return (
    <>
      <Button className="col_t1" onClick={showModal}>
        <FilterOutlined />
        Lọc vé{" "}
      </Button>
      <Modal
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button  onClick={handleFilter} className="col_t2" key="ok" >
              Lọc
            </Button>
          </div>
        }
      >
        <h2 style={{ textAlign: "center" }}>Lọc vé</h2>
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
            <Radio.Group onChange={handleTtsdChange} name="radiogroup" defaultValue={null}>
              <Radio value={null}>Tất cả</Radio>
              <Radio value="Đã sử dụng">Đã sử dụng</Radio>
        <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
        <Radio value="Hết hạn">Hết hạn</Radio>
            </Radio.Group>
          </Col>
          <Col>
            <h4>Cổng Check - in</h4>
            <Checkbox.Group
              style={{ width: "100%" }}
              value={checkedValues}
              onChange={onChange}
            >
              <Row>
                <Col span={8}>
                  <Checkbox value="all">Tất cả</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cổng 1">Cổng 1</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cổng 2">Cổng 2</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cổng 3">Cổng 3</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cổng 4">Cổng 4</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cổng 5">Cổng 5</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default LocVe;