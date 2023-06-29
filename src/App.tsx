import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThongKe from './menu/ThongKe';
import MenuSider from './component/MenuSider';
import MenuHeader from './component/MenuHeader';
import Ve from './menu/Ve';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/sider" element={<MenuSider />} />
    </Routes>
    <Routes>
      <Route path="/header" element={<MenuHeader />} />
    </Routes>







    <Routes>
      <Route path="/thongke" element={<ThongKe />} />
    </Routes>
    <Routes>
      <Route path="/ve" element={<Ve />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
