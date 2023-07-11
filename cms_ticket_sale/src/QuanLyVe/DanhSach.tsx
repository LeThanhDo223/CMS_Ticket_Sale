import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag } from "antd";
import { fetchData } from "../redux/dataSlice";
import { RootState } from "../redux/store";

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
    render: (ttsd: string[] | string) => (
      <>
        {Array.isArray(ttsd) ? (
          ttsd.map((tt, index) => (
            <Tag
              color={
                tt.length > 10
                  ? "green"
                  : tt === "Hết hạn"
                  ? "volcano"
                  : "geekblue"
              }
              key={index}
            >
              {tt.toUpperCase()}
            </Tag>
          ))
        ) : (
          <Tag>{ttsd}</Tag>
        )}
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
];

const DataList: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.page.data);
  const loading = useSelector((state: RootState) => state.page.loading);
  const error = useSelector((state: RootState) => state.page.error);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data.map((item, index) => ({
              ...item,
              key: index,
            }))}
            pagination={false}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default DataList;