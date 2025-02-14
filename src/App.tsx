import { useForm } from "react-hook-form";

import { Save } from "@mui/icons-material";
import { Container, Paper, Stack } from "@mui/material";

import {
  CAutocomplete,
  CButton,
  CDatePicker,
  CInput,
} from "./common/components/controls";

const options = [
  { id: "1", label: "Batman & Superman" },
  { id: "2", label: "Harry Potter" },
  { id: "3", label: "Avenger: End game" },
  { id: "4", label: "Tôi thấy hoa vàng ở trên cỏ cây" },
  { id: "5", label: "Alice in Wonderland" },
  { id: "6", label: "Narnia" },
  { id: "7", label: "Draken the Hunter" },
  { id: "8", label: "Spider Far From Home" },
  { id: "9", label: "The Medium" },
  { id: "10", label: "The Conjuring" },
  { id: "11", label: "Ju-on" },
  { id: "12", label: "The Shutter" },
];

function App() {
  const { handleSubmit } = useForm({
    mode: "all",
    defaultValues: { name: "", movie_code: "", date: new Date() },
  });
  const onSubmit = () => {
    handleSubmit(async (values) => {
      console.log("🤣 values at line 33 🤣:", values);
    })();
  };
  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          <Stack gap={3} m={5} p={3}>
            <CInput label="Tên phiếu" placeholder="Nhập tên phiếu" rows={4} />
            <CAutocomplete
              label="Phim"
              placeholder="Chọn phim"
              options={options}
            />

            <CDatePicker label="Ngày bắt đầu" />

            <Stack display="block">
              <CButton
                variant="contained"
                startIcon={<Save />}
                onClick={onSubmit}
              >
                Lưu
              </CButton>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default App;
