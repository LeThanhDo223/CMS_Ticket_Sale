import React from "react";
import {
  HomeOutlined,
  TagsOutlined,
  ContainerOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Layout } from "antd";

import "../css/MenuSider.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// Tạo một mảng items chứa các mục menu
const items: MenuProps["items"] = [
  getItem("Trang chủ", "sub1", <HomeOutlined />),

  getItem("Quản lý vé", "sub2", <ContainerOutlined />),

  getItem("Đổi soát vé", "sub3", <TagsOutlined />),

  getItem("Cài đặt", "sub6", <SettingOutlined />, [
    getItem("Gói dịch vụ", "1"),
  ]),
];
const MenuSider: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Layout className="Menu_sider" style={{ background: "none" }}>
      <div className="layout-container">
        <div className="logo-container">
          <img className="col_img3" src="/images/logo_1.png" alt="" />
        </div>
        <div className="menu-container">
          <Menu
            className="menu_text"
            onClick={onClick}
            style={{ marginTop: "50px" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="vertical"
            items={items}
          />
        </div>
        <div className="col_tt">
          <p>Copyright @ 2020 Alta Software</p>
        </div>
      </div>
    </Layout>
  );
};

export default MenuSider;
