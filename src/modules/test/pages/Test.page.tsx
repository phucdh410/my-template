import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Save } from "@mui/icons-material";
import { Container, Paper, Stack } from "@mui/material";
import { number, object, string } from "yup";

import {
  CAutocomplete,
  CButton,
  CDatePicker,
  CInput,
  CNumberInput,
} from "@/components/controls";
import { confirm } from "@/funcs";
import { dateSchema } from "@/validations";

import { USERS } from "./data";

//asset-uat.vtcode.vn:3006/api/users/icool-staff

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTciLCJ1c2VybmFtZSI6InRoYW9ubSIsInJvbGUiOiIxIiwiaWF0IjoxNzM5NDM4MTM5LCJleHAiOjE3Mzk1MjQ1Mzl9.Hv19tFvBXWoZzXmw91AuOFUlhqGRG7Cqd603uXrNscI

const TestPage = () => {
  const list = useMemo(
    () =>
      USERS.map((e) => ({
        id: e.id,
        label: e.name,
        code: e?.code,
        sale: e?.sale,
      })),
    []
  );

  const { control, handleSubmit, getValues } = useForm({
    mode: "all",
    defaultValues: { name: "", movie: "", age: 10, date: new Date() },
    resolver: yupResolver(
      object({
        name: string().trim().required("Vui lòng nhập tên phiếu!"),
        age: number().required("Vui lòng nhập số tuổi!"),
        movie: string().trim().required("Vui lòng chọn phim!"),
        date: dateSchema,
      })
    ),
  });

  const onSubmit = () => {
    handleSubmit(async (values) => {
      console.log("🤣 values at line 33 🤣:", values);
    })();
  };

  const handleConfirm = async () => {
    if (
      await confirm({
        confirmation: "Are you sure?",
      })
    ) {
      console.log("Yes");
    } else {
      console.log("No");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          <button onClick={() => console.log(getValues())}>Log values</button>
          <Stack gap={2.5} m={5} p={3}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  label="Tên phiếu"
                  placeholder="Nhập tên phiếu"
                  error={!!error}
                  errorText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="age"
              render={({ field, fieldState: { error } }) => (
                <CNumberInput
                  label="Tuổi"
                  // suffix="VNĐ"
                  error={!!error}
                  errorText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="movie"
              render={({ field, fieldState: { error } }) => (
                <CAutocomplete
                  label="Label"
                  get="code"
                  placeholder="Chọn phim"
                  options={list}
                  error={!!error}
                  errorText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <CDatePicker
                  label="Ngày bắt đầu"
                  error={!!error}
                  errorText={error?.message}
                  {...field}
                />
              )}
            />
            <Stack display="block">
              <CButton
                variant="contained"
                startIcon={<Save />}
                onClick={onSubmit}
              >
                Lưu
              </CButton>
            </Stack>
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
