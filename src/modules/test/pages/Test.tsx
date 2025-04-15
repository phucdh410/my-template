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
  //#endregion

  //#region Render
  const headers: TCHeadersTable<IPhone> = [
    {
      key: "name",
      label: "Tên sản phẩm",
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
    },
    {
      key: "capacity",
      label: "Dung lượng",
    },
    {
      key: "price",
      label: "Giá",
      valueFormatter: (value) => `$${value.toLocaleString()}`,
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
      <CTable
        headers={headers}
        data={DATA}
        height={450}
        pagination={{
          page: MOCKUP_PAGINATION.page,
          pages: MOCKUP_PAGINATION.pages,
          onPageChange: MOCKUP_PAGINATION.onPageChange,
        }}
      />
    </Container>
  );
  //#endregion
};
export default TestPage;
