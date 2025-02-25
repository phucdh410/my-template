import { Container, Paper, Stack } from "@mui/material";

import { CTable } from "@/components/others";
import { TCHeadersTable } from "@/components/others/CTable/types";

import { DATA } from "./data";

const TestPage = () => {
  const headers: TCHeadersTable = [
    { key: "code", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản", align: "left" },
    {
      key: "category",
      label: "Loại CCDC",
      align: "left",
      valueFormatter: (value) => value?.name,
    },
    { key: "unit", label: "Đơn vị tính" },
    { key: "date", label: "Ngày ghi tăng", columnType: "date" },
    {
      key: "amount",
      label: "Giá trị tài sản",
      align: "right",
      columnType: "number",
      width: 150,
    },
    {
      key: "store",
      label: "Chi nhánh",
      align: "left",
      width: 200,
      valueFormatter: (value) => value?.name,
    },
  ];
  return (
    <>
      <Container maxWidth="2xl">
        <Paper>
          <Stack m={5} p={3}>
            <CTable
              headers={headers}
              data={DATA}
              headerTransform="capitalize"
            />
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
export default TestPage;
