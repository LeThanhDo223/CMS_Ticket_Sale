import { Button, Popover } from 'antd';
import React from 'react';
import { MoreOutlined } from "@ant-design/icons";
import "./QuanLyVe.css";
import DoiNgaySD from './DoiNgaySD';

const content = (
  <div className='bt-chon'>
    <Button className='bt-chon-text' type='link'>Sử dụng vé</Button>
    <Button className='bt-chon-text' type='link'><DoiNgaySD/></Button>
  </div>
);

const buttonWidth = 70;

const Chon: React.FC = () => (
  <div>
   
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Popover placement="left" content={content} trigger="click">
        <Button  type='link'><MoreOutlined/></Button>
      </Popover>
    </div>
  </div>
);
export default Chon;
