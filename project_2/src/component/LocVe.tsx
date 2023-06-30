import React, { useState } from 'react';
import { Button, Modal, DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const LocVe: React.FC = () => {
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

  const onChange: DatePickerProps['onChange'] = (dates, dateStrings) => {
    console.log(dates, dateStrings);
  };

  return (
    <>
      <Button onClick={showModal}>
        Lọc vé
      </Button>
      <Modal
        visible={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button key="ok" type="primary" onClick={handleOk}>
              OK
            </Button>
          </div>
        }
      >
        <Space direction="horizontal">
          <div>
            <p>Từ ngày </p>
            <DatePicker onChange={onChange} />
          </div>
          <div>
            <p>Đến ngày </p>
            <DatePicker onChange={onChange} />
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default LocVe;
