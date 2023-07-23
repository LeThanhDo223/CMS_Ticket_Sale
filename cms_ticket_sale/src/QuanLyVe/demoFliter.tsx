import React, { useState } from "react";
import { Radio, Button } from "antd";
import { RadioChangeEvent } from "antd/es/radio";

interface FilterProps {
  onFilter: (selectedTag: string | null) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagChange = (e: RadioChangeEvent) => {
    setSelectedTag(e.target.value);
  };

  const handleFilter = () => {
    let processedTag: string | null = selectedTag;

    if (selectedTag === "all") {
      processedTag = null;
    }

    onFilter(processedTag);
  };

  return (
    <>
      <Radio.Group onChange={handleTagChange} value={selectedTag} defaultValue={null}>
        <Radio.Button value={null}>All</Radio.Button>
        <Radio.Button value="Đã sử dụng">Đã sử dụng</Radio.Button>
        <Radio.Button value="Chưa sử dụng">Chưa sử dụng</Radio.Button>
        <Radio.Button value="Hết hạn">Hết hạn</Radio.Button>
        <Radio.Button value="cool">Cool</Radio.Button>
        <Radio.Button value="teacher">Teacher</Radio.Button>
      </Radio.Group>

      <Button onClick={handleFilter}>Filter</Button>
    </>
  );
};

export default Filter;
