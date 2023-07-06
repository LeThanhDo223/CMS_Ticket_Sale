import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThongKe from "./menu/ThongKe";
import MenuSider from "./component/MenuSider";
import MenuHeader from "./component/MenuHeader";
import Ve from "./menu/Ve";
import LocVe from "./component/LocVe";
import DoiSoat from "./menu/DoiSoat";
import DichVu from "./menu/DichVu";
import CapNhatGoiVe from "./component/CapNhatGoiVe";
import ThemGoiVe from "./component/ThemGoiVe";
import { store } from './store';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* các component Demo */}
        <Route path="/sider" element={<MenuSider />} />
      </Routes>
      <Routes>
        <Route path="/header" element={<MenuHeader />} />
      </Routes>

      <Routes>
        <Route path="/menu" element={<LocVe />} />
      </Routes>
      <Routes>
        <Route path="/capnhat" element={<CapNhatGoiVe />} />
      </Routes>
      <Routes>
        <Route path="/them" element={<ThemGoiVe />} />
      </Routes>
      {/* các component Demo */}




      {/* các component chính */}
      <Routes>
        <Route path="/" element={<ThongKe />} />
      </Routes>
      <Routes>
        <Route path="/QuanLyVe" element={<Ve />} />
      </Routes>
      <Routes>
        <Route path="/DoiSoat" element={<DoiSoat />} />
      </Routes>
      <Routes>
        <Route path="/DichVu" element={<DichVu />} />
      </Routes>
      {/* các component chính */}
    </BrowserRouter>
    </Provider>
  );
}

export default App;
