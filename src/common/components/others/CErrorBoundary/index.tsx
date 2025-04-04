import { Stack, Typography } from "@mui/material";

import imgSrc from "@/assets/images/development.jpg";
import notFoundImgSrc from "@/assets/images/pikachu.png";

export const CDevelopmentView = () => {
  return (
    <Stack height="100%" flex={1} alignItems="center" justifyContent="center">
      <Stack maxWidth={600}>
        <img src={imgSrc} alt="" />
      </Stack>
    </Stack>
  );
};

export const CNotFoundView = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Typography
        fontFamily="Rubik Iso"
        fontSize={{ xs: "5rem", md: "7rem", lg: "8.5rem", "2xl": "10rem" }}
        lineHeight={{ xs: "4rem", md: "6rem", lg: "7.5rem", "2xl": "9rem" }}
      >
        404
      </Typography>
      <Typography
        fontSize={{ xs: "1.5rem", md: "2rem", lg: "3rem" }}
        fontFamily="Cherry Bomb One"
      >
        Trang bạn yêu cầu không tồn tại
      </Typography>
      <Stack maxWidth={400}>
        <img src={notFoundImgSrc} alt="" />
      </Stack>
    </Stack>
  );
};
