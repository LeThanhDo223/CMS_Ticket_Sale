import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag, Pagination } from "antd";
import { RootState } from "../redux/store";
import "../QuanLyVe/QuanLyVe.css";
import { fetchPageDichVu } from "../redux/dataDichVu";
import moment from "moment";
import { PageDichVu } from "../redux/dataDichVu";
import CapNhat from "./CapNhat";

const TableDichVu: React.FC = () => {
  const dispatch = useDispatch();
  const dataDV = useSelector((state: RootState) => state.dataDV);
  const loading = useSelector((state: RootState) => state.dataDV.loading);
  const error = useSelector((state: RootState) => state.dataDV.error);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataDV.dataDV;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchPageDichVu() as any);
  }, [dispatch]);

  const formatDate = (timestamp: any) => {
    return moment(timestamp.toDate()).format("DD/MM/YYYY HH:mm:ss");
  };

  const modifiedData = currentData
    .slice(startIndex, endIndex)
    .map((item: any, index: number) => ({
      ...item,
      key: index,
      ttsd: Array.isArray(item.ttsd) ? item.ttsd : [item.ttsd],
      isSuKien: !!item.tsk,
      ngayad: formatDate(item.ngayad),
      ngayhh: formatDate(item.ngayhh),
    }));

  const columnsDichVu = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã gói",
      dataIndex: "magoi",
      key: "magoi",
    },
    {
      title: "Tên gói vé",
      dataIndex: "tengoi",
      key: "tengoi",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "ngayad",
      key: "ngayad",
      render: (ngayad: string) => (
        <>
          {ngayad.split(" ")[0]} {/* Ngày ở định dạng DD/MM/YYYY */}
          <br />
          {ngayad.split(" ")[1]} {/* Thời gian ở định dạng HH:mm:ss */}
        </>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngayhh",
      key: "ngayhh",
      render: (ngayhh: string) => (
        <>
          {ngayhh.split(" ")[0]} {/* Ngày ở định dạng DD/MM/YYYY */}
          <br />
          {ngayhh.split(" ")[1]} {/* Thời gian ở định dạng HH:mm:ss */}
        </>
      ),
    },
    {
      title: "Giá vé",
      dataIndex: "gia",
      key: "gia",
      render: (gia: string) => (
        <div>
          <span>{gia} VNĐ</span>
        </div>
      ),
    },
    {
      title: "Giá combo (VNĐ/Combo)",
      dataIndex: "giacombo",
      key: "giacombo",
      render: (giacombo: string, record: PageDichVu) => (
        <div>
          <span>{giacombo} VNĐ</span>
          <span>/{record.combo} Vé</span>
        </div>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "tt",
      key: "tt",
      render: (tt: string[]) => (
        <>
          {Array.isArray(tt) &&
            tt.map((ttItem) => {
              let color = "";
              let displayText = ttItem;
              if (ttItem.length > 10) {
                color = "green";
                displayText = `• ${ttItem}`;
              } else {
                color = "volcano";
                displayText = `• ${ttItem}`;
              }
              return (
                <Tag color={color} key={ttItem}>
                  {displayText.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => <CapNhat /> ,
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
            columns={columnsDichVu}
            pagination={false}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
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

export default TableDichVu;
