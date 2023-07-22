// DataList.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag, Pagination, Button, Input } from "antd";
import { fetchPageDataGD, fetchPageDataSK } from "../redux/dataDoiSoat";
import { RootState } from "../redux/store";
import "../QuanLyVe/QuanLyVe.css";
const { Search } = Input;

const TableDoiSoat: React.FC<{ activeButton: string }> = ({ activeButton }) => {
  const dispatch = useDispatch();
  const dataGD = useSelector((state: RootState) => state.page.dataGD);
  const dataSK = useSelector((state: RootState) => state.page.dataSK);
  const loading = useSelector((state: RootState) => state.page.loading);
  const error = useSelector((state: RootState) => state.page.error);

  // Trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = activeButton === "giaDinh" ? dataGD : dataSK;

  const [searchText, setSearchText] = useState("");
  const [filteredBySearchData, setFilteredBySearchData] = useState<any[]>([]);

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

  useEffect(() => {
    const filteredData = currentData.filter((item: any) =>
      item.sove.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredBySearchData(filteredData);
    setCurrentPage(1);
  }, [currentData, searchText]);

  const handleFilter = (selectedTag: string | null, selectedCheck: string[]) => {
    setSelectedTag(selectedTag);
    setSelectedCheck(selectedCheck);
    setCurrentPage(1);
  };

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<string[]>([]);

  const filteredData = filteredBySearchData.filter((item: any) => {
    const isTagMatched =
      selectedCheck.length === 0 || selectedCheck.includes(item.checkin);
    const isTtsdMatched =
      selectedTag === null || item.ttsd.includes(selectedTag);
    return isTagMatched && isTtsdMatched;
  });

  const modifiedData = filteredData
    .slice(startIndex, endIndex)
    .map((item: any, index: number) => ({
      ...item,
      key: index,
      ttsd: Array.isArray(item.ttsd) ? item.ttsd : [item.ttsd],
      isSuKien: !!item.tsk,
    }));

  const modifiedDataGiaDinh = modifiedData.filter(
    (item: any) => !item.isSuKien
  );

  const modifiedDataSuKien = modifiedData.filter((item: any) => item.isSuKien);

  const columnsGiaDinh = [
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
      dataIndex: "tenloai",
      key: "tenloai",
    },
   
    {
      title: "Cổng check - in",
      dataIndex: "checkin",
      key: "checkin",
    },
    
    {
      title: "",
      dataIndex: "tt",
      key: "tt",
    },
  ];

  const columnsSuKien = [
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
      title: "Tên sự kiện",
      dataIndex: "tsk",
      key: "tsk",
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "ngaysd",
      key: "ngaysd",
    },
    {
      title: "Tên loại vé",
      dataIndex: "tenloai",
      key: "tenloai",
    },
   
    {
      title: "Cổng check - in",
      dataIndex: "checkin",
      key: "checkin",
    },
    
    {
      title: "",
      dataIndex: "tt",
      key: "tt",
    },
  ];

  const columns = activeButton === "giaDinh" ? columnsGiaDinh : columnsSuKien;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Row className="col_mt1">
        <Col span={19}>
          <Search
            className="timkiem2"
            placeholder="Tìm bằng số vé"
            enterButton
            value={searchText}
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={5}>
          
          <Button className="col_t12">Chốt đổi soát</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={
              activeButton === "giaDinh" ? modifiedDataGiaDinh : modifiedDataSuKien
            }
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

export default TableDoiSoat;
