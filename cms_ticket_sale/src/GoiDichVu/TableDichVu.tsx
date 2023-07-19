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
  // Khai báo state và sử dụng useSelector, useDispatch, useEffect
  const dispatch = useDispatch();
  const dataDV = useSelector((state: RootState) => state.dataDV);
  const loading = useSelector((state: RootState) => state.dataDV.loading);
  const error = useSelector((state: RootState) => state.dataDV.error);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [gioad, setGioad] = useState(""); // Thêm "gioad" vào state của component

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dataDV.dataDV;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchPageDichVu() as any);
  }, [dispatch]);

  useEffect(() => {
    // Lấy dữ liệu "gioad" từ "currentData" khi "ngayad" thay đổi
    const gioadArray = currentData.map((item: PageDichVu) => item.gioad);
    setGioad(gioadArray.join(", "));
  }, [currentData]);

  const modifiedData = currentData
    .slice(startIndex, endIndex)
    .map((item: any, index: number) => ({
      ...item,
      stt: index + 1, // Tạo trường 'stt' với giá trị tăng dần tự động
      key: index,
      ttsd: Array.isArray(item.ttsd) ? item.ttsd : [item.ttsd],
      isSuKien: !!item.tsk,
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
      render: (ngayad: string, record: PageDichVu) => (
        <>
          {ngayad}
          <br />
          {record.gioad}
        </>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngayhh",
      key: "ngayhh",
      render: (ngayhh: string, record: PageDichVu) => (
        <>
          {ngayhh}
          <br />
          {record.giohh}
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
      render: (tt: string) => (
        <>
          {tt.length > 10 ? (
            <Tag color="green">• {tt.toUpperCase()}</Tag>
          ) : (
            <Tag color="red">• {tt.toUpperCase()}</Tag>
          )}
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
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
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