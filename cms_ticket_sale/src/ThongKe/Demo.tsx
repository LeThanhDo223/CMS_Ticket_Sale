import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

interface DataItem {
  timePeriod: number;
  value: number;
}

const DemoArea: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'home'));
    const dataArray: DataItem[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dataArray.push({
        timePeriod: data.timePeriod,
        value: data.value,
      });
    });

    setData(dataArray);
  };

  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
    color: '#FAA05F',
    statistic: {
      content: '',
    },
    smooth: true, // Enable smooth curves
    areaStyle: {}, // Set areaStyle to customize the look of the curves
  };

  return <Area {...config} />;
};

export default DemoArea;
