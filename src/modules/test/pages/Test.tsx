import { useState } from "react";

import { CTabs } from "@/components/others";

const tabs = [
  { name: "Tab 1", value: "1" },
  { name: "Đây là tab thứ 2", value: "2" },
  { name: "Cái tab 3", value: "3" },
];

const TestPage = () => {
  const [value, setValue] = useState("1");

  return (
    <>
      <CTabs value={value} tabs={tabs} onChange={setValue} />
    </>
  );
};
export default TestPage;
