import { Avatar, Stack } from "@mui/material";

import avatarSrc from "@/assets/images/avatar.jpg";

import "./styles.scss";

export const CProfile = () => {
  return (
    <Stack className="c-header--profile-container" position="relative">
      <Stack borderRadius="100%" padding="2px" sx={{ background: "white" }}>
        <Avatar>
          <img src={avatarSrc} alt="user-logo" />
        </Avatar>
      </Stack>

      <Stack
        height="100%"
        width="100%"
        top={0}
        left={0}
        position="absolute"
        zIndex={-1}
        className="c-header--profile-background"
      ></Stack>
    </Stack>
  );
};
