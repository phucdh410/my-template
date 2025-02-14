import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Save } from "@mui/icons-material";
import { Container, Paper, Stack } from "@mui/material";
import { object, string } from "yup";

import {
  CAutocomplete,
  CButton,
  CDatePicker,
  CInput,
} from "@/components/controls";
import { dateSchema } from "@/validations";

import { USERS } from "./data";

//asset-uat.vtcode.vn:3006/api/users/icool-staff

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTciLCJ1c2VybmFtZSI6InRoYW9ubSIsInJvbGUiOiIxIiwiaWF0IjoxNzM5NDM4MTM5LCJleHAiOjE3Mzk1MjQ1Mzl9.Hv19tFvBXWoZzXmw91AuOFUlhqGRG7Cqd603uXrNscI

const TestPage = () => {
  const list = useMemo(
    () => USERS.map((e) => ({ id: e.id, label: e.name })),
    []
  );

  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: { name: "", movie_code: "", date: new Date() },
    resolver: yupResolver(
      object({
        name: string().trim().required("Vui lòng nhập tên phiếu!"),
        movie_code: string().trim().required("Vui lòng chọn phim!"),
        date: dateSchema,
      })
    ),
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
            <CAutocomplete
              label="Phim"
              placeholder="Chọn phim"
              options={list}
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
};
export default TestPage;
