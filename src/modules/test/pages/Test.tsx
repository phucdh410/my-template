import { Controller, useForm } from "react-hook-form";

import { Container, Stack } from "@mui/material";

import { CNumberInput } from "@/components/controls";

const TestPage = () => {
  //#region Data
  const { control } = useForm({ mode: "all", defaultValues: { price: 0 } });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Container>
      <Stack mt={4}>
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
