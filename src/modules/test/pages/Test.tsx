import { Paper, Stack } from "@mui/material";

import { CDatePicker } from "@/components/controls";

const TestPage = () => {
  return (
    <>
      <Paper sx={{ maxWidth: 680 }}>
        <Stack p={4} gap={5}>
          <CDatePicker />
        </Stack>
      </Paper>
    </>
  );
};
export default TestPage;
