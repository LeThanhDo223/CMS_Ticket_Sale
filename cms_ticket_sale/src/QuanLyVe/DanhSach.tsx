import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag, Pagination,Button } from "antd";
import { fetchData } from "../redux/dataSlice";
import { RootState } from "../redux/store";
import { MoreOutlined  } from '@ant-design/icons';
import "./QuanLyVe.css";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Booking code",
    dataIndex: "booking",
    key: "booking",
  },
  {
    title: "Số vé",
    dataIndex: "sove",
    key: "sove",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "ttsd",
    key: "ttsd",
    render: (_: any, { ttsd }: { ttsd: string[] }) => (
      <>
        {ttsd.map((tt) => {
          let color = "";
          let displayText = tt;
          if (tt.length > 10) {
            color = "green";
            displayText = `• ${tt}`;
          } else if (tt === "Hết hạn") {
            color = "volcano";
            displayText = `• ${tt}`;
          } else {
            color = "geekblue";
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
    title: "Ngày sử dụng",
    dataIndex: "ngaysd",
    key: "ngaysd",
  },
  {
    title: "Ngày xuất vé",
    dataIndex: "ngayxv",
    key: "ngayxv",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkin",
    key: "checkin",
  },
  {
  title: '',
  dataIndex: 'actions',
  key: 'actions',
  render: () => <Button  type="link"> <MoreOutlined /></Button>,
},
];

const DataList: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.page.data);
  const loading = useSelector((state: RootState) => state.page.loading);
  const error = useSelector((state: RootState) => state.page.error);

  // page
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const modifiedData = data.map((item, index) => ({
    ...item,
    key: index,currentData,
    ttsd: Array.isArray(item.ttsd) ? item.ttsd : [item.ttsd],
  }));

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={modifiedData}
            pagination={false}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
          />
          <Pagination
            className="col_pagination"
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            showSizeChanger={false}
            showQuickJumper={false}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default DataList;
