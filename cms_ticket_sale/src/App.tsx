import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DataList from './QuanLyVe/DanhSach';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuSider from './component/MenuSider';
import MenuHeader from './component/MenuHeader';
import LocVe from './component/LocVe';
import CapNhatGoiVe from './component/CapNhatGoiVe';
import ThemGoiVe from './component/ThemGoiVe';
import ThongKe from './menu/ThongKe';
import Ve from './menu/Ve';
import DoiSoat from './menu/DoiSoat';
import DichVu from './menu/DichVu';

function App() {
  return (
    // <Provider store={store}>
    <Provider store={store}>
    <BrowserRouter>
     {/* các component Demo */}
     <Routes>
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
      <Routes>
        <Route path="/home" element={<DataList />} />
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