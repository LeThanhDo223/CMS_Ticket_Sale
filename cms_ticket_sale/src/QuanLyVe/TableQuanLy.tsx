import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Row, Col, Table, Tag, Pagination, Button, Input } from "antd";
import { fetchPageDataGD, fetchPageDataSK } from "../redux/dataSlice";
import { RootState } from "../redux/store";
import "./QuanLyVe.css";
import Chon from "./Chon";
import LocVe from "./LocVe";
const { Search } = Input;

const DataList: React.FC<{ activeButton: string }> = ({ activeButton }) => {
  const dispatch = useDispatch();
  const dataGD = useSelector((state: RootState) => state.page.dataGD);
  const dataSK = useSelector((state: RootState) => state.page.dataSK);
  const loading = useSelector((state: RootState) => state.page.loading);
  const error = useSelector((state: RootState) => state.page.error);

  // page
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

  const handleFilter = (selectedTtsd: string | null) => {
    setFilterStatus(selectedTtsd);
    setCurrentPage(1);
  };

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const filteredData = filterStatus
    ? filteredBySearchData.filter((item: any) =>
        item.ttsd.includes(filterStatus)
      )
    : filteredBySearchData;

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
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => <Chon />,
    },
  ];

  const columnsSuKien = [
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
      title: "Tên sự kiện",
      dataIndex: "tsk",
      key: "tsk",
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
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => <Chon />,
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
          <LocVe onFilter={handleFilter} />
          <Button className="col_t1">Xuất file (.csv)</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={activeButton === "giaDinh" ? modifiedDataGiaDinh : modifiedDataSuKien}
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

export default DataList;