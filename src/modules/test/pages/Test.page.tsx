import { Container, Paper, Stack } from "@mui/material";

import { CButton } from "@/components/controls";
import { confirm } from "@/funcs";

const TestPage = () => {
  const handleConfirm = () => {
    confirm({
      confirmation: "Thao tác xóa sẽ không thể khôi phục!",
      onProceed: () => {
        console.log("Proceed");
      },
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <Paper>
          <Stack m={5} p={3}>
            <Stack display="block">
              <CButton variant="contained" onClick={handleConfirm}>
                Confirm
              </CButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
export default TestPage;
