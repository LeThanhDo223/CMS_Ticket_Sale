import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Pagination, Button, Input, Tag } from "antd";
import { fetchDataGD, fetchDataSK } from "../redux/dataDoiSoat";
import { RootState } from "../redux/store";
import "../QuanLyVe/QuanLyVe.css";
const { Search } = Input;

const TableDoiSoat: React.FC<{ activeButton: string; selectedRadioValue: string | null }> = ({
  activeButton,
  selectedRadioValue,
}) => {
  const [selectedRadio, setSelectedRadio] = useState<string | null>(selectedRadioValue);
  const dispatch = useDispatch();
  const dataGD = useSelector((state: RootState) => state.dataDS.dataGD);
  const dataSK = useSelector((state: RootState) => state.dataDS.dataSK);
  const loading = useSelector((state: RootState) => state.dataDS.loading);
  const error = useSelector((state: RootState) => state.dataDS.error);

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

  const handlePageChange = (dataDS: number) => {
    setCurrentPage(dataDS);
  };

  useEffect(() => {
    if (activeButton === "giaDinh") {
      dispatch(fetchDataGD() as any);
    } else if (activeButton === "suKien") {
      dispatch(fetchDataSK() as any);
    }
  }, [dispatch, activeButton]);

  useEffect(() => {
    // Perform filtering based on selectedRadioValue prop
    const filteredData = currentData.filter((item: any) =>
      item.sove.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredBySearchData(filteredData);
    setCurrentPage(1);
  }, [currentData, searchText, selectedRadioValue]);

  const handleFilter = (selectedTag: string | null, selectedCheck: string[], selectedRadioValue: string | null) => {
    setSelectedTag(selectedTag);
    setSelectedCheck(selectedCheck);
    setSelectedRadio(selectedRadioValue); // Update the local state
    setCurrentPage(1);
  };

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<string[]>([]);

  const filteredData = filteredBySearchData.filter((item: any) => {
    const isTagMatched =
      selectedCheck.length === 0 || selectedCheck.includes(item.checkin);
    const isTtsdMatched =
      selectedTag === null || item.ttsd.includes(selectedTag);
    const isRadioMatched =
      selectedRadioValue === null || item.ttds === selectedRadioValue;
    return isTagMatched && isTtsdMatched && isRadioMatched;
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
      title: "Tình trạng đổi soát",
      dataIndex: "ttds",
      key: "ttds",
      render: (tt: string) => (
        <span style={{ color: tt.length > 11 ? "grey" : "red" }}>
          {tt.toLowerCase()}
        </span>
      ),
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
      title: "Tình trạng đổi soát",
      dataIndex: "ttds",
      key: "ttds",
      render: (tt: string) => (
        <span style={{ color: tt.length > 11 ? "grey" : "red" }}>
          {tt.toLowerCase()}
        </span>
      ),
    },
   
  ];
  const columns = activeButton === "giaDinh" ? columnsGiaDinh : columnsSuKien;

  const [chotDoiSoatClicked, setChotDoiSoatClicked] = useState(false);

  const handleChotDoiSoatClick = () => {
    // Update the data to mark items that have not been checked as "Đã đổi soát"
    const updatedData = filteredBySearchData.map((item: any) => ({
      ...item,
      ttds: item.ttds === "Chưa đổi soát" ? "Đã đổi soát" : item.ttds,
    }));
    setFilteredBySearchData(updatedData);

    // Update the button text to "Xuất file (.csv)"
    setChotDoiSoatClicked(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderButton = () => {
    if (chotDoiSoatClicked) {
      return (
        <Button className="col_t1" onClick={handleChotDoiSoatClick}>
          Xuất file (.csv)
        </Button>
      );
    } else {
      return (
        <Button className="col_t12" onClick={handleChotDoiSoatClick}>
          Chốt đổi soát
        </Button>
      );
    }
  };

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
          {renderButton()}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={activeButton === "giaDinh" ? modifiedDataGiaDinh : modifiedDataSuKien}
            pagination={false}
            rowClassName={(record, index) => index % 2 === 0 ? "even-row" : "odd-row"}
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