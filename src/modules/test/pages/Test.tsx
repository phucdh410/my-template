import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Container, Stack } from "@mui/material";

import {
  CAutocomplete,
  CDateRangePicker,
  CInput,
  CNumberInput,
} from "@/components/controls";
import { CTable } from "@/components/others";
import { TFiltersTable } from "@/components/others/CTable/CFiltersTable/types";
import { TCHeadersTable } from "@/components/others/CTable/types";

const ARRAY_1 = [
  { id: "1", label: "Red" },
  { id: "2", label: "Green" },
  { id: "3", label: "Blue" },
  { id: "4", label: "Yellow" },
  { id: "5", label: "Pink" },
  { id: "6", label: "Purple" },
  { id: "7", label: "Orange" },
  { id: "8", label: "Brown" },
  { id: "9", label: "Gray" },
  { id: "10", label: "Black" },
];

const ARRAY_2 = [
  { id: "1", label: "Avenger Infinite War" },
  { id: "2", label: "Avenger End Game" },
  { id: "3", label: "Avenger Age of Ultron" },
  { id: "4", label: "Spider Man Homecoming" },
  { id: "5", label: "Spider No Way Home" },
];

interface IData {
  id: string;
  name: string;
  price: number;
  vendor: string;
  quantity: number;
  created_date: Date;
}

const DATA: IData[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    price: 299000,
    vendor: "LogiTech",
    quantity: 24,
    created_date: new Date("2025-04-01"),
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 1250000,
    vendor: "KeyChron",
    quantity: 10,
    created_date: new Date("2025-04-03"),
  },
  {
    id: "3",
    name: "4K Monitor",
    price: 6200000,
    vendor: "Dell",
    quantity: 5,
    created_date: new Date("2025-03-28"),
  },
  {
    id: "4",
    name: "Gaming Headset",
    price: 850000,
    vendor: "Razer",
    quantity: 15,
    created_date: new Date("2025-04-10"),
  },
  {
    id: "5",
    name: "External SSD 1TB",
    price: 2100000,
    vendor: "Samsung",
    quantity: 8,
    created_date: new Date("2025-04-05"),
  },
  {
    id: "6",
    name: "Webcam HD",
    price: 450000,
    vendor: "LogiTech",
    quantity: 18,
    created_date: new Date("2025-04-08"),
  },
  {
    id: "7",
    name: "USB-C Hub",
    price: 320000,
    vendor: "Anker",
    quantity: 12,
    created_date: new Date("2025-03-30"),
  },
  {
    id: "8",
    name: "Laptop Stand",
    price: 400000,
    vendor: "Nillkin",
    quantity: 20,
    created_date: new Date("2025-04-02"),
  },
];

interface IFilterParams {
  name?: string;
  created_date?: Date | null;
}

const initialParams = {
  name: "",
  created_date: null,
};

const TestPage = () => {
  //#region Data
  const { control } = useForm({ mode: "all", defaultValues: { price: 0 } });

  const [filters, setFilters] = useState<IFilterParams>(initialParams);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  const headers: TCHeadersTable<IData> = [
    { key: "name", label: "Tên sản phẩm", align: "left" },
    { key: "price", label: "Giá tiền", align: "right", columnType: "number" },
    { key: "vendor", label: "Nhà cung cấp" },
    { key: "quantity", label: "Số lượng" },
    { key: "created_date", label: "Ngày tạo", columnType: "date" },
  ];
  const templates: TFiltersTable<IFilterParams> = [
    { key: "name", label: "Tên", type: "input" },
    { key: "created_date", label: "Ngày tạo", type: "datepicker" },
  ];
  return (
    <Container>
      <Stack gap={4} mt={4} pb={50}>
        <CInput label="Tên sản phẩm" value="" />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <CNumberInput
              label="Giá tiền"
              placeholder="Nhập giá tiền"
              isFloat
              max={3000}
              min={1000}
              suffix="VNĐ"
              {...field}
            />
          )}
        />
        <CAutocomplete label="Chọn phim" options={ARRAY_2} />
        <CAutocomplete label="Chọn màu sắc" options={ARRAY_1} multiple />
        <CDateRangePicker label="Thời gian" />
        <CTable
          headers={headers}
          data={DATA}
          filters={{
            templates,
            values: filters,
            initialValues: initialParams,
            onFiltersChange: setFilters,
          }}
        />
      </Stack>
    </Container>
  );
  //#endregion
};
export default TestPage;
