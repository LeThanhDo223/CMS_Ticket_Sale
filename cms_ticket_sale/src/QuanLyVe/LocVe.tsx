import React, { useState } from "react";
import { Button, Modal, DatePicker, Space, Row, Col, Radio, Checkbox } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { RadioChangeEvent } from "antd/es/radio";

interface FilterProps {
  onFilter: (selectedTtsd: string | null, selectedCheck: string[]) => void;
}

const LocVe: React.FC<FilterProps> = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [selectedTtsd, setSelectedTtsd] = useState<string | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onDateChange = () => {
    // Handle date change logic here
  };

  const onChange = (values: CheckboxValueType[]) => {
    if (values.includes("Tất cả")) {
      setCheckedValues(["Tất cả"]); // Include "Tất cả" option
    } else {
      setCheckedValues(values.filter((value) => value !== "Tất cả"));
    }
  };
  

  const handleTtsdChange = (e: RadioChangeEvent) => {
    setSelectedTtsd(e.target.value ?? null);
  };

  const handleFilter = () => {
    const processedCheck = checkedValues.includes("Tất cả") ? [] : checkedValues.map(String);
    onFilter(selectedTtsd, processedCheck);
    setOpen(false)
  };

  return (
    <>
      <Button className="col_t1" onClick={showModal}>
        <FilterOutlined />
        Lọc vé
      </Button>
      <Modal
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleFilter} className="col_t2" key="ok">
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
            <Radio.Group
              onChange={handleTtsdChange}
              name="radiogroup"
              value={selectedTtsd}
            >
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
                  <Checkbox value="Tất cả">Tất cả</Checkbox>
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
