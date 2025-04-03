import { Stack } from "@mui/material";

import imgSrc from "@/assets/images/development.jpg";

export const CDevelopmentView = () => {
  return (
    <Stack height="100%" flex={1} alignItems="center" justifyContent="center">
      <Stack maxWidth={600}>
        <img src={imgSrc} alt="" />
      </Stack>
    </Stack>
  );
};
