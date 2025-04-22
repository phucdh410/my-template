import { Stack, Typography } from "@mui/material";

import loginBgSrc from "@/assets/images/login-background.gif";

import { MLoginForm } from "../../components";

const LoginPage = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${loginBgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        borderRadius="16px"
        p={4}
        gap={2}
        width={400}
        mb={10}
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 4px 2px rgba(255 255 255)",
        }}
      >
        <Typography fontFamily="Inter" fontSize="1.5rem" fontWeight={600}>
          Nice to meet you 😄
        </Typography>
        <MLoginForm />
      </Stack>
    </Stack>
  );
};
export default LoginPage;
