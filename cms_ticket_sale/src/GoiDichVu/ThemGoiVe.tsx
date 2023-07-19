import React, { useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Space,
  Row,
  Col,
  Checkbox,
  Input,
  TimePicker,
  Select,
} from "antd";
import "../css/Style.css";
import { useDispatch } from "react-redux";
import { PageDichVu, addPageData } from "../redux/dataDichVu";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const { Group: CheckboxGroup } = Checkbox;

const ThemGoiVe: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [veLeChecked, setVeLeChecked] = useState(false);
  const [comboChecked, setComboChecked] = useState(false);
  //
  const dispatch = useDispatch();

  const [newData, setNewData] = useState<PageDichVu>({
    stt: 0,
    gia: "",
    giacombo: "",
    combo: "",
    magoi: "",
    ngayad: "",
    gioad: "",
    ngayhh: "",
    giohh: "",
    tengoi: "",
    tt: "",
    mask:"",
    tensk:"",
  });

  const [tinhTrang, setTinhTrang] = useState<string>("dangApDung");

  const generateRandomMagoi = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let magoi = "";
    for (let i = 0; i < 3; i++) {
      magoi += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 8; i++) {
      magoi += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return magoi;
  };

  const handleAddData = async () => {
    setOpen(false);
    try {
      // Generate random magoi
      const randomMagoi = generateRandomMagoi();

      // Convert ngayad and ngayhh to Firebase Timestamps using Day.js
      const ngayadTimestamp = dayjs(newData.ngayad).toISOString();
      const gioadTimestamp = dayjs(newData.gioad, "HH:mm").toISOString();
      const ngayhhTimestamp = dayjs(newData.ngayhh).toISOString();
      const giohhTimestamp = dayjs(newData.giohh, "HH:mm").toISOString();

      // Save the data to Firebase with the generated magoi and tinhTrang status
      await addDoc(collection(firestore, "dichvu"), {
        ...newData,
        magoi: randomMagoi,
        ngayad: ngayadTimestamp,
        gioad: gioadTimestamp,
        ngayhh: ngayhhTimestamp,
        giohh: giohhTimestamp,
        tt: tinhTrang,
      });

      // Dispatch the data to Redux
      dispatch(
        addPageData({ ...newData, magoi: randomMagoi, tt: tinhTrang }) as any
      );

      // Clear the form
      setNewData({
        stt: 0,
        gia: "",
        giacombo: "",
        combo: "",
        magoi: "",
        ngayad: "",
        gioad: "",
        ngayhh: "",
        giohh: "",
        tengoi: "",
        tt: "",
        mask:"",
    tensk:"",
      });

      // Reset Tình trạng to the default value
      setTinhTrang("dangApDung");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  //
  return (
    <>
      <Button onClick={showModal} className="col_b2">
        Thêm gói vé
      </Button>
      <Modal
        width={700}
        visible={open}
        onCancel={handleCancel}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button className="col_bt1" key="cancel" onClick={handleCancel}>
              Hủy
            </Button>
            <Button className="col_bt2" key="ok" onClick={handleAddData}>
              Lưu
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: "center" }}>
          <h2>Thêm gói vé</h2>
        </div>
        <Row>
          <Col span={24}>
            <h4>Tên gói vé*</h4>
            <Input
              value={newData.tengoi}
              onChange={(e) =>
                setNewData({ ...newData, tengoi: e.target.value })
              }
              style={{ width: "300px" }}
              placeholder="Nhập tên gói vé"
            ></Input>
          </Col>
        </Row>
        <Space direction="horizontal">
          <div>
            <h4>Ngày áp dụng</h4>
            <DatePicker
              style={{ width: "120px" }}
              value={newData.ngayad ? dayjs(newData.ngayad) : null}
              onChange={(date, dateString) =>
                setNewData({ ...newData, ngayad: dateString })
              }
            />
            <TimePicker
              style={{ width: "120px", marginLeft: "10px" }}
              value={newData.gioad ? dayjs(newData.gioad, "HH:mm") : null}
              onChange={(time, timeString) =>
                setNewData({ ...newData, gioad: timeString })
              }
            />
          </div>
          <div style={{ paddingLeft: "50px" }}>
            <h4>Ngày hết hạn</h4>
            <DatePicker
              style={{ width: "120px" }}
              value={newData.ngayhh ? dayjs(newData.ngayhh) : null}
              onChange={(date, dateString) =>
                setNewData({ ...newData, ngayhh: dateString })
              }
            />
            <TimePicker
              style={{ width: "120px", marginLeft: "10px" }}
              value={newData.giohh ? dayjs(newData.giohh, "HH:mm") : null}
              onChange={(time, timeString) =>
                setNewData({ ...newData, giohh: timeString })
              }
            />
          </div>
        </Space>
        <Row>
          <Col>
            <h4>Giá vé áp dụng</h4>
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
                      <Input
                        value={newData.gia}
                        onChange={(e) =>
                          setNewData({ ...newData, gia: e.target.value })
                        }
                        className="col_i1"
                        placeholder="Giá vé"
                        disabled={!veLeChecked} // Disable the input when checkbox is not checked
                      />
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
                      <Input
                        value={newData.giacombo}
                        onChange={(e) =>
                          setNewData({ ...newData, giacombo: e.target.value })
                        }
                        className="col_i1"
                        placeholder="Giá vé"
                        disabled={!comboChecked} // Disable the input when checkbox is not checked
                      />
                    </Col>
                    <Col className="col_tx1">/</Col>
                    <Col>
                      <Input
                        value={newData.combo}
                        onChange={(e) =>
                          setNewData({ ...newData, combo: e.target.value })
                        }
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
              value={{
                value: tinhTrang,
                label: tinhTrang === "Hết hạn" ? "Hết hạn" : "Đang áp dụng",
              }}
              style={{ width: 140 }}
              onChange={(value) => setTinhTrang(value.value)}
              options={[
                {
                  value: "Đang áp dụng",
                  label: "Đang áp dụng",
                },
                {
                  value: "Hết hạn",
                  label: "Hết hạn",
                },
              ]}
            />
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
      </Modal>
    </>
  );
};

export default ThemGoiVe;
