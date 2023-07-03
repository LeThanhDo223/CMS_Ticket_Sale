import React from "react";
import { Layout, Row, Col, Input, Button, Table, Tag, Pagination } from "antd";
import "../css/ThongKe.css";
import MenuHeader from "../component/MenuHeader";
import MenuSider from "../component/MenuSider";
import LocVe from "../component/LocVe";
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Search } = Input;
// table
interface DataType {
  stt: number;
  booking: string;
  sove: number;
  ttsd: string[];
  ngaysd: string;
  ngayxv: string;
  checkin: string;
  actions: React.ReactNode;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Booking code',
    dataIndex: 'booking',
    key: 'booking',
  },
  {
    title: 'Số vé',
    dataIndex: 'sove',
    key: 'sove',
  },
  {
    title: 'Tình trạng sử dụng',
    dataIndex: 'ttsd',
    key: 'ttsd',
    render: (_, { ttsd }) => (
      <>
        {ttsd.map((tt) => {
          let color = '';
          let displayText = tt;
          if (tt.length > 10) {
            color = 'green';
            displayText = `• ${tt}`;
          } else if (tt === 'Hết hạn') {
            color = 'volcano';
            displayText = `• ${tt}`;
          } else {
            color = 'geekblue';
            displayText = `• ${tt}`;
          }
          return (
            <Tag color={color} key={tt}>
              {displayText.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'ngaysd',
    key: 'ngaysd',
  },
  {
    title: 'Ngày xuất vé',
    dataIndex: 'ngayxv',
    key: 'ngayxv',
  },
  {
    title: 'Cổng check-in',
    dataIndex: 'checkin',
    key: 'checkin',
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: () => <a> <MoreOutlined /></a>,
  },
];

const data: DataType[] = [
  {
    stt: 1,
    booking: 'ALTFGHJU',
    sove: 123456789034,
    ttsd: ['Đã Sử dụng'],
    ngaysd: '21/4/2021',
    ngayxv: '29/9/2021',
    checkin: 'Cổng 1',
    actions: <MoreOutlined />,
  },
  {
    stt: 2,
    booking: 'ALTOJMNB',
    sove: 236784631642,
    ttsd: ['Chưa sử dụng'],
    ngaysd: '21/4/2021',
    ngayxv: '29/9/2021',
    checkin: '-',
    actions: <MoreOutlined />,
  },
  {
    stt: 3,
    booking: 'ALTQTYJH',
    sove: 487621489474,
    ttsd: ['Hết hạn'],
    ngaysd: '21/4/2021',
    ngayxv: '29/9/2021',
    checkin: '-',
    actions: <MoreOutlined />,
  },
  {
    stt: 4,
    booking: 'ALTCFSDF',
    sove: 156464891479,
    ttsd: ['Hết hạn'],
    ngaysd: '21/4/2021',
    ngayxv: '29/9/2021',
    checkin: 'Cổng 1',
    actions: <MoreOutlined />,
  },
  
];


const Ve: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Layout>
      <Sider>
        <MenuSider />
      </Sider>

      <Layout className="col_back">
        <Header className="header" style={{ background: "none" }}>
          <MenuHeader />
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div className="col_content" style={{ padding: 24, minHeight: 360 }}>
            <Row>
              <Col span={24}>
                <h2 className="col_texth2">Danh sách vé</h2>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Search className="timkiem2" placeholder="Tìm bằng vé số"  />
              </Col>
              <Col span={4}>
                <LocVe />
                <Button>Xuất file (.csv)</Button>
              </Col>
            </Row>
            <Row> 
              <Col span={24}>
                 <Table
        columns={columns}
        dataSource={currentData}
        pagination={false}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'even-row' : 'odd-row' // Đặt lớp CSS cho dòng chẵn và dòng lẻ
        }
      />
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={pageSize}
        showSizeChanger={false}
        showQuickJumper={false}
        onChange={handlePageChange}
        style={{ textAlign: 'center', marginTop: '16px' }}
      />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Ve;
