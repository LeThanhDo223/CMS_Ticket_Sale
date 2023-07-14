import React, { useState } from "react";
import { Checkbox, Radio, Button } from "antd";
import { RadioChangeEvent } from "antd/es/radio";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface FilterProps {
  onFilter: (selectedTag: string | null, selectedCheck: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCheck, setSelectedCheck] = useState<string[]>([]);

  const handleTagChange = (e: RadioChangeEvent) => {
    setSelectedTag(e.target.value);
  };

  const handleCheckChange = (checkedValues: CheckboxValueType[]) => {
    const checkin = checkedValues.map((value) => value.toString());
    setSelectedCheck(checkin);
  };

  const handleFilter = () => {
    let processedTag: string | null = selectedTag;
    let processedCheck: string[] = selectedCheck;

    if (selectedTag === "all") {
      processedTag = null;
    }

    if (selectedCheck.includes("all")) {
      processedCheck = [];
    }

    onFilter(processedTag, processedCheck);
  };

  return (
    <>
      <Radio.Group
        onChange={handleTagChange}  
        value={selectedTag}
        defaultValue={null}
      >
        <Radio.Button value={null}>All</Radio.Button>
        <Radio.Button value="Đã sử dụng">Đã sử dụng</Radio.Button>
        <Radio.Button value="Chưa sử dụng">Chưa sử dụng</Radio.Button>
        <Radio.Button value="Hết hạn">Hết hạn</Radio.Button>
        <Radio.Button value="cool">Cool</Radio.Button>
        <Radio.Button value="teacher">Teacher</Radio.Button>
      </Radio.Group>

      <Checkbox.Group onChange={handleCheckChange} value={selectedCheck}>
        <Checkbox value="all">Tất cả</Checkbox>
        <Checkbox value="Cổng 1">Cổng 1</Checkbox>
        <Checkbox value="Cổng 2">Cổng 2</Checkbox>
        <Checkbox value="Cổng 3">Cổng 3</Checkbox>
        <Checkbox value="Cổng 4">Cổng 4</Checkbox>
        <Checkbox value="Cổng 5">Cổng 5</Checkbox>
      </Checkbox.Group>

      <Button onClick={handleFilter}>Filter</Button>
    </>
  );
};

export default Filter;
