import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../css/MenuSider.css";
import { HomeOutlined, FileSyncOutlined, SettingOutlined,FileSearchOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const MenuSider: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname]);

  const handleMenuClick = (key: string) => {
    setSelectedKeys([key]);
  };

  return (
    <Layout className="Menu_sider" style={{ background: "none" }}>
      <div className="layout-container">
        <div className="logo-container">
          <img className="col_img3" src="/images/logo_1.png" alt="" />
        </div>
        <div className="menu-container">
          <Menu className="menu_text" mode="inline" selectedKeys={selectedKeys} onClick={({ key }) => handleMenuClick(key)} defaultOpenKeys={['settings']}>
            <Menu.Item  key="/" icon={<HomeOutlined />}>
              <Link  to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="/ve" icon={<FileSearchOutlined />}>
              <Link to="/ve">Quản lý vé</Link>
            </Menu.Item>
            <Menu.Item key="/doisoatve" icon={<FileSyncOutlined />}>
              <Link to="/doisoatve">Đổi soát vé</Link>
            </Menu.Item>
            <SubMenu key="settings" icon={<SettingOutlined />} title="Cài đặt">
              <Menu.Item key="/caidat">
                <Link to="/caidat">Gói dịch vụ</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="col_tt">
          <p>Copyright @ 2020 Alta Software</p>
        </div>
      </div>
    </Layout>
  );
};

export default MenuSider;
