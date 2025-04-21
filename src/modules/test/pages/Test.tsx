import { Controller, useForm } from "react-hook-form";

import { Container, Stack } from "@mui/material";
import dayjs from "dayjs";

import { CDatePicker, CDateRangePicker } from "@/components/controls";

const defaultValues = {
  from: new Date("2023-01-01"),
  to: new Date("2023-12-31"),
};

const TestPage = () => {
  //#region Data
  const { control, getValues } = useForm({
    mode: "all",
    defaultValues: {
      rangeValues: {
        from: dayjs(defaultValues.from),
        to: dayjs(defaultValues.to),
      },
    },
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Container>
      <Controller
        control={control}
        name="rangeValues"
        render={({ field }) => (
          <CDateRangePicker
            {...field}
            label="Thời gian"
            placeholder="Thời gian làm việc"
          />
        )}
      />

      <Stack mt={4}>
        <button onClick={() => console.log(getValues())}>Log</button>
        <CDatePicker />
      </Stack>
    </Container>
  );
  //#endregion
};
export default TestPage;
