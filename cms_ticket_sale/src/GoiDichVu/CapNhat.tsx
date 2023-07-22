import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Form,
  Input,
  message,
  Button,
  Row,
  Col,
  Space,
  Checkbox,
  Select, // Step 1: Import Select component
} from "antd";
import { PageDichVu, updatePageData } from "../redux/dataDichVu";
import { ThunkDispatch, unwrapResult } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import DatePicker from "antd/lib/date-picker";
import TimePicker from "antd/lib/time-picker";
import "dayjs/locale/vi"; // Load Vietnamese locale for Dayjs
import { EditOutlined } from "@ant-design/icons";
import "../css/Style.css";

dayjs.locale("vi"); // Set Dayjs locale to Vietnamese

// Define the RootState type based on the combined reducers
type RootState = ReturnType<typeof combineReducers>;

// Now you can use RootState in the CapNhat component
const { Option } = Select;
// Now you can use RootState in the CapNhat component
const { Group: CheckboxGroup } = Checkbox;
const CapNhat = ({ data }: { data: PageDichVu }) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Format the date and time values to match the expected format
      values.ngayad = values.ngayad.format("YYYY-MM-DD");
      values.gioad = values.gioad.format("HH:mm:ss");
      values.ngayhh = values.ngayhh.format("YYYY-MM-DD");
      values.giohh = values.giohh.format("HH:mm:ss");

      console.log("data:", data);
      console.log("values:", values);

      // Check if giaveadung is not undefined, and set a default value if it's empty
      if (values.giaveadung === undefined) {
        values.giaveadung = ""; // Set a default value, or handle it according to your needs
      }

      // Dispatch action cập nhật dữ liệu lên Firebase
      const updatedData = { ...data, ...values };
      await dispatch(updatePageData(updatedData));

      setShowModal(false);
      message.success("Cập nhật thành công!");
    } catch (error) {
      console.log("Validation error", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const showUpdateModal = () => {
    setShowModal(true);
    form.setFieldsValue({
      magoi: data.magoi,
      tengoi: data.tengoi,
      ngayad: dayjs(data.ngayad),
      gioad: dayjs(data.gioad, "HH:mm:ss"),
      ngayhh: dayjs(data.ngayhh),
      giohh: dayjs(data.giohh, "HH:mm:ss"),
      gia: data.gia,
      giacombo: data.giacombo,
      combo: data.combo,
      tt: data.tt,
    });
  };

  const [veLeChecked, setVeLeChecked] = useState(false);
  const [comboChecked, setComboChecked] = useState(false);

  return (
    <>
      <Button className="bt12" type="link" onClick={showUpdateModal}>
        <EditOutlined />
        Cập nhật
      </Button>
      <Modal
        width={700}
        visible={showModal}
        onCancel={handleCancel}
        onOk={handleOk}
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
        <div style={{ textAlign: "center" }}>
          <h2>Cập nhật thông tin gói vé</h2>
        </div>

        <Form form={form} layout="vertical">
          <Row>
            <Col span={12}>
              <Form.Item label="Mã sự kiện*" name="magoi">
                <Input style={{ width: "250px" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên sự kiện" name="tengoi">
                <Input style={{ width: "300px" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <h4>Ngày áp dụng</h4>
            <Space direction="horizontal">
            <div>
              
              <Form.Item name="ngayad">
                <DatePicker style={{ width: "120px" }} />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="gioad">
                <TimePicker
                  style={{ width: "120px", marginLeft: "10px" }}
                  format="HH:mm:ss"
                  defaultValue={dayjs(data.gioad)}
                />
              </Form.Item>
            </div>
          </Space>
            </Col>
            <Col span={12}>
            <h4>Ngày hết hạn</h4>
            <Space direction="horizontal">
            <div>
              
              <Form.Item name="ngayhh">
                <DatePicker style={{ width: "120px" }} />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="giohh">
                <TimePicker
                  style={{ width: "120px", marginLeft: "10px" }}
                  format="HH:mm:ss"
                  defaultValue={dayjs(data.gioad)}
                />
              </Form.Item>
            </div>
          </Space>
            </Col>
          
          
          </Row>

          <CheckboxGroup style={{ width: "100%" }}>
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
                    <Form.Item label="" name="gia">
                      <Input
                        className="col_i1"
                        placeholder="Giá vé"
                        disabled={!veLeChecked}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="col_tx1">/ vé</Col>
                </Row>
                <Row style={{ marginTop: "10px" }}>
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
                    <Form.Item label="" name="giacombo">
                      <Input
                        className="col_i1"
                        placeholder="Giá vé"
                        disabled={!comboChecked}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="col_tx1">/</Col>
                  <Col>
                    <Form.Item label="" name="combo">
                      <Input
                        className="col_i2"
                        placeholder="Vé"
                        disabled={!comboChecked}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="col_tx1">vé</Col>
                </Row>
              </Col>
            </Row>
          </CheckboxGroup>
          <Row>
          <Col>
            <h4>Tình trạng</h4>
            <Form.Item name="tt">
              <Select style={{ width: "250px" }} >
                <Option value="Đang áp dụng">Đang áp dụng</Option>
                <Option value="Tắt">Tắt</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p
              style={{
                color: "var(--text, #1E0D03)",
                fontSize: "12px",
                fontStyle: "italic",
                fontWeight: "400",
                lineHeight: "normal",
                opacity: "0.4000000059604645",
              }}
            >
              * là thông tin bắt buộc
            </p>
          </Col>
        </Row>
        </Form>
        
      </Modal>
    </>
  );
};

export default CapNhat;
