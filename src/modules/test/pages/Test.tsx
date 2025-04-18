import { Container, Stack } from "@mui/material";

import { CDateRangePicker, CInput } from "@/components/controls";

const TestPage = () => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Container>
      <CDateRangePicker label="Thời gian" placeholder="Thời gian làm việc" />
      <Stack mt={4}>
        <CInput />
      </Stack>
    </Container>
  );
  //#endregion
};
export default TestPage;
