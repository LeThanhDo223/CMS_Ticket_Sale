import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pie } from '@ant-design/plots';
import { fetchPageDataSK } from '../redux/dataSlice'; 
import { ThunkDispatch } from 'redux-thunk'; // Import ThunkDispatch
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
// Import the fetchPageDataSK async thunk

interface DataItem {
  type: string;
  value: number;
}

const DemoPieSK: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const dataSK = useSelector((state: any) => state.page.dataSK); // Get the dataSK from Redux store

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    dispatch(fetchPageDataSK());
  }, [dispatch]);

  const processData = () => {
    // Process the data to calculate the values for "ĐÃ SỬ DỤNG" and "CHƯA SỬ DỤNG"
    const usedCount = dataSK.filter((item: any) => item.ttsd === 'Đã sử dụng').length;
    const unusedCount = dataSK.filter((item: any) => item.ttsd === 'Chưa sử dụng').length;

    return [
      {
        type: 'Vé đã sử dụng',
        value: usedCount,
      },
      {
        type: 'Vé chưa sử dụng',
        value: unusedCount,
      },
    ];
  };

  const config = {
    appendPadding: 10,
    data: processData(), // Use the processed data
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.43,
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
      title: undefined,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
    color: ['#FF8A48', '#4F75FF'],
  };

  return (
    <div style={{ textAlign: 'center', height: '220px' }}>
      <h3 style={{ marginRight: 140 }}>Gói sự kiện</h3>
      <Pie {...config} />
    </div>
  );
};

export default DemoPieSK;
