import { Container, Paper, Stack } from "@mui/material";

import {
  CAutocomplete,
  CDatePicker,
  CInput,
} from "./common/components/controls";

const options = [
  { id: "1", label: "Batman & Superman" },
  { id: "2", label: "Harry Potter" },
  { id: "3", label: "Avenger: End game" },
  { id: "4", label: "Tôi thấy hoa vàng trên cỏ cây" },
];

function App() {
  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          <Stack gap={3} m={5} p={3}>
            <CInput
              label="Tên phiếu"
              placeholder="Nhập tên phiếu"
              error
              errorText="Vui lòng nhập thông tin này"
            />
            <CAutocomplete
              label="Chi nhánh"
              placeholder="Chọn chi nhánh"
              options={options}
            />

            <CDatePicker label="Ngày bắt đầu" showDaysOutsideCurrentMonth />
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;
