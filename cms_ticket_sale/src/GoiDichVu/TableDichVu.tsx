import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag, Pagination } from "antd";
import { fetchPageDataGD, fetchPageDataSK } from "../redux/dataSlice";
import { RootState } from "../redux/store";
import "../QuanLyVe/QuanLyVe.css";

const DataDichVu: React.FC = () => {
  const dispatch = useDispatch();
  const dataGD = useSelector((state: RootState) => state.page.dataGD);
  const dataSK = useSelector((state: RootState) => state.page.dataSK);
  const loading = useSelector((state: RootState) => state.page.loading);
  const error = useSelector((state: RootState) => state.page.error);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const activeButton = "giaDinh";
  const currentData = activeButton === "giaDinh" ? dataGD : dataSK;

  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (activeButton === "giaDinh") {
      dispatch(fetchPageDataGD() as any);
    } else if (activeButton === "suKien") {
      dispatch(fetchPageDataSK() as any);
    }
  }, [dispatch, activeButton]);

  const filteredData = currentData.filter((item: any) =>
    item.sove.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const modifiedData = filteredData
    .slice(startIndex, endIndex)
    .map((item: any, index: number) => ({
      ...item,
      key: index,
      ttsd: Array.isArray(item.ttsd) ? item.ttsd : [item.ttsd],
      isSuKien: !!item.tsk,
    }));

    const columnsGiaDinh = [
        {
          title: "STT",
          dataIndex: "stt",
          key: "stt",
        },
        {
          title: "Mã đặt vé",
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
        {/* Phần tìm kiếm */}
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={modifiedData}
            columns={columnsGiaDinh}
            pagination={false}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
          />
          <Pagination
            className="col_pagination"
            current={currentPage}
            total={filteredData.length}
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

export default DataDichVu;
