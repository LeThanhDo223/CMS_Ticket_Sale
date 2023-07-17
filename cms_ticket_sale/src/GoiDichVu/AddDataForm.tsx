import React, { useState } from "react";
import { Form, Input, Button, DatePicker, TimePicker, Select, notification } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const { Option } = Select;

const AddDataForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Thêm dữ liệu mới vào Firebase
      await addDoc(collection(firestore, "dataDichVu"), {
        ...values,
        magoi: generateRandomString(11), // Tạo chuỗi ngẫu nhiên với 11 ký tự và số
      });

      // Xóa form và hiển thị thông báo thành công
      form.resetFields();
      notification.success({
        message: "Thành công",
        description: "Dữ liệu đã được thêm vào Firebase!",
      });
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu: ", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể thêm dữ liệu vào Firebase.",
      });
    }
    setLoading(false);
  };

  const generateRandomString = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Giá vé" name="gia">
        <Input />
      </Form.Item>
      <Form.Item label="Giá combo (VNĐ/Combo)" name="giacombo">
        <Input />
      </Form.Item>
      <Form.Item label="Số lượng combo" name="combo">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày áp dụng" name="ngayad">
        <DatePicker />
        <TimePicker format="HH:mm:ss" />
      </Form.Item>
      <Form.Item label="Ngày hết hạn" name="ngayhh">
        <DatePicker />
        <TimePicker format="HH:mm:ss" />
      </Form.Item>
      <Form.Item label="Tên gói vé" name="tengoi">
        <Input />
      </Form.Item>
      <Form.Item label="Tình trạng" name="tt">
        <Select>
          <Option value="Đang áp dụng">Đang áp dụng</Option>
          <Option value="Tắt">Tắt</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Thêm Dữ liệu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDataForm;
