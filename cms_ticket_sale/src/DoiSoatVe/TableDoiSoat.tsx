import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Pagination, Button } from "antd";
import { RootState } from "../redux/store";
import "../QuanLyVe/QuanLyVe.css";
import { fetchPageDoiSoat } from "../redux/dataDoiSoat";

const TableDoiSoat: React.FC = () => {
  const dispatch = useDispatch();
  const dataDS = useSelector((state: RootState) => state.dataDS);
  const loading = useSelector((state: RootState) => state.dataDS.loading);
  const error = useSelector((state: RootState) => state.dataDS.error);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataDS.dataDS;

  const [chotDoiSoat, setChotDoiSoat] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChotDoiSoat = () => {
    setChotDoiSoat(true);
  };

  useEffect(() => {
    dispatch(fetchPageDoiSoat() as any);
  }, [dispatch]);

  const modifiedData = currentData.slice(startIndex, endIndex).map((item) => ({
    ...item,
    tt: chotDoiSoat ? "Đã đổi soát" : "",
  }));

  const columnsDoiSoat = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Số vé",
      dataIndex: "sove",
      key: "sove",
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "ngaysd",
      key: "ngaysd",
    },
    {
      title: "Tên loại vé",
      dataIndex: "loaive",
      key: "loaive",
    },
    {
      title: "Cổng check-in",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      title: "Tình trạng",
      dataIndex: "tt",
      key: "tt",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Row className="col_mt1">
        <Button onClick={handleChotDoiSoat}>
          {chotDoiSoat ? "Đã đổi soát" : "Chốt đổi soát"}
        </Button>
        {chotDoiSoat && <Button>Xuất file</Button>}
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={modifiedData}
            columns={columnsDoiSoat}
            pagination={false}
            rowClassName={(record, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
          />
          <Pagination
            className="col_pagination"
            current={currentPage}
            total={currentData.length}
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

export default TableDoiSoat;
