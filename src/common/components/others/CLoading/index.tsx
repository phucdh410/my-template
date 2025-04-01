import { Stack } from "@mui/material";

import gifSrc from "./loading.gif";

export const CLoading = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <img src={gifSrc} alt="" />
    </Stack>
  );
};
