import { useState } from "react";

import { Container, Paper, Stack } from "@mui/material";

import { CTable } from "@/components/others";
import { TFiltersTable } from "@/components/others/CTable/CFiltersTable/types";
import { TCHeadersTable } from "@/components/others/CTable/types";

import { DATA } from "./data";

interface ICategory {
  id: string;
  name: string;
}

interface IStore {
  id: string;
  name: string;
}
interface IData {
  id: string;
  asset_id: number;
  code: string;
  name: string;
  category: ICategory;
  category_id: string;
  category_name: string;
  store: IStore;
  store_id: string;
  store_name: string;
  unit: string;
  date: string; // ISO date string (e.g., "2025-01-23")
  reason: string;
  depreciation_duration: number;
  depreciation_accumulation: number;
  remain_depreciation_duration: number;
  depreciation_cost: number;
  quantity: number;
  remain_quantity: number;
  issue_quantity: number;
  original_price: number;
  repair_times: number | null;
  repair_replacement_cost: number | null;
  price: number;
  amount: number;
  total: number;
}

interface IParams {
  code: string;
  store_code: string;
  date: Date | string | null;
  month: string;
}

const defaultParams: IParams = {
  code: "",
  store_code: "",
  date: "",
  month: "",
};

const TestPage = () => {
  const [params, setParams] = useState<IParams>(defaultParams);

  const headers: TCHeadersTable<IData> = [
    { key: "code", label: "Mã tài sản" },
    { key: "name", label: "Tên tài sản", align: "left", width: 800 },
    {
      key: "category",
      label: "Loại CCDC",
      align: "left",
      width: 350,
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
      valueFormatter: (value, row) => value?.name,
    },
  ];
  const filters: TFiltersTable<IParams> = [
    {
      key: "code",
      label: "Mã tài sản",
      type: "input",
    },
    {
      key: "store_code",
      label: "Chi nhánh",
      type: "selection",
      options: [
        { id: "1", label: "Ung Văn Khiêm" },
        { id: "2", label: "Nguyễn Tri Phương" },
        { id: "3", label: "CMT8" },
        { id: "4", label: "Vũng Tàu" },
        { id: "5", label: "Dương Bá Trạc" },
        { id: "6", label: "Cầu Chữ Y" },
        { id: "7", label: "Trần Bình Trọng" },
        { id: "8", label: "Trần Não" },
      ],
    },
    {
      key: "date",
      label: "Ngày ghi tăng",
      type: "datepicker",
    },
    {
      key: "month",
      label: "Tháng",
      type: "datepicker",
      format: "MM/YYYY",
      views: ["month", "year"],
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
              height={500}
              filters={{
                values: params,
                onFiltersChange: setParams,
                initialValues: defaultParams,
                templates: filters,
              }}
            />
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
export default TestPage;
