import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThongKe from './menu/ThongKe';
import MenuSider from './component/MenuSider';
import MenuHeader from './component/MenuHeader';
import Ve from './menu/Ve';
import LocVe from './component/LocVe';
import DoiSoat from './menu/DoiSoat';

function App() {
  return (
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
    
  {/* các component chính */}
  <Routes>
      <Route path="/" element={<ThongKe />} />
    </Routes>
    <Routes>
      <Route path="/ve" element={<Ve />} />
    </Routes>
    <Routes>
      <Route path="/doisoatve" element={<DoiSoat />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
