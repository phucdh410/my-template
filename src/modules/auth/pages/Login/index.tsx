import { Stack, Typography } from "@mui/material";

import loginBgSrc from "@/assets/videos/login-background.mp4";

import { MLoginForm } from "../../components";

const LoginPage = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={loginBgSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Stack
        borderRadius="16px"
        p={4}
        gap={2}
        width={400}
        mb={10}
        sx={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
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
