import { Paper, Stack } from "@mui/material";

import { CInput } from "@/components/controls";

const TestPage = () => {
  return (
    <>
      <Paper sx={{ maxWidth: 680 }}>
        <Stack p={4} gap={5}>
          <CInput label="Ngày ghi tăng" />
        </Stack>
      </Paper>
    </>
  );
};
export default TestPage;
