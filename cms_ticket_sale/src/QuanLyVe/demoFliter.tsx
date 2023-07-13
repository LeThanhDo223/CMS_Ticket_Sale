import React, { useState } from "react";
import { Radio, Button } from "antd";
import { RadioChangeEvent } from "antd/es/radio";

interface FilterProps {
  onFilter: (selectedTtsd: string | null) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedTtsd, setSelectedTtsd] = useState<string | null>(null);
  
  const handleTtsdChange = (e: RadioChangeEvent) => {
    setSelectedTtsd(e.target.value);
  };

  const handleFilter = () => {
    onFilter(selectedTtsd);
  };

  return (
    <>
      <Radio.Group onChange={handleTtsdChange} defaultValue={null}>
        <Radio value={null}>Tất cả</Radio>
        <Radio value="Đã sử dụng">Đã sử dụng</Radio>
        <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
        <Radio value="Hết hạn">Hết hạn</Radio>
      </Radio.Group>

      <Button onClick={handleFilter}>Lọc</Button>
    </>
  );
};

export default Filter;
