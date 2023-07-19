import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PageDichVu, addPageData } from "../redux/dataDichVu";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const DataForm: React.FC = () => {
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
  });

  const handleAddData = async () => {
    try {
      // Randomly generate a 3-letter prefix for magoi
      const prefix = generateRandomString(3, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  
      // Generate 8 random digits for the numeric part of the code
      const numericPart = generateRandomString(8, "0123456789");
  
      // Combine the prefix and numeric part to form the magoi code
      const magoiCode = prefix + numericPart;
  
      // Convert ngayad and ngayhh to Firebase Timestamps using Day.js
      const ngayadTimestamp = dayjs(newData.ngayad).toISOString();
      const gioadTimestamp = dayjs(newData.gioad, "HH:mm").toISOString();
      const ngayhhTimestamp = dayjs(newData.ngayhh).toISOString();
      const giohhTimestamp = dayjs(newData.giohh, "HH:mm").toISOString();
  
      // Save the data to Firebase
      await addDoc(collection(firestore, "dichvu"), {
        ...newData,
        magoi: magoiCode,
        ngayad: ngayadTimestamp,
        gioad: gioadTimestamp,
        ngayhh: ngayhhTimestamp,
        giohh: giohhTimestamp,
      });
  
      // Dispatch the data to Redux
      dispatch(addPageData(newData) as any);
  
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
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  
  const generateRandomString = (length: number, characters?: string) => {
    if (!characters) {
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <div>
       <input
        type="number"
        value={newData.stt}
        onChange={(e) => setNewData({ ...newData, stt: Number(e.target.value) })}
        placeholder="STT"
      />
      <input
        type="text"
        value={newData.gia}
        onChange={(e) => setNewData({ ...newData, gia: e.target.value })}
        placeholder="Giá"
      />
      <input
        type="text"
        value={newData.giacombo}
        onChange={(e) => setNewData({ ...newData, giacombo: e.target.value })}
        placeholder="Giá combo"
      />
      <input
        type="text"
        value={newData.combo}
        onChange={(e) => setNewData({ ...newData, combo: e.target.value })}
        placeholder="Combo"
      />
      <div>
        <h4>Ngày áp dụng</h4>
        <DatePicker
          style={{ width: "120px" }}
          value={newData.ngayad ? dayjs(newData.ngayad) : null}
          
          onChange={(date, dateString) => setNewData({ ...newData, ngayad: dateString })}
        />
        <h4>Giờ áp dụng</h4>
        <TimePicker
          style={{ width: "120px", marginLeft: "10px" }}
          value={newData.gioad ? dayjs(newData.gioad, "HH:mm") : null}
          
          onChange={(time, timeString) => setNewData({ ...newData, gioad: timeString })}
        />
      </div>

      {/* Trường Ngày hết hạn */}
      <div style={{ paddingLeft: "50px" }}>
        <h4>Ngày hết hạn</h4>
        <DatePicker
          style={{ width: "120px" }}
          value={newData.ngayhh ? dayjs(newData.ngayhh) : null}
         
          onChange={(date, dateString) => setNewData({ ...newData, ngayhh: dateString })}
        />
        <h4>Giờ hết hạn</h4>
        <TimePicker
          style={{ width: "120px", marginLeft: "10px" }}
          value={newData.giohh ? dayjs(newData.giohh, "HH:mm") : null}
         
          onChange={(time, timeString) => setNewData({ ...newData, giohh: timeString })}
        />
      </div>

      <input
        type="text"
        value={newData.tengoi}
        onChange={(e) => setNewData({ ...newData, tengoi: e.target.value })}
        placeholder="Tên gói"
      />
      <input
        type="text"
        value={newData.tt}
        onChange={(e) => setNewData({ ...newData, tt: e.target.value })}
        placeholder="tt"
      />

      <button onClick={handleAddData}>Thêm dữ liệu</button>
    </div>
  );
};

export default DataForm;
