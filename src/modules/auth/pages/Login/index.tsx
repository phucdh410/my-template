import { Stack } from "@mui/material";

import { MLoginForm } from "../../components";

const LoginPage = () => {
  return (
    <Stack direction="row" height="100vh" width="100vw">
      <Stack flex={1} bgcolor="#649bd417">
        background
      </Stack>
      <Stack flexShrink={0} spacing={3} p={4}>
        <MLoginForm />
      </Stack>
    </Stack>
  );
};
export default LoginPage;
