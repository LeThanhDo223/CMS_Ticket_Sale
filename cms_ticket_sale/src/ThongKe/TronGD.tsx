import React from 'react';
import { Pie } from '@ant-design/plots';

interface DataItem {
  type: string;
  value: number;
}

const DemoPieDG: React.FC = () => {
  const data: DataItem[] = [
    {
      type: 'Vé chưa sử dụng',
      value: 1,
    },
    {
      type: 'Vé đã sử dụng',
      value: 3,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.43, // Increase this value to make the pie chart thicker
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    
    statistic: {
      title: undefined, // Đặt giá trị là undefined để tránh lỗi kiểu
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
    
    legend: { visible: false }, // Ẩn phần legend

    // Mảng màu sắc cho các phần tử trong biểu đồ, tùy chỉnh màu theo ý thích của bạn
    color: ['#FF8A48', '#4F75FF'],

  };

   return (
    <div style={{ textAlign: 'center',height:"220px" }}>
      <h3 style={{  marginRight:140 }}>Gói gia đình</h3>
      <Pie {...config} />
    </div>
  );
};

export default DemoPieDG;
