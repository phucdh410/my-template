import { Paper, Stack } from "@mui/material";

import { CUpload } from "@/components/controls";

const TestPage = () => {
  return (
    <>
      <Paper sx={{ maxWidth: 680 }}>
        <Stack p={4} gap={5}>
          <CUpload multiple />
          <CUpload />
        </Stack>
      </Paper>
    </>
  );
};
export default TestPage;
