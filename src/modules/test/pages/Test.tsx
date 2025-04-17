import { useState } from "react";

import { Visibility } from "@mui/icons-material";
import { Container, IconButton, Stack } from "@mui/material";

import { CTable } from "@/components/others";
import { TCHeadersTable } from "@/components/others/CTable/types";

import { DATA } from "./data";

interface IPhone {
  id: string;
  name: string;
  image: string;
  price: number;
  capacity: string;
  brand: string;
  frontCamera: string;
  rearCamera: string;
  screenSize: string;
  battery: string;
  chip: string;
  os: string;
  weight: string;
}

const MOCKUP_PAGINATION = {
  page: 1,
  pages: 1,
  onPageChange: () => {},
};

const TestPage = () => {
  //#region Data
  const [data, setData] = useState(DATA);

  const [selections, setSelections] = useState<string[]>([]);

  const isCheckAll = !!(selections.length && selections.length === data.length);
  const isIndeterminate = !!(
    selections.length && selections.length < data.length
  );
  //#endregion

  //#region Event
  const onCheck = (rowKey?: string) => (checked: boolean) => {
    if (!rowKey) {
      if (checked) setSelections(data.map((e) => e.id));
      else setSelections([]);
    } else {
      if (checked) setSelections((prev) => [...prev, rowKey]);
      else setSelections((prev) => prev.filter((e) => e !== rowKey));
    }
  };
  //#endregion

  //#region Render
  const headers: TCHeadersTable<IPhone> = [
    {
      key: "name",
      label: "Tên sản phẩm",
      width: 300,
      pin: "left",
      align: "left",
      renderCell: (value, record) => (
        <Stack direction="row" gap={0.5} alignItems="center">
          <Stack
            position="relative"
            height={40}
            width={40}
            sx={{ aspectRatio: "1/1" }}
          >
            <img
              src={record.image}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                height: "100%",
                width: "100%",
              }}
            />
          </Stack>
          <span style={{ fontWeight: 500 }}>{value}</span>
        </Stack>
      ),
    },
    {
      key: "brand",
      label: "Hãng",
      width: 400,
    },
    {
      key: "capacity",
      label: "Dung lượng",
      width: 350,
    },
    {
      key: "price",
      label: "Giá",
      valueFormatter: (value) => `$${(value ?? 0).toLocaleString()}`,
    },
    {
      key: "os",
      label: "Hệ điều hành",
    },
    {
      key: "action",
      label: "",
      renderCell: () => (
        <IconButton size="small" sx={{ color: "#4486E2FF" }}>
          <Visibility fontSize="small" />
        </IconButton>
      ),
    },
  ];
  return (
    <Container>
      <button
        onClick={() => {
          setData((prev) => [
            ...prev,
            {
              name: `Something-${new Date().getTime()}-${Math.random() * 999}`,
              battery: "100",
              brand: "",
              capacity: "",
              chip: "",
              price: 500,
              frontCamera: "",
              id: "23d",
              image: "31f332f3f",
              os: "",
              rearCamera: "",
              screenSize: "",
              weight: "50",
            },
          ]);
        }}
      >
        Add
      </button>
      <CTable
        headers={headers}
        data={data}
        height={450}
        pagination={{
          page: MOCKUP_PAGINATION.page,
          pages: MOCKUP_PAGINATION.pages,
          onPageChange: MOCKUP_PAGINATION.onPageChange,
        }}
        selectable
        selections={selections}
        isCheckAll={isCheckAll}
        isIndeterminate={isIndeterminate}
        onCheck={onCheck}
      />
    </Container>
  );
  //#endregion
};
export default TestPage;
