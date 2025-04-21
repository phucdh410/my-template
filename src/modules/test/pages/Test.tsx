import { Controller, useForm } from "react-hook-form";

import { Container, Stack } from "@mui/material";

import { CInput, CNumberInput } from "@/components/controls";

const TestPage = () => {
  //#region Data
  const { control } = useForm({ mode: "all", defaultValues: { price: 0 } });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Container>
      <Stack gap={4} mt={4}>
        <CInput label="Tên sản phẩm" value="Sản phẩm 1" />
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
      </Stack>
    </Container>
  );
  //#endregion
};
export default TestPage;
