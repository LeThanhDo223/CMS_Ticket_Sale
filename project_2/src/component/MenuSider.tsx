import React from "react";
import { Layout, Menu } from "antd";
import "../css/MenuSider.css";
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const MenuSider: React.FC = () => {
  return (
    <Layout className="Menu_sider" style={{ background: "none" }}>
      <div className="layout-container">
        <div className="logo-container">
          <img className="col_img3" src="/images/logo_1.png" alt="" />
        </div>
        <div className="menu-container">
          <Menu mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="general">General</Menu.Item>
              <Menu.Item key="profile">Profile</Menu.Item>
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
