import { Stack } from "@mui/material";

import { MHeroAvatar, MLoginForm, MMarqueeBackground } from "../../components";

const LoginPage = () => {
  return (
    <Stack direction="row" height="100vh" width="100vw">
      <Stack flex={1} bgcolor="#f4f9ff" position="relative">
        <MMarqueeBackground />
        <MHeroAvatar />
      </Stack>
      <Stack flexBasis="35%" flexShrink={0} spacing={3} p={4}>
        <MLoginForm />
      </Stack>
    </Stack>
  );
};
export default LoginPage;
