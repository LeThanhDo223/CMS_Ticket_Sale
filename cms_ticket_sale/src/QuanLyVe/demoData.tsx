import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from './demoFliter';

interface DataType {
  key: string;
  name: string;
  age: string;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 'Cổng 1',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 'Cổng 2',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 'Cổng 3',
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 'Cổng 3',
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Jim Green',
    age: 'Cổng 2',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '6',
    name: 'John Brown',
    age: 'Cổng 2',
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '7',
    name: 'Jim Green',
    age: 'Cổng 1',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
];

const Data: React.FC = () => {
  const [filteredData, setFilteredData] = useState<DataType[]>(data);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);

  const handleFilter = (selectedTag: string | null, selectedAges: string[]) => {
    setSelectedTag(selectedTag);
    setSelectedAges(selectedAges);

    if (selectedTag === 'all' && selectedAges.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => {
        const isAgeMatched = selectedAges.length === 0 || selectedAges.includes(item.age);
        const isTagMatched = selectedTag === null || selectedTag === 'all' || item.tags.includes(selectedTag);
        return isAgeMatched && isTagMatched;
      });
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Filter onFilter={handleFilter} />
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default Data;
